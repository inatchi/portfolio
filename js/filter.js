const filterBox = document.querySelectorAll('.content__grid-item');

document.querySelector('ul').addEventListener('click', (event) => {

    if (event.target.tagName !== 'LI') return false;
    let filterClass = event.target.dataset['f'];

    filterBox.forEach(elem => {
        elem.classList.remove('hide');
        elem.classList.add('gridelement');
        if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
            elem.classList.add('hide');
            
        } else {
            elem.classList.remove('gridelement');
        }
    });

});