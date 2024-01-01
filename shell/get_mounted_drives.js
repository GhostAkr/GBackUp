/**
 * Obtains a list of mounted drives in the system
 * @param {string} argv Ignored.
 * @returns {string} List of mounted drives in raw format.
 */
function run(argv)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    let gbackup_lib = Library("gbackup_lib.js")

    return gbackup_lib.getMountedDrives()
}
