source ~/code/config/env.sh
source ~/code/config/fish_prompt.fish
set fish_greeting

function _wrap_with_tone
    set absolutePath (which $argv[1])
    alias $argv[1] "tone $absolutePath"
end
function _wrap_with_custom
    set absolutePath (which $argv[1])
    alias $argv[1] $argv[2]" $absolutePath"
end
