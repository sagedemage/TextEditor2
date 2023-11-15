/* File actions */

const fs = require('fs');

const { dialog, Notification, BrowserWindow } = require('electron')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = "";
    }

    show_notification(title, body) {
        const options = {
            title: title,
            subtitle: 'Subtitle of the Notification',
            body: body,
            silent: false,
            hasReply: true,
            timeoutType: 'never',
            replyPlaceholder: 'Reply Here',
            closeButtonText: 'Close Button',
            actions: [{
                type: 'button',
                text: 'Show Button'
            }]
        }

        // Instantiating a new Notifications Object
        // with custom Options
        const customNotification = new Notification(options);

        customNotification.show();
    }

    async write_file(file_path) {
        /* Write content to the text file */
        const web_contents = BrowserWindow.getFocusedWindow().webContents;

        // text_box content
        let file_content = await web_contents.executeJavaScript(`document.getElementById("text_box").value`, function (result) {
            console.log(result)
        })

        // Write to file (Save file)
        fs.writeFile(file_path, file_content, function (err) {
            if (err) {
                console.log(err)
                return
            }

            console.log("File saved!")
        })

        this.show_notification("Saved", "File saved!")

        web_contents.executeJavaScript(`document.getElementById("file_path").innerHTML = "${this.file_path}"`, function (result) {
            console.log(result)
        })
    }

    save_file() {
        /* Save the text file */
        if (this.file_path === "") {
            dialog.showSaveDialog({
                title: "Choose the file path to save to",
                properties: []
            }).then(result => {
                this.file_path = result.filePath;

                if (this.file_path !== "") {
                    this.write_file(this.file_path)
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            this.write_file(this.file_path)
        }
    }

    open_file() {
        /* Open the text file */
        const web_contents = BrowserWindow.getFocusedWindow().webContents;

        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(result => {
            this.file_path = result.filePaths[0];

            if (this.file_path !== "") {
                fs.readFile(this.file_path, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err)
                        return
                    }

                    //alert("File opened!");
                    console.log("File opened!")

                    // issue right here
                    // Show the content on the text box
                    web_contents.executeJavaScript(`document.getElementById("text_box").value = \`${data}\``, function (result) {
                        console.log(result)
                    })
                })

                this.show_notification("Opened", "File opened!")

                // issue is right here
                web_contents.executeJavaScript(`document.getElementById("file_path").innerHTML = "${this.file_path}"`, function (result) {
                    console.log(result)
                })
            }

        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = File
