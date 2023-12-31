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
        var res = app.doShellScript(cmd)
    }
    catch
    {
        return falseRet
    }
    
    return (res == "" ? falseRet : res)
}

/**
 * Compares the list of given drives with the config.
 * @param {string} drives List of drives to be compared in form of string separated with
 * @returns {string} List of matched drives, "FALSE" if no drive is matched.
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

        let drivesList = drives.split(/\r/)
        for (let ix = 0; ix < drivesList.length; ix++)
            drivesList[ix] = drivesList[ix].split("/")[2]

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
