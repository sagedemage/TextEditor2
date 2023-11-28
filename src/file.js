/* File actions */

const fs = require('fs');

const { dialog, Notification, BrowserWindow } = require('electron')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = '';
    }

    show_file_path(file_path) {
        /* Show the file path on the title of the window */
        const focused_window = BrowserWindow.getFocusedWindow()

        focused_window.setTitle('Text Editor 2 - ' + file_path)
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

    write_file(file_path, file_content) {
        /* Write content to the text file */
        // Write to file (Save file)
        fs.writeFile(file_path, file_content, function (err) {
            if (err) {
                console.error(err)
            }
        })

        // show the file path on the page
        this.show_file_path(this.file_path)

        this.show_notification('Saved', 'File saved!')
    }

    async save_file(file_content) {
        /* Save the text file */
        if (this.file_path === '') {
            const { filePath } = await dialog.showSaveDialog({
                title: 'Choose the file path to save to',
                properties: []
            })

            if (filePath !== '') {
                this.file_path = filePath;
                this.write_file(this.file_path, file_content)
            }
        }
        else {
            this.write_file(this.file_path, file_content)
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

            if (this.file_path !== '') {
                fs.readFile(this.file_path, 'utf8', function (err, content) {
                    if (err) {
                        console.error(err)
                    }

                    // Show the content on the text box
                    web_contents.send('set-content', content)
                })

                this.show_notification('Opened', 'File opened!')

                // show the file path on the page
                this.show_file_path(this.file_path)
            }
        }
    }
}

module.exports = File
