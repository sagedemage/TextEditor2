/* Renderer */

window.electronAPI.handleSetContent((event, value) => {
    /* Set text area content */
    document.getElementById('text_box').value = `${value}`
})

window.electronAPI.handleGetContent((event) => {
    const file_content = document.getElementById('text_box').value
    event.sender.send('write-content', file_content)
})
