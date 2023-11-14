/* File actions */

const fs = require('fs');

const { dialog } = require('@electron/remote')

function save_file() {
    let file_name = "file.txt"

    // text_box content
    let file_content = document.getElementById("text_box").value
    console.log(file_content)

    fs.writeFile("/home/salmaan/Downloads/" + file_name, file_content, function(err) {
        if (err) {
            console.log(err)
            return
        }
        console.log("File saved!")
    })
}

function open_file() {
    let file_path = ""

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
