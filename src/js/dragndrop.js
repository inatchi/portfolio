const dragItem = document.querySelectorAll('.dragItem');
const dropZone = document.querySelectorAll('.dropZone');

dragItem.forEach(dragItem => {
    dragItem.addEventListener('dragstart', handlerDragStart);
    dragItem.addEventListener('dragend', handlerDragEnd);
    dragItem.addEventListener('drag', handlerDrag);

    dragItem.addEventListener('dragenter', () => {
        if (draggedItem !== droppedItem) {
            droppedItem = dragItem;
        }
    });

    dragItem.addEventListener('dragleave', () => {
        droppedItem = null;
    })
});

dropZone.forEach(dropZone => {
    dropZone.addEventListener('dragenter', handlerDragenter);
    dropZone.addEventListener('dragleave', handlerDragleave);
    dropZone.addEventListener('dragover', handlerDragover);
    dropZone.addEventListener('drop', handlerDrop);
});

let draggedItem = null;
let droppedItem = null; 

function handlerDragStart(event) {
    this.classList.add('dragItem-active');
    draggedItem = this;
}
function handlerDragEnd(event) {
    this.classList.remove('dragItem-active');
    draggedItem = null;
}

function handlerDrag(event) {
    //console.log('drag');
}

function handlerDragenter(event) {
    event.preventDefault();
    this.classList.add('dropZone-active');
}
function handlerDragleave(event) {
    this.classList.remove('dropZone-active');
}

function handlerDragover(event) {
    event.preventDefault();
}

function handlerDrop(event) {
    if (droppedItem) {
        if (droppedItem.parentElement === draggedItem.parentElement) {
            const children = Array.from(droppedItem.parentElement.children);
            const draggedIndex = children.indexOf(draggedItem);
            const droppedIndex = children.indexOf(droppedItem);

            if (draggedIndex > droppedIndex) {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem);
            } else {
                draggedItem.parentElement.insertBefore(
                    draggedItem, 
                    droppedItem.nextElementSibling
                    );
            }
        }
    } else {
        this.append(draggedItem);
    }
    
}