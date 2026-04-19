import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const isWindows = process.platform === "win32";
const nodeCmd = isWindows ? "node.exe" : "node";
const astroCliPath = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
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

const studioServer = spawn(nodeCmd, ["scripts/studio-file-server.mjs"], spawnOptions);
const astroDev = spawn(nodeCmd, [astroCliPath, "dev", ...forwardedArgs], spawnOptions);

pipeWithPrefix(studioServer.stdout, process.stdout, "[studio-server] ");
pipeWithPrefix(studioServer.stderr, process.stderr, "[studio-server] ");
pipeWithPrefix(astroDev.stdout, process.stdout, "[astro] ");
pipeWithPrefix(astroDev.stderr, process.stderr, "[astro] ");

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (!studioServer.killed && studioServer.exitCode === null) {
    studioServer.kill("SIGTERM");
  }
  if (!astroDev.killed && astroDev.exitCode === null) {
    astroDev.kill("SIGTERM");
  }

  setTimeout(() => process.exit(code), 250);
}

setTimeout(() => {
  if (studioServer.exitCode !== null) {
    console.error("[dev] Studio file server berhenti lebih awal. Cek logs di atas.");
    process.exit(1);
  } else {
    console.log("[dev] Studio file server aktif di port 4323.");
  }
}, 2000);

studioServer.on("error", (error) => {
  console.error("[dev] Gagal menjalankan studio file server:", error.message);
  shutdown(1);
});

astroDev.on("error", (error) => {
  console.error("[dev] Gagal menjalankan Astro dev server:", error.message);
  shutdown(1);
});

studioServer.on("exit", (code) => {
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
