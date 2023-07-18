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

fs.writeFileSync(
  root + "/package.json",
  `{
  "name": "scratchpad",
  "module": "index.ts",
  "type": "module",
  "devDependencies": {
    "bun-types": "^${Bun.version.split(".").slice(0, 2)}.0"
  }
}`
);
fs.writeFileSync(
  root + "/tsconfig.json",
  `{
  "compilerOptions": {
    "lib": ["ESNext"],
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true,
    "downlevelIteration": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,
    "types": [
      "bun-types" // add Bun global
    ]
  }
}`
);

fs.writeFileSync(root + "/index.ts", `\n`);

Bun.spawnSync({
  cmd: [process.argv[0], "install"],
  cwd: root,
});

console.log(`Scratchpad is at ${root}`);

Bun.spawnSync({
  cmd: ["/opt/homebrew/bin/code", "-n", root, "-w"],
});

if (fs.existsSync(root + ".remove")) {
  fs.rmSync(root, { recursive: true });
} else {
  fs.rmSync(root + ".remove");
}
