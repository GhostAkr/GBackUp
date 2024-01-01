/**
 * Compares the list of given drives with the config.
 * @param {string} argv List of drives to be checked in the config.
 */
function run(argv)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let gbackup_lib = Library("gbackup_lib.js")

    return gbackup_lib.searchForDrive(argv)
}
