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
    Progress.additionalDescription = "Processing " + currentStep + " out of " + 
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
 * GBackUp App entry point.
 * @param {} argv Ignored.
 */
function run(argv)
{
    let gbackup_lib = Library("gbackup_lib.js")
    gbackup_lib.showNotification("Test")

    let stepsCount = 10
    setProgressBar(stepsCount)
    for (let i = 0; i < stepsCount; i++)
    {
        updateProgressBar(i + 1)
        delay(1)
    }
    unsetProgressBar()
}
