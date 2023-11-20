import {
  layer,
  map,
  NumberKeyValue,
  rule,
  withMapper,
  writeToProfile,
} from "karabiner.ts";

import { readdir, readFile } from "fs/promises";
import { join } from "path";

async function recursiveImport(dir: string): Promise<any[]> {
  const files = await readdir(dir, { withFileTypes: true });
  const values = [];
  for (const file of files) {
    const filePath = `${dir}/${file.name}`;

    if (file.isDirectory()) {
      values.push(Promise.all(await recursiveImport(filePath)));
    } else if (file.name.endsWith(".ts")) {
      values.push(import(filePath));
    }
  }
  return (await Promise.all(values)).flat();
}

const modules = await recursiveImport(join(import.meta.dir, "../karabiner"));

writeToProfile("Default", modules.map((m) => m.default).flat());
