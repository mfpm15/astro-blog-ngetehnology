import { spawn } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";
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
let astroDev = null;
let restartTimer = null;
const watchers = [];

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

function pipeChild(child, stdoutPrefix, stderrPrefix) {
  pipeWithPrefix(child.stdout, process.stdout, stdoutPrefix);
  pipeWithPrefix(child.stderr, process.stderr, stderrPrefix);
}

function startAstroDev() {
  astroDev = spawn(nodeCmd, [astroCliPath, "dev", ...forwardedArgs], spawnOptions);
  pipeChild(astroDev, "[astro] ", "[astro] ");

  astroDev.on("error", (error) => {
    console.error("[dev] Gagal menjalankan Astro dev server:", error.message);
    shutdown(1);
  });

  astroDev.on("exit", (code) => {
    if (!shuttingDown) {
      shutdown(code ?? 0);
    }
  });
}

function restartAstroDev(reason = "content update") {
  if (shuttingDown) return;
  if (restartTimer) clearTimeout(restartTimer);

  restartTimer = setTimeout(() => {
    restartTimer = null;
    console.log(`[dev] Restarting Astro dev server (${reason})...`);

    const previous = astroDev;
    if (!previous || previous.exitCode !== null || previous.killed) {
      startAstroDev();
      return;
    }

    previous.removeAllListeners("exit");
    previous.once("exit", () => {
      if (!shuttingDown) {
        startAstroDev();
      }
    });
    previous.kill("SIGTERM");
  }, 350);
}

function shouldRestartOnChange(fileName = "") {
  const normalized = String(fileName).replace(/\\/g, "/").toLowerCase();
  if (!normalized) return true;
  return (
    normalized.endsWith(".md") ||
    normalized.endsWith(".mdx") ||
    normalized.endsWith(".json") ||
    normalized.endsWith(".yml") ||
    normalized.endsWith(".yaml")
  );
}

function registerWatcher(relativeTarget, label) {
  const targetPath = path.join(process.cwd(), relativeTarget);
  try {
    const watcher = watch(
      targetPath,
      { recursive: true },
      (eventType, fileName) => {
        if (label === "posts" && eventType !== "rename") return;
        if (!shouldRestartOnChange(fileName)) return;
        restartAstroDev(`${label}: ${eventType} ${fileName || ""}`.trim());
      },
    );
    if (typeof watcher.setMaxListeners === "function") {
      watcher.setMaxListeners(0);
    }
    watchers.push(watcher);
  } catch (error) {
    console.warn(`[dev] Watcher ${label} tidak aktif: ${error.message}`);
  }
}

pipeChild(cmsProxy, "[cms-proxy] ", "[cms-proxy] ");
startAstroDev();
registerWatcher(path.join("src", "content", "posts"), "posts");

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (!cmsProxy.killed && cmsProxy.exitCode === null) {
    cmsProxy.kill("SIGTERM");
  }

  watchers.forEach((watcher) => {
    try {
      watcher.close();
    } catch {}
  });

  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  if (astroDev && !astroDev.killed && astroDev.exitCode === null) {
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
cmsProxy.on("exit", (code) => {
  if (!shuttingDown) {
    shutdown(code ?? 1);
  }
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => shutdown(0));
}
