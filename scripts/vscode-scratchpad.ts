#!/usr/bin/env bun
// Opens a "scratchpad" VSCode window in a temporary directory.
// The directory is deleted when the window is closed, unless you run the script:
//   "ks <dest>" (keep scratchpad) in the terminal to move the directory to a permanent location
import fs from "fs";

const root = `/tmp/scratchpad_${new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..+/, "")}`;

fs.mkdirSync(root);
fs.writeFileSync(root + ".remove", "");

console.log(`Scratchpad is at ${root}`);

Bun.spawnSync({
  cmd: ["/opt/homebrew/bin/code", "-n", root, "-w"],
});

if (fs.existsSync(root + ".remove")) {
  fs.rmSync(root, { recursive: true });
} else {
  fs.rmSync(root + ".remove");
}
