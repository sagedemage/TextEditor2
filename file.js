/* File actions */

const fs = require('fs');

const { dialog } = require('@electron/remote')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = "";
    }

    write_file(file_path) {
        /* Write content to the text file */
        // text_box content
        let file_content = document.getElementById("text_box").value

        // Write to file (Save file)
        fs.writeFile(file_path, file_content, function (err) {
            if (err) {
                console.log(err)
                return
            }

            alert("File saved!");
            console.log("File saved!")
        })

        document.getElementById("file_path").innerHTML = file_path
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

                    alert("File opened!");
                    console.log("File opened!")

                    // Show the content on the text box
                    document.getElementById("text_box").value = data
                })

                document.getElementById("file_path").innerHTML = this.file_path
            }

        }).catch(err => {
            console.log(err)
        })
    }
}

let file = new File()

document.getElementById('save_file').addEventListener('click', () => {
    file.save_file()
})

document.getElementById('open_file').addEventListener('click', () => {
    file.open_file()
})
