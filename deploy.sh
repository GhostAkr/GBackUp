# == Global paths ==

readonly GBACKUP_SCRIPT="shell/gbackup.sh"
readonly SERVICE="local.ghostakr.gbackup.plist"
readonly LIBRARY="gbackup/gbackup_lib.js"

readonly SCRIPT_TARGET_PATH="${HOME}/Scripts"
readonly SERVICE_TARGET_PATH="${HOME}/Library/LaunchAgents"
readonly LIBRARY_TARGET_PATH="${HOME}/Library/Script Libraries"

# == Deploy services ==

cp ${SERVICE} ${SERVICE_TARGET_PATH}

# == Deploy shell scripts ==

cp ${GBACKUP_SCRIPT} ${SCRIPT_TARGET_PATH}

# == Deploy library ==

cp ${LIBRARY} "${LIBRARY_TARGET_PATH}"

# == Load services ==

launchctl unload -w "${SERVICE_TARGET_PATH}/${SERVICE}" 2> /dev/null
launchctl load -w "${SERVICE_TARGET_PATH}/${SERVICE}"
