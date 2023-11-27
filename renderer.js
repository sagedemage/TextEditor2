/* Renderer */

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
})

const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
    event.sender.send('counter-value', newValue)
})

window.electronAPI.handleSetContent((event, value) => {
    /* Set text area content */
    document.getElementById('text_box').value = `${value}`
})

window.electronAPI.handleGetContent((event) => {
    const file_content = document.getElementById('text_box').value
    event.sender.send('write-content', file_content)
})
