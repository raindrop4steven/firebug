function runTest()
{
    FBTest.openNewTab(basePath + "commandLine/api/profile.html", function(win)
    {
        FBTest.openFirebug(function() {
            FBTest.enableConsolePanel(function() {
                var expectedWarning = FW.FBL.$STR("ProfilerRequiresTheScriptPanel");
                FBTest.executeCommandAndVerify(function()
                {
                    FBTest.enableScriptPanel(function(win)
                    {
                        var config = {tagName: "table", classes: "profileTable"};
                        FBTest.waitForDisplayedElement("console", config, function(row)
                        {
                            FBTest.testDone("commandline.profile.DONE");
                        });

                        FBTest.executeCommand("profile()");
                        FBTest.click(win.document.getElementById("testButton"));
                        FBTest.executeCommand("profileEnd()");
                    });
                }, "profile();", expectedWarning, "div", "logRow-warn", true);
            });
        });
    });
}
