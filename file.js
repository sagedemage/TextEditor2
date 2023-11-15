/* File actions */

const fs = require('fs');

const { dialog, Notification, BrowserWindow } = require('electron')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = "";
    }

    show_file_path(file_path) {
        /* Show the file path on the page */
        const web_contents = BrowserWindow.getFocusedWindow().webContents;

        // show the file path
        web_contents.executeJavaScript(`document.getElementById("file_path").innerHTML = "${file_path}"`, function (result) {
            console.log(result)
        })
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

        // Create a new Notification with custom options
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

        // show the file path on the page
        this.show_file_path(this.file_path)
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

                    console.log("File opened!")

                    // Show the content on the text box
                    web_contents.executeJavaScript(`document.getElementById("text_box").value = \`${data}\``, function (result) {
                        console.log(result)
                    })
                })

                this.show_notification("Opened", "File opened!")

                // show the file path on the page
                this.show_file_path(this.file_path)
            }

        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = File
