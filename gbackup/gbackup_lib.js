/**
 * Shows GBackUp app notification with given text.
 * @param {string} text Text to display on the notification.
 */
function showNotification(text)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let appName = "GBackUp"

    app.displayNotification(text,
    {
        withTitle: appName,
        soundName: "Frog"
    })
}

/**
 * Shows GBackUp app dialog with given text. Possible buttons are "Yes" and "No".
 * @param {string} text Text to display on the dialog.
 * @returns {string} User's answer: "Yes" or "No".
 */
function showDialog(text)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let appName = "GBackUp"

    dlg_res = app.displayDialog(text,
    {
        withTitle: appName,
        withIcon: "note",
        buttons: ["No", "Yes"],
        defaultButton: "No"
    })

    return dlg_res.buttonReturned
}

/**
 * Shows GBackUp app drop list with given items.
 * @param {string} items Items to be shown in the drop list. Items are represented as a 
 * string separated by ",".
 * @returns {string|boolean} Selected item, false boolean if no drive is selected.
 */
function showDropList(items)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let appName = "GBackUp"

    let itemsList = items.split(",")

    var chosenItem = app.chooseFromList(itemsList, {
        withTitle: appName,
        withPrompt: "Select a drive which backup should be done to:"
    })

    return chosenItem
}

/**
 * Obtains a list of drives monuted in the system. "Mounted" drives are the ones located at
 * /Volumes.
 * @returns {string} List of mounted drives, "FALSE" if no drive is mounted.
 */
function getMountedDrives()
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let cmd = "mount | awk '$3 ~ \"^/Volumes/.*\" {print($3)}'"

    let falseRet = "FALSE"
    try
    {
        var res = app.doShellScript(cmd, {
            alteringLineEndings: false
        })
    }
    catch
    {
        return falseRet
    }
    
    return (res == "" ? falseRet : res)
}

/**
 * Compares the list of given drives with the config.
 * @param {string} drives List of drives to be compared in form of string separated by "\r".
 * @returns {string} List of matched drives in form of string separated by ",", "FALSE" if 
 * no drive is matched.
 */
function searchForDrive(drives)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let falseRet = "FALSE"
    try
    {
        const libraryPath = app.pathTo("library folder", { from: "user domain" }).toString()
        const configPath = String(`${libraryPath}/Preferences/GBackUp/config.json`)

        let configStr = app.read(Path(configPath))
        let config = JSON.parse(configStr)

        let drivesList = drives.toString().split(/\n/)
        for (let ix = 0; ix < drivesList.length; ix++)
            drivesList[ix] = drivesList[ix].split("/")[2]

        // Case when initial drives ends with "\n"
        if (drivesList[drivesList.length - 1] === undefined)
            drivesList.pop()

        let resDrives = []
        drivesList.forEach(driveToCheck => {
            config.drives.forEach(driveFromConfigRaw => {
                let driveFromConfig = driveFromConfigRaw.name

                if (driveToCheck.localeCompare(driveFromConfig, undefined,
                    {sensitivity: "base"}) == 0
                ){
                    resDrives.push(driveToCheck)
                }
            })
        })

        return (resDrives.length == 0 ? falseRet : resDrives.toString())
    }
    catch
    {
        return falseRet
    }
}
