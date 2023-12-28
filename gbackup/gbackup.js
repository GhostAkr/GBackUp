var app = Application.currentApplication()
app.includeStandardAdditions = true

/**
 * GBackUp App entry point.
 * @param {} argv Ignored.
 */
function run(argv)
{
    app.displayNotification("Hello, world!",
    {
        withTitle: "GBackUp",
        soundName: "Frog"
    })
}