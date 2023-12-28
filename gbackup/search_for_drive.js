var app = Application.currentApplication()
app.includeStandardAdditions = true

/**
 * Searches for the given drive in the config file. Search is case insensetive.
 * @param {} argv Name of the drive.
 * @returns {string} "TRUE" if drive with given name exists in the config, 
 *  "FALSE" otherwise.
 */
function run(argv)
{
    try
    {
        const libraryPath = app.pathTo("library folder", { from: "user domain" }).toString()
        const configPath = String(`${libraryPath}/Preferences/GBackUp/config.json`)

        let configStr = app.read(Path(configPath))
        let config = JSON.parse(configStr)

        found = false
        config.drives.forEach(drive => {
            if (drive.name.localeCompare(argv, undefined, {sensitivity: "base"}) == 0)
                found = true
        });

        if (found)
            return "TRUE"
    }
    catch
    {
        return "FALSE"
    }

    return "FALSE"  
}
