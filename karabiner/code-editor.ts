import { rule, map, writeToProfile, ifApp } from "karabiner.ts";

const codeEditorIds = [
  'net.paperdave.CodeEditor',
  'vscode'
]

const rules = [
  rule("code editor")
    .manipulators([
      map('right_shift')
        // .condition(ifApp(codeEditorIds))
        .toIfAlone('end')
    ]),
];

export default rules;

if (Bun.main === import.meta.path)
  console.log(writeToProfile("--dry-run", rules));
