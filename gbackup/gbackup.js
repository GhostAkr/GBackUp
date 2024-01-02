var app = Application.currentApplication()
app.includeStandardAdditions = true

/**
 * Sets GBackUp app progress bar.
 * @param {number} stepsCount Total number of steps for the progress bar.
 */
function setProgressBar(stepsCount)
{
    Progress.totalUnitCount = stepsCount
    Progress.completedUnitCount = 0
    Progress.description = "Performing backup..."
    Progress.additionalDescription = "Preparing to backup."
}

/**
 * Updates GBackUp app progress bar.
 * @param {number} currentStep Current step for the progress bar.
 */
function updateProgressBar(currentStep)
{
    Progress.additionalDescription = "Processing " + currentStep + " of " + 
        Progress.totalUnitCount

    Progress.completedUnitCount = currentStep
}

/**
 * Unsets GBackUp app progress bar.
 */
function unsetProgressBar()
{
    Progress.totalUnitCount = 0
    Progress.completedUnitCount = 0
    Progress.description = ""
    Progress.additionalDescription = ""
}

/**
 * Backs up the given folder to the given destination.
 * @param {string} from Folder that should be backed up.
 * @param {string} to Backup destination folder.
 */
function backupItem(from, to)
{
    let gbackupUtils = Library("gbackup_lib.js")
    let cmd = `rsync -a --delete "${from}" "${to}"`

    try
    {
        app.doShellScript(cmd)
    }
    catch
    {
        let errorMsg = `Error while backing up ${from}`
        gbackupUtils.showNotification(errorMsg)
    }
}

/**
 * Backs up all items specified in the config.
 * @param {string} driveName Name of target backup drive.
 */
function backupAll(driveName)
{
    try
    {
        const libraryPath = app.pathTo("library folder", { from: "user domain" }).toString()
        const configPath = String(`${libraryPath}/Preferences/GBackUp/config.json`)

        let configStr = app.read(Path(configPath))
        let config = JSON.parse(configStr)

        let mapping = []
        config.drives.forEach(drive => {
            if (drive.name.localeCompare(driveName, undefined,
                {sensitivity: "base"}) != 0
            ){
                return
            }

            mapping = drive.mapping            
        });

        let itemsCnt = mapping.length
        setProgressBar(itemsCnt)

        let itemNum = 0
        mapping.forEach(backupPair => {
            let from = backupPair[0]
            let to = `/Volumes/${driveName}${backupPair[1]}`

            itemNum++;
            updateProgressBar(itemNum)

            backupItem(from, to)
        })

        unsetProgressBar()
    }
    catch
    {
        // Eat exceptions
    }
}

/**
 * GBackUp App entry point.
 * @param {} argv Ignored.
 */
function run(argv)
{
    let gbackupUtils = Library("gbackup_lib.js")

    let proceedMsg = "Backup drive is mounted. Do you want to proceed with backup?"
    let proceed = gbackupUtils.showDialog(proceedMsg)
    if (proceed == "No")
        return

    // Check mounted drives one more time since it is possible that suitable drives were
    // unmounted while waiting for user's input
    let mountedDrives = gbackupUtils.getMountedDrives()
    let backupDrives = gbackupUtils.searchForDrive(mountedDrives)
    if (backupDrives == "FALSE")
    {
        let allUnmountedMsg = "All backup drives were unmounted. Closing the app"
        gbackupUtils.showNotification(allUnmountedMsg)
        return
    }

    let chosenDrive = gbackupUtils.showDropList(backupDrives)
    if (chosenDrive == false)
        return

    // Check if selected drive is still mounted
    let driveRawName = `/Volumes/${chosenDrive}`.toLowerCase()
    mountedDrives = gbackupUtils.getMountedDrives()
    if (!(mountedDrives.toLowerCase().includes(driveRawName)))
    {
        let selectedUnmountedMsg = "Selected drive was unmounted. Closing the app"
        gbackupUtils.showNotification(selectedUnmountedMsg)
        return
    }

    let backupStartedMsg = `Starting backup to ${chosenDrive}`
    gbackupUtils.showNotification(backupStartedMsg)

    backupAll(chosenDrive)

    let backupFinishedMsg = `Backup to ${chosenDrive} is complete`
    gbackupUtils.showNotification(backupFinishedMsg)
}
