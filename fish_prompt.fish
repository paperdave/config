function fish_prompt
  set -l exitcode "$status"
  printf (set_color reset)(set_color grey)
  printf "\n\033[1F"

  # if is a git repository
  if git rev-parse --is-inside-work-tree >/dev/null 2>/dev/null
    # repo name
    set -l reporoot (git rev-parse --show-toplevel)
    printf (set_color blue)(basename $reporoot)

    # branch
    set -l branchname (git symbolic-ref --short HEAD)
    set -l mainbranch (git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null)
    set -l mainbranch (string sub -s 11 "$mainbranch")
    if test -z "$mainbranch"
      set mainbranch "main"
    end
    if test "$branchname" != "$mainbranch"
      set -l branchname (string split / $branchname)[-1]
      printf (set_color magenta)\($branchname\)
    end

    # rest of the path
    printf (set_color grey)(string join "/" (string split "/" (string sub -s (math (string length $reporoot) + 1) $PWD)))
  else
    # non git path formatting
    switch "$PWD"
      case "$HOME*"
        printf "~"(string sub -s (math (string length $HOME) + 1) "$PWD")
      case "/tmp/scratchpad_*"
        printf (set_color brred)"scratch"
      case '*'
        printf "%s" "$PWD"
    end
  end

  # print the $
  if test "$exitcode" -ne 0
    printf (set_color brred)" \$"(set_color brwhite)" "
  else
    printf (set_color brwhite)" \$ "
  end
end
