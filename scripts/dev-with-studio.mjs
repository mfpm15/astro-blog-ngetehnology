import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const nodeCmd = isWindows ? "node.exe" : "node";
const pnpmCmd = isWindows ? "pnpm.cmd" : "pnpm";

const studioServer = spawn(nodeCmd, ["scripts/studio-file-server.mjs"], {
  stdio: "inherit",
  shell: false,
});

const astroDev = spawn(pnpmCmd, ["astro", "dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: false,
});

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (!studioServer.killed) {
    studioServer.kill("SIGTERM");
  }
  if (!astroDev.killed) {
    astroDev.kill("SIGTERM");
  }

  setTimeout(() => process.exit(code), 250);
}

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
