import { rule, map, writeToProfile, ModifierKeyCode } from "karabiner.ts";

export const CapsLockModifiers: ModifierKeyCode[] = [
  "right_command",
  "right_option",
  "right_shift",
];

export const HyperModifiers: ModifierKeyCode[] = [
  "right_control",
  "right_option",
  "right_shift",
];

const rules = [
  rule("capslock -> f13(click), ctrl+opt+shift(hold)") //
    .manipulators([
      // remap caps lock
      map("caps_lock")
        .to(CapsLockModifiers[0], CapsLockModifiers.slice(1))
        .toIfAlone("f13", CapsLockModifiers),

      map("left_control")
        .to(HyperModifiers[0], HyperModifiers.slice(1))
        .toIfAlone("f13", HyperModifiers),

      // allow caps+delete
      map("delete_or_backspace", CapsLockModifiers).to("delete_forward"),

      // allow function keys
      map("f1", CapsLockModifiers).to("display_brightness_decrement"),
      map("f2", CapsLockModifiers).to("display_brightness_increment"),
      map("f3", CapsLockModifiers).to("f14"),
      map("f4", CapsLockModifiers).to("f15"),
      map("f5", CapsLockModifiers).to("f16"),
      map("f6", CapsLockModifiers).to("f17"),
      map("f7", CapsLockModifiers).to("rewind"),
      map("f8", CapsLockModifiers).to("play_or_pause"),
      map("f9", CapsLockModifiers).to("fastforward"),
      map("f10", CapsLockModifiers).to("mute"),
      map("f11", CapsLockModifiers).to("volume_decrement"),
      map("f12", CapsLockModifiers).to("volume_increment"),

      // remap apple function key
      map("fn").to("left_control"),
    ]),
];

export default rules;

if (Bun.main === import.meta.path)
  console.log(writeToProfile("--dry-run", rules));
