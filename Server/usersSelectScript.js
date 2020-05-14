document.querySelector('ul').addEventListener('click', async function (event) {
    let selected;
    if (event.target.tagName === 'LI') {
        selected = document.querySelector('li.selected')
        if (selected) {
            selected.className = ''
        }
        event.target.className = 'selected'
    }
})

async function deleteUser() {
    selectBruger = document.querySelector('li.selected').textContent
    await fetch('Admin/slet/' + selectBruger, {
        method: 'POST'
    })
    location.reload()
}
async function editUser() {
    selectBruger = document.querySelector('li.selected').textContent
    location.href = '/Admin/redigerbruger/' + selectBruger
}