document.querySelector('ul').addEventListener('click', function (event) {
    let selected;

    if (event.target.tagName === 'LI') {
        selected = document.querySelector('li.selected')
        select = document.querySelector('li.selected')
        if (selected) {
            selected.className = ''
        }
        event.target.className = 'selected'
    }
    console.log(selected.textContent);

})