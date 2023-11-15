/* File actions */

const fs = require('fs');

const { dialog, Notification, BrowserWindow } = require('electron')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = "";
    }

    show_file_path(file_path) {
        /* Show the file path on the title of the window */
        let win = BrowserWindow.getFocusedWindow()

        win.setTitle('Text Editor 2 - ' + file_path)
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

        try {
            // Write to file (Save file)
            fs.writeFileSync(file_path, file_content)

            this.show_notification("Saved", "File saved!")

            // show the file path on the page
            this.show_file_path(this.file_path)

            console.log("File saved!")
        }
        catch(error) {
            console.error(error)
        }
    }

    async save_file() {
        /* Save the text file */
        if (this.file_path === "") {
            const { filePath } = await dialog.showSaveDialog({
                title: "Choose the file path to save to",
                properties: []
            })

            if (filePath !== "") {
                this.file_path = filePath;
                this.write_file(this.file_path)
            }
        }
        else {
            this.write_file(this.file_path)
        }
    }

    async open_file() {
        /* Open the text file */
        const web_contents = BrowserWindow.getFocusedWindow().webContents;

        const { filePaths } = await dialog.showOpenDialog({
            properties: ['openFile']
        })

        if (filePaths[0] !== undefined) {
            this.file_path = filePaths[0];

            if (this.file_path !== "") {
                const content = fs.readFileSync(this.file_path, 'utf8')

                if (content !== "") {
                    // Show the content on the text box
                    web_contents.executeJavaScript(`document.getElementById("text_box").value = \`${content}\``, function (result) {
                        console.log(result)
                    })

                    this.show_notification("Opened", "File opened!")

                    // show the file path on the page
                    this.show_file_path(this.file_path)

                    console.log("File opened!")
                }
            }
        }
    }
}

module.exports = File
