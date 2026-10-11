#!/usr/bin/env node
// PostToolUse hook: format the file Claude just edited with Prettier.
// Reads the hook payload from stdin; never fails the tool call.
import { execFileSync } from "node:child_process";
import { relative } from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;

try {
  const file = JSON.parse(input)?.tool_input?.file_path;
  const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  if (
    file &&
    /\.(tsx?|jsx?|mjs|cjs|css|json|md)$/.test(file) &&
    !relative(root, file).startsWith("..")
  ) {
    execFileSync("npx", ["prettier", "--write", "--ignore-unknown", file], {
      cwd: root,
      stdio: "ignore",
    });
  }
} catch {
  // Formatting is best-effort.
}
