document.querySelector('ul').addEventListener('click',async function (event) {
    let selected;

    if (event.target.tagName === 'LI') {
        selected = document.querySelector('li.selected')
        if (selected) {
            selected.className = ''
        }
        event.target.className = 'selected'
    }
    console.log(selected.textContent);
})

 async function test() {
    selectBruger = document.querySelector('li.selected').textContent
    console.log(selectBruger);
    const deleteuser = await fetch('Admin/slet/'+selectBruger, {
        method: 'POST'
    })
    location.reload()
 }
