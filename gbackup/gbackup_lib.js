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
