const filterBox = document.querySelectorAll('.content__grid-item');
const gridBox = document.querySelector('.content__grid');

document.querySelector('nav').addEventListener('click', (event) => {

    if (event.target.tagName !== 'LI') return false;
    let filterClass = event.target.dataset['f'];

    filterBox.forEach(elem => {
        elem.classList.remove('hide');
        gridBox.classList.remove('gridelement');
        if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
            elem.classList.add('hide');
            gridBox.classList.add('gridelement');
        }
    });

});