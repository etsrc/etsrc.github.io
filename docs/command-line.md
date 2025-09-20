# Command Line

## Terminals and Shell

- ![Favicon](https://www.google.com/s2/favicons?domain=wezterm.org&sz=16) [wezterm](https://wezterm.org/index.html)
- ![Favicon](https://www.google.com/s2/favicons?domain=sw.kovidgoyal.net&sz=16) [kitty](https://sw.kovidgoyal.net/kitty/)
- ![Favicon](https://www.google.com/s2/favicons?domain=fishshell.com&sz=16) [fishshell](https://fishshell.com/)
- ![Favicon](https://www.google.com/s2/favicons?domain=ohmyz.sh&sz=16) [ohmyzsh](https://ohmyz.sh/)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [tmux](https://github.com/tmux/tmux)
- ![Favicon](https://www.google.com/s2/favicons?domain=starship.rs&sz=16) [starship](https://starship.rs/)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [GitHub - romkatv/powerlevel10k: A Zsh theme](https://github.com/romkatv/powerlevel10k)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [GitHub - zsh-users/zsh-syntax-highlighting: Fish shell like syntax highlighting for Zsh.](https://github.com/zsh-users/zsh-syntax-highlighting)

## Productivity Tools

- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [fzf](https://github.com/junegunn/fzf)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [pet](https://github.com/knqyf263/pet)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [fd](https://github.com/sharkdp/fd)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [ripgrep](https://github.com/BurntSushi/ripgrep)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [fabric](https://github.com/danielmiessler/fabric)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [taskwarrior](https://github.com/GothenburgBitFactory/taskwarrior)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [pueue](https://github.com/Nukesor/pueue)
- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [gotty](https://github.com/sorenisanerd/gotty)

## Network

- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [asn](https://github.com/nitefood/asn)

## Scripting

- ![Favicon](https://www.google.com/s2/favicons?domain=github.com&sz=16) [zx](https://github.com/google/zx)

## Docs and Manuals

- ![Favicon](https://www.google.com/s2/favicons?domain=tldr.sh&sz=16) [tldr](https://tldr.sh/)
- ![Favicon](https://www.google.com/s2/favicons?domain=cheat.sh&sz=16) [cheat.sh](https://cheat.sh/)

## .zshrc

```shell
# setup plugins and prompt
plugins=(git golang zsh-autosuggestions)
source $ZSH/oh-my-zsh.sh
eval "$(starship init zsh)"

# add cheat.sh cheat sheet
ch() {
  curl "cht.sh/$*"
}

_ch_complete() {
  local -a topics
  topics=(${(f)"$(curl -s https://cht.sh/:list)"})
  compadd "$@" -- $topics
}

compdef _ch_complete ch

# add gemini cli
export GEMINI_API_KEY=""
gem() {
    gemini "$@"
}

```
