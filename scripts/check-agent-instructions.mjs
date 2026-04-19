import { lstat } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const targets = [
  { label: "Canonical instructions", path: ".agents/AGENTS.md", required: true },
  { label: "AgentSync config", path: ".agents/agentsync.toml", required: true },
  { label: "Root AGENTS", path: "AGENTS.md", required: true },
  { label: "Gemini instructions", path: "GEMINI.md", required: true },
  { label: "Copilot instructions", path: ".github/copilot-instructions.md", required: true },
  { label: "Codex instructions", path: ".codex/instructions.md", required: true },
  { label: "Codex skills", path: ".codex/skills", required: true },
  { label: "Codex commands", path: ".codex/commands", required: true },
  { label: "GitHub agent commands", path: ".github/agents", required: true },
];

async function getTargetState(relativePath) {
  try {
    const stats = await lstat(path.join(rootDir, relativePath));
    if (stats.isSymbolicLink()) return "symlink";
    if (stats.isDirectory()) return "directory";
    if (stats.isFile()) return "file";
    return "present";
  } catch {
    return "missing";
  }
}

let hasFailure = false;

for (const target of targets) {
  const state = await getTargetState(target.path);
  const ok = state !== "missing";
  if (!ok && target.required) {
    hasFailure = true;
  }
  console.log(`${ok ? "OK" : "ERR"} ${target.label}: ${target.path} (${state})`);
}

if (hasFailure) {
  console.error("\nAgent instruction sync is incomplete.");
  process.exit(1);
}

console.log("\nAgent instruction sync is ready.");
