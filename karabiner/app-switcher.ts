import { rule, map, writeToProfile } from "karabiner.ts";
import { join } from "path";

const rules = [
  rule("pasting").manipulators([
    map("`", ["option", "command"]).toApp("Keyboard Maestro"),
    map("1", ["option", "command"]).toApp("Safari"),
    map("2", ["option", "command"]).toApp("Ghostty"),
    map("3", ["option", "command"]).toApp("Discord"),
    map("4", ["option", "command"]).toApp("Linear"),
    map("5", ["option", "command"]).toApp("Music"),
    map("9", ["option", "command"]).toApp("TrackingTime"),

    map("0", ["option", "command"]).to$(
      `/run bun ${join(import.meta.dir, "../scripts/code-scratchpad.ts")}`
    ),
  ]),
];

export default rules;

if (Bun.main === import.meta.path)
  console.log(writeToProfile("--dry-run", rules));
