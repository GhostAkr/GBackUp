# GBackUp
A simple Mac OS tool allowing to setup automated backup to an external drive.

## Installation

### Mac OS service

First, deploy Mac OS service which will react on external drive mounting.

1. Set "Configuration globals" variables in `deploy.sh`.
2. Set path to `gbackup.sh` in "Program arguments" in `local.ghostakr.gbackup.plist` according to the home path in `deploy.sh`. `gbackup.sh` should be located at `~/Scripts`.
3. Run `deploy.sh`.
