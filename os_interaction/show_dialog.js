/**
 * Runs system dialog allowing user to choose "Yes" or "No".
 * @param {} argv Text which should be displayed on the dialog.
 * @returns {string} "YES" if "Yes" has been chosen, "NO" if "No" has been chosen,
 *                   "UNKNOWN" otherwise.
 */
function run(argv)
{
    let app = Application.currentApplication()
    app.includeStandardAdditions = true

    dlg_res = app.displayDialog(argv,
    {
        withIcon: "note",
        buttons: ["No", "Yes"],
        defaultButton: "No"
    })

    let func_res = ""
    switch (dlg_res.buttonReturned)
    {
        case "No":
            func_res = "NO"
            break
        case "Yes":
            func_res = "YES"
            break
        default:
            func_res = "UNKNOWN"
            break
    }

    return func_res
}
