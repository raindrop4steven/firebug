function runTest()
{
    FBTest.openNewTab(basePath + "commandLine/4217/issue4217.html", function(win)
    {
        FBTest.openFirebug(function() {
            FBTest.selectPanel("console");

            FBTest.enableConsolePanel(function(win)
            {
                var config = {tagName: "div", classes: "logRow", counter: 2};

                FBTest.waitForDisplayedElement("console", config, function(row)
                {
                    var panelNode = FBTest.getPanel("console").panelNode;
                    var rows = panelNode.querySelectorAll(".logRow");

                    if (FBTest.compare(2, rows.length, "There must be two logs"))
                    {
                        FBTest.compare(/console.log\('hello'\)/,
                            rows[0].getElementsByClassName("objectBox-text").item(0).textContent,
                            "'console.log('hello')' must be shown inside the Console");
                        FBTest.compare("hello",
                            rows[1].getElementsByClassName("objectBox-text").item(0).textContent,
                            "'hello' must be shown inside the Console");
                    }

                    FBTest.sendShortcut("e", {ctrlKey: true, shiftKey: true});

                    rows = panelNode.querySelectorAll(".logRow");

                    if (FBTest.compare(4, rows.length, "There must be four logs"))
                    {
                        FBTest.compare(/console.log\('hello'\)/,
                            rows[2].getElementsByClassName("objectBox-text").item(0).textContent,
                            "'console.log('hello')' must be shown inside the Console");
                        FBTest.compare("hello",
                            rows[3].getElementsByClassName("objectBox-text").item(0).textContent,
                            "'hello' must be shown inside the Console");
                    }

                    FBTest.testDone("issue4217.DONE");
                });

                FBTest.executeCommand("console.log('hello')");
            });
        });
    });
}