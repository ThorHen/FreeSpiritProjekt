document.querySelector('ul').addEventListener('click', function (event) {
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

// document.getElementById('Slet').addEventListener('click', async function () {
//     let selected = document.querySelector('li.selected')
//     console.log(selected);
//     await adminController.deleteUser(selected)
// })