readonly EXT_VOL_NAME=GABackUp
readonly RES_FILE_PATH=~/Desktop

# TODO: Execute only when an external drive with specific name is mounted
# if [[ ${mount | awk '$3 == "/Volumes/${EXT_VOL_NAME}" {print $3}'} != "" ]];
if true;
then
    dialog_text="Wanna see the rabit hole?"

    res=$(osascript os_interaction/show_dialog.js "${dialog_text}")

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
