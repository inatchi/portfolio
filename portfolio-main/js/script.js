function app() {
    const list = document.querySelectorAll('.header__menu-item');

    const gridItem = document.querySelectorAll('.content__grid-item')

    function filter (category, items) {
        items.forEach((item) => {
            const isItemFiltered = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'
            if (isItemFiltered && !isShowAll) {
                item.classList.add('animation')
            } else {
                item.classList.remove('hide')
                item.classList.remove('animation')
            }
        })
    }

    list.forEach((li) => {
        li.addEventListener('click', () => {
            const currentCategory = li.dataset.filter
            filter(currentCategory, gridItem)
        })
    })

    gridItem.forEach((gridItem) => {
        gridItem.ontransitionend = function () {
            if (gridItem.classList.contains('animation')) {
                gridItem.classList.add('hide', 'grid-body')
            }
        }
    })
};

app()

