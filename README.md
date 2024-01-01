# GBackUp
A simple Mac OS tool allowing to setup automated backup to an external drive.

## Installation

### Mac OS service

First, deploy Mac OS service which will react on external drive mounting.

1. Set path to `gbackup.sh` in "Program arguments" in `local.ghostakr.gbackup.plist` 
according to the home path in `deploy.sh`. `gbackup.sh` should be located at `~/Scripts`.
3. Run `deploy.sh`.

## Debugging

To debug GBackUp app copy the code from `gbackup.js` to a Script Editor in Mac OS. Then compile the application.

**Note**: JXA application compiler from AppleScript VS Code extension doesn't work properly with external libraries.
