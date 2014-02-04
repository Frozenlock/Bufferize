# Bufferize

Easier emacs-like buffers (tabs) navigation for LightTable.

Doesn't implement the full *buffer* capabilities. For example, it isn't possible to have 2 windows looking at the same buffer.

## Usage

`ctrl-x 3` Creates a new window.

`ctrl-x 0` Destroy the window.

`ctrl-x 1` Destroy all the other windows.

`ctrl-x o` Switch focus to next window.

`ctrl-x ctrl-o` Send current buffer to next window.

`ctrl-x b` Switch between buffers in current window.

`ctrl-x k` Kill current buffer.

## Changelog

* 0.0.3 Some clean up and add `ctrl-x 1`.
* 0.0.2 Correct keymap error.
* 0.0.1 Initial release.

## License

Copyright © 2014 Frozenlock

GNU General Public License version 3.0 (GPLv3)
