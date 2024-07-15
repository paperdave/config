source ~/code/config/env.sh
source ~/code/config/fish_prompt.fish
set fish_greeting

export TERM=xterm-color

export EDITOR="nvim"

alias z "zig build"

. /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.fish
source "$HOME/.cargo/env.fish"

function g
    if test -z "$argv"
        git status
    else
        git $argv
    end
end

alias gp="git pull"
alias gc="git commit"
alias gs="git switch"
alias gm="git merge"
alias gl="git log"
alias ga="git add"
alias gr="git remove"
