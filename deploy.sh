# == Configuration globals ==
# Set these globals to reflect your system

# Home directory
readonly HOME_PATH="/Users/ghostakr"

# == Global paths ==

readonly GBACKUP_SCRIPT="gbackup.sh"
readonly SERVICE="local.ghostakr.gbackup.plist"

readonly SCRIPT_TARGET_PATH="${HOME_PATH}/Scripts"
readonly SERVICE_TARGET_PATH="${HOME_PATH}/Library/LaunchAgents"

# == Copy files ==

cp ${GBACKUP_SCRIPT} ${SCRIPT_TARGET_PATH}
cp ${SERVICE} ${SERVICE_TARGET_PATH}

# == Load services ==

launchctl unload -w "${SERVICE_TARGET_PATH}/${SERVICE}" 2> /dev/null
launchctl load -w "${SERVICE_TARGET_PATH}/${SERVICE}"
