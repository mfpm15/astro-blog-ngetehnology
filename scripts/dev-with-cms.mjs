import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const isWindows = process.platform === "win32";
const nodeCmd = isWindows ? "node.exe" : "node";
const astroCliPath = fileURLToPath(
  new URL("../node_modules/astro/bin/astro.mjs", import.meta.url),
);
const decapServerPath = fileURLToPath(
  new URL("../node_modules/decap-server/dist/index.js", import.meta.url),
);
const forwardedArgs = process.argv.slice(2);

if (forwardedArgs[0] === "--") {
  forwardedArgs.shift();
}

function pipeWithPrefix(stream, target, prefix) {
  if (!stream) return;
  stream.on("data", (chunk) => {
    const lines = chunk.toString().split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!line && index === lines.length - 1) return;
      target.write(`${prefix}${line}\n`);
    });
  });
}

const spawnOptions = {
  stdio: ["inherit", "pipe", "pipe"],
  shell: false,
};

const cmsProxy = spawn(
  nodeCmd,
  [decapServerPath],
  {
    ...spawnOptions,
    env: {
      ...process.env,
      PORT: process.env.DECAP_PROXY_PORT || "8081",
      GIT_REPO_DIRECTORY: process.cwd(),
    },
  },
);

const astroDev = spawn(nodeCmd, [astroCliPath, "dev", ...forwardedArgs], spawnOptions);

pipeWithPrefix(cmsProxy.stdout, process.stdout, "[cms-proxy] ");
pipeWithPrefix(cmsProxy.stderr, process.stderr, "[cms-proxy] ");
pipeWithPrefix(astroDev.stdout, process.stdout, "[astro] ");
pipeWithPrefix(astroDev.stderr, process.stderr, "[astro] ");

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (!cmsProxy.killed && cmsProxy.exitCode === null) {
    cmsProxy.kill("SIGTERM");
  }

  if (!astroDev.killed && astroDev.exitCode === null) {
    astroDev.kill("SIGTERM");
  }

  setTimeout(() => process.exit(code), 250);
}

setTimeout(() => {
  if (cmsProxy.exitCode !== null) {
    console.error("[dev] Decap local backend berhenti lebih awal. Cek logs di atas.");
    process.exit(1);
  } else {
    console.log("[dev] Decap local backend aktif di http://127.0.0.1:8081/api/v1");
  }
}, 2000);

cmsProxy.on("error", (error) => {
  console.error("[dev] Gagal menjalankan Decap local backend:", error.message);
  shutdown(1);
});

astroDev.on("error", (error) => {
  console.error("[dev] Gagal menjalankan Astro dev server:", error.message);
  shutdown(1);
});

cmsProxy.on("exit", (code) => {
  if (!shuttingDown) {
    shutdown(code ?? 1);
  }
});

astroDev.on("exit", (code) => {
  shutdown(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => shutdown(0));
}
