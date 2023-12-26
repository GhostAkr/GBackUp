# == Global paths ==

readonly GBACKUP_SCRIPT="gbackup.sh"
readonly SERVICE="local.ghostakr.gbackup.plist"

readonly SCRIPT_TARGET_PATH="${HOME}/Scripts"
readonly SERVICE_TARGET_PATH="${HOME}/Library/LaunchAgents"

# == Unload services

launchctl unload -w "${SERVICE_TARGET_PATH}/${SERVICE}" 2> /dev/null

# == Remove files ==

rm ${SCRIPT_TARGET_PATH}/${GBACKUP_SCRIPT}
rm ${SERVICE_TARGET_PATH}/${SERVICE}
