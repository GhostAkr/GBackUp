# Paths
readonly SCRIPT_PATH=$(dirname $(realpath $0))

mounted_drives=$(osascript ${SCRIPT_PATH}/get_mounted_drives.js)
backup_drives=$(osascript ${SCRIPT_PATH}/search_for_drive.js "${mounted_drives}")

if [ "${backup_drives}" != "FALSE" ];
then
    open -a GBackUp
fi
