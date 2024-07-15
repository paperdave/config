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
  JSON.stringify(
    {
      name: "scratchpad",
      module: "index.ts",
      type: "module",
      devDependencies: {
        "bun-types": `^${Bun.version.split(".").slice(0, 2)}.0`,
      },
    },
    null,
    2
  )
);
fs.writeFileSync(
  root + "/tsconfig.json",
  JSON.stringify(
    {
      compilerOptions: {
        lib: ["ESNext"],
        module: "esnext",
        target: "esnext",
        moduleResolution: "bundler",
        moduleDetection: "force",
        allowImportingTsExtensions: true,
        noEmit: true,
        strict: true,
        downlevelIteration: true,
        skipLibCheck: true,
        allowSyntheticDefaultImports: true,
        forceConsistentCasingInFileNames: true,
        allowJs: true,
        types: [
          "bun-types", // add Bun global
        ],
      },
    },
    null,
    2
  )
);

const HSLToRGB = (h: number, s: number, l: number) => {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    "#" +
    [255 * f(0), 255 * f(8), 255 * f(4)]
      .map((n) => Math.floor(n).toString(16).padStart(2, "0"))
      .join("")
  );
};

const hue = Math.floor(Math.random() * 360);

const mainBG = HSLToRGB(hue, 0.3, 0.1);
const darkerBG = HSLToRGB(hue, 0.33, 0.08);
const accent1 = HSLToRGB(hue, 0.7, 0.7);

fs.mkdirSync(root + "/.vscode");
fs.writeFileSync(
  root + "/.vscode/settings.json",
  JSON.stringify({
    "files.exclude": {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/CVS": true,
      "**/.DS_Store": true,
      "**/Thumbs.db": true,
      ".vscode": true,
    },
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": HSLToRGB(hue, 0.5, 0.5),
      "titleBar.activeForeground": "#ffffff",
      "titleBar.inactiveBackground": HSLToRGB(hue, 0.6, 0.4),
      "titleBar.inactiveForeground": "#ffffff",

      "editor.background": mainBG,
      "sideBar.background": mainBG,
      "dropdown.background": mainBG,
      "input.background": mainBG,
      "inputValidation.errorBackground": mainBG,

      "activityBar.border": darkerBG,
      "editorGroupHeader.noTabsBackground": darkerBG,
      "editorGroupHeader.tabsBackground": darkerBG,
      "editorGroupHeader.tabsBorder": darkerBG,
      "inputValidation.infoBackground": darkerBG,
      "inputValidation.warningBackground": darkerBG,
      "minimap.background": darkerBG,
      "panel.background": darkerBG,
      "sideBar.border": darkerBG,
      "sideBarSectionHeader.background": darkerBG,
      "sideBarSectionHeader.border": darkerBG,
      "statusBar.border": darkerBG,
      "tab.activeBackground": darkerBG,
      "tab.border": darkerBG,
      "tab.inactiveBackground": darkerBG,
      "terminal.background": darkerBG,
      "titleBar.border": darkerBG,
      "welcomePage.tileBackground": darkerBG,
      "statusBar.debuggingBorder": darkerBG,
      "statusBar.noFolderBorder": darkerBG,
      "tab.unfocusedActiveBackground": darkerBG,
      "tab.unfocusedInactiveBackground": darkerBG,

      "activityBar.activeBorder": accent1,
      "activityBarBadge.background": accent1,
      "badge.background": "#ffcc6633",
      "badge.foreground": accent1,
      "button.background": accent1,
      "debugConsoleInputIcon.foreground": accent1,
      "editorCursor.foreground": accent1,
      "editorLink.activeForeground": accent1,
      "editorSuggestWidget.highlightForeground": accent1,
      "extensionButton.prominentBackground": accent1,
      focusBorder: "#ffcc66b3",
      "inputOption.activeBackground": "#ffcc6633",
      "inputOption.activeBorder": "#ffcc664d",
      "inputOption.activeForeground": accent1,
      "list.highlightForeground": accent1,
      "listFilterWidget.outline": accent1,
      "panelTitle.activeBorder": accent1,
      "progressBar.background": accent1,
      "statusBarItem.remoteBackground": accent1,
      "tab.activeBorder": accent1,
      "textLink.activeForeground": accent1,
      "textLink.foreground": accent1,
      //"debugConsole.warningForeground": accent1,
      //"editorHoverWidget.highlightForeground": accent1,
      //"editorInlayHint.background": "#ffcc660d",
      //"editorInlayHint.parameterBackground": "#ffcc660d",
      //"editorInlayHint.typeBackground": "#ffcc660d",
      //"editorMarkerNavigationWarning.background": accent1,
      //"editorMarkerNavigationWarning.headerBackground": "#ffcc661a",
      //"editorSuggestWidget.focusHighlightForeground": accent1,
      //"extensionBadge.remoteBackground": accent1,
      //"extensionButton.background": accent1,
      //"extensionIcon.verifiedForeground": accent1,
      //"inlineChatInput.focusBorder": "#ffcc66b3",
      //"list.focusHighlightForeground": accent1,
      //"minimap.warningHighlight": accent1,
      //"notebook.cellInsertionIndicator": "#ffcc66b3",
      //"notebook.focusedCellBorder": "#ffcc66b3",
      //"notebook.focusedEditorBorder": "#ffcc66b3",
      //"notificationLink.foreground": accent1,
      //"notificationsWarningIcon.foreground": accent1,
      //"ports.iconRunningProcessForeground": accent1,
      //"problemsWarningIcon.foreground": accent1,
      //"sash.hoverBorder": "#ffcc66b3",
      //"settings.focusedRowBorder": "#ffcc66b3",
      //"terminal.tab.activeBorder": accent1,
      //"welcomePage.progress.foreground": accent1,

      "activityBar.background": mainBG,
      "editor.lineHighlightBackground": HSLToRGB(hue, 0.35, 0.12),
      "statusBar.background": HSLToRGB(hue, 0.4, 0.05),
      "statusBar.foreground": "#ffffff",
      "statusBar.debuggingForeground": "#111111",
      "statusBar.debuggingBackground": HSLToRGB((hue + 20) % 360, 0.7, 0.4),
    },
  })
);

fs.writeFileSync(root + "/index.ts", `\n`);

Bun.spawnSync({
  cmd: [process.argv[0], "install"],
  cwd: root,
});

console.log(`Scratchpad is at ${root}`);

Bun.spawnSync({
  cmd: ["/run", "code", "-n", root, "-w"],
});

if (fs.existsSync(root + ".remove")) {
  fs.rmSync(root, { recursive: true });
} else {
  fs.rmSync(root + ".remove");
}
