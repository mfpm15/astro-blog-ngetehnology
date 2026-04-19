import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const sourceRoot = path.join(rootDir, ".agents");

const textTargets = [
  ["AGENTS.md", "AGENTS.md"],
  ["AGENTS.md", "GEMINI.md"],
  ["AGENTS.md", path.join(".github", "copilot-instructions.md")],
  ["AGENTS.md", path.join(".codex", "instructions.md")],
];

const directoryTargets = [
  ["skills", path.join(".codex", "skills")],
  ["command", path.join(".codex", "commands")],
  ["command", path.join(".github", "agents")],
];

async function writeTextTarget(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(sourceRoot, sourceRelativePath);
  const targetPath = path.join(rootDir, targetRelativePath);
  const content = await readFile(sourcePath, "utf8");
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, content, "utf8");
  return targetRelativePath;
}

async function copyDirectoryTarget(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(sourceRoot, sourceRelativePath);
  const targetPath = path.join(rootDir, targetRelativePath);
  await mkdir(path.dirname(targetPath), { recursive: true });
  await cp(sourcePath, targetPath, { recursive: true, force: true });
  return targetRelativePath;
}

const writtenTargets = [];

for (const [sourceRelativePath, targetRelativePath] of textTargets) {
  writtenTargets.push(await writeTextTarget(sourceRelativePath, targetRelativePath));
}

for (const [sourceRelativePath, targetRelativePath] of directoryTargets) {
  writtenTargets.push(await copyDirectoryTarget(sourceRelativePath, targetRelativePath));
}

console.log("Exported agent instructions:");
for (const target of writtenTargets) {
  console.log(`- ${target}`);
}
