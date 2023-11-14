/* File actions */

const fs = require('fs');

const { dialog } = require('@electron/remote')

class File {
    /* File object to perform file operations */
    constructor() {
        this.file_path = undefined;
    }

    save_file() {
        /* Save the text file */
        dialog.showSaveDialog({
            title: "Choose the file path to save to",
            properties: []
        }).then(result => {
            //let file_path = result.filePath;
            this.file_path = result.filePath;

            // text_box content
            let file_content = document.getElementById("text_box").value

            // Write to file (Save file)
            fs.writeFile(this.file_path, file_content, function (err) {
                if (err) {
                    console.log(err)
                    return
                }

                console.log("File saved!")
            })
                
            document.getElementById("file_path").innerHTML = this.file_path

        }).catch(err => {
            console.log(err)
        })
    }

    open_file() {
        /* Open the text file */
        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(result => {
            //let file_path = result.filePaths[0];
            this.file_path = result.filePaths[0];

            fs.readFile(this.file_path, 'utf8', function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }

                console.log("File opened")
                console.log(data)

                // Show the content on the text box
                document.getElementById("text_box").value = data
            })
            
            document.getElementById("file_path").innerHTML = this.file_path
        
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
