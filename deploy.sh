# == Global paths ==

readonly GBACKUP_SCRIPT="shell/gbackup.sh"
readonly SERVICE="local.ghostakr.gbackup.plist"

readonly SCRIPT_TARGET_PATH="${HOME}/Scripts"
readonly SERVICE_TARGET_PATH="${HOME}/Library/LaunchAgents"

# == Deploy services ==

cp ${SERVICE} ${SERVICE_TARGET_PATH}

# == Deploy shell scripts ==

cp ${GBACKUP_SCRIPT} ${SCRIPT_TARGET_PATH}

# == Load services ==

launchctl unload -w "${SERVICE_TARGET_PATH}/${SERVICE}" 2> /dev/null
launchctl load -w "${SERVICE_TARGET_PATH}/${SERVICE}"
