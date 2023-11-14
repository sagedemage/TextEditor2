const File = require("./file")

let file = new File()

document.getElementById('save_file').addEventListener('click', () => {
    file.save_file()
})

document.getElementById('open_file').addEventListener('click', () => {
    file.open_file()
})