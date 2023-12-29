# == Global paths ==

readonly GBACKUP_SCRIPT="shell/gbackup.sh"
readonly SERVICE="local.ghostakr.gbackup.plist"

readonly SCRIPT_TARGET_PATH="${HOME}/Scripts"
readonly SERVICE_TARGET_PATH="${HOME}/Library/LaunchAgents"

# == Copy files ==

cp ${GBACKUP_SCRIPT} ${SCRIPT_TARGET_PATH}
cp ${SERVICE} ${SERVICE_TARGET_PATH}

# == Load services ==

launchctl unload -w "${SERVICE_TARGET_PATH}/${SERVICE}" 2> /dev/null
launchctl load -w "${SERVICE_TARGET_PATH}/${SERVICE}"
