/** Documentation written by John Høeg. */
/** Eventlistener that starts a function when you click on a user in a list. */
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
/** A function that runs when you press a button with a 
 * selected user and deletes them. 
 */
async function deleteUser() {
    selectBruger = document.querySelector('li.selected').textContent
    await fetch('Admin/slet/' + selectBruger, {
        method: 'POST'
    })
    location.reload()
}
/** A function that runs when you press a button with a 
 * selected user and opens a page to edit them.
 */
async function editUser() {
    selectBruger = document.querySelector('li.selected').textContent
    location.href = '/Admin/redigerbruger/' + selectBruger
}