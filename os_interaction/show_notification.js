/**
 * Displays system notification banner.
 * @param {} argv Text which should be displayed on the notification.
 */
function run(argv)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let appName = "GBackUp"

    app.displayNotification(argv,
    {
        withTitle: appName,
        soundName: "Frog"
    })
}