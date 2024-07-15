function fish_prompt
    set -l exitcode "$status"

    # print the "show cursor" escape code in case a program exited while the cursor was hidden
    printf "\033[?25h"

    printf (set_color reset)(set_color grey)
    printf "\n\033[1F"

    # if is a git repository
    if git rev-parse --is-inside-work-tree >/dev/null 2>/dev/null
        # repo name
        set -l reporoot (git rev-parse --show-toplevel 2>/dev/null)
        printf (set_color blue)(basename $reporoot)

        # branch
        set -l branchname (git symbolic-ref --short HEAD 2>/dev/null)
        if test "$branchname" != "main" && test "$branchname" != "master"
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
                printf (set_color brred)"scratch"(set_color grey)(string sub -s 32 "$PWD")
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
