## System Setup

- install homebrew

```
brew install git fish
```

- sshkey
- gpg key

- `mkdir ~/code`
- `git clone git@github.com:paperdave/config`

put this into ~/.config/fish/config.fish

```fish
source ~/code/config/fish_config.fish
```

## Applications

- raycast
- karabiner elements
- keyboard maestro
- ghostty
- topnotch

## keyboard repeat

```
defaults write -g InitialKeyRepeat -int 9
defaults write -g KeyRepeat -int 1
defaults write -g ApplePressAndHoldEnabled -bool false
```

## install zig

a zigup wrapper is included within ./bin/zigup

```
zigup
```

## `/run` binary


`sudo nano` in `/etc/synthetic.conf`
```
run    Users/dave/code/config/bin/my-env
```
**warn**: you MUST use a tab character for

## CodeEditor

`./CodeEditor/build.sh`