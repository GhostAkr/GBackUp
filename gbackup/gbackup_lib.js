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
    let res = app.doShellScript(cmd)
    
    return res
}
