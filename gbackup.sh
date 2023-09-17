# TODO: These are mockup vars. Need to be removed when MVP is ready
readonly EXT_VOL_NAME=GABackUp
readonly RES_FILE_PATH=~/Desktop

# Paths
readonly SCRIPT_PATH=$(dirname $(realpath $0))
readonly OS_INTERACTIONS_PATH=$SCRIPT_PATH/os_interaction

# TODO: Execute only when an external drive with specific name is mounted
# if [[ ${mount | awk '$3 == "/Volumes/${EXT_VOL_NAME}" {print $3}'} != "" ]];
if true;
then
    dialog_text="Wanna see the rabit hole?"

    res=$(osascript ${OS_INTERACTIONS_PATH}/show_dialog.js "${dialog_text}")

    case ${res} in
        YES)
            res_file_name="yes.answer"
            ;;
        NO)
            res_file_name="no.answer"
            ;;
        *)
            res_file_name="unknown.answer"
            ;;
    esac

    touch ${RES_FILE_PATH}/${res_file_name}
fi
