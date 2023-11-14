/* File actions */

const fs = require('fs');

const { dialog } = require('@electron/remote')

function save_file() {
    /* Save the text file */
    dialog.showSaveDialog({
        title: "Choose the file path to save to",
        properties: []
    }).then(result => {
        let file_path = result.filePath;

        // text_box content
        let file_content = document.getElementById("text_box").value

        // Write to file (Save file)
        fs.writeFile(file_path, file_content, function (err) {
            if (err) {
                console.log(err)
                return
            }

            document.getElementById("file_path").innerHTML = file_path

            console.log("File saved!")
        })

    }).catch(err => {
        console.log(err)
    })
}

function open_file() {
    /* Open the text file */
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(result => {
        let file_path = result.filePaths[0];

        fs.readFile(file_path, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
                return
            }

            document.getElementById("file_path").innerHTML = file_path

            console.log("File opened")
            console.log(data)

            // Show the content on the text box
            document.getElementById("text_box").value = data
        })
    }).catch(err => {
        console.log(err)
    })
}

document.getElementById('save_file').addEventListener('click', () => {
    save_file()
})

document.getElementById('open_file').addEventListener('click', () => {
    open_file()
})
