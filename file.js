/* File actions */

const fs = require('fs');

function save_file() {
    let file_name = "file.txt"
    //let file_content = "Hey, there!"

    // text_box
    let file_content = document.getElementById("text_box").value
    console.log(file_content)

    // /home/salmaan/Downloads

    fs.writeFile("/home/salmaan/Downloads/" + file_name, file_content, function(err) {
        if (err) {
            return console.log(err)
        }
        console.log("File saved!")
    })
}

document.getElementById('save_file').addEventListener('click', () => {
    save_file()
})
