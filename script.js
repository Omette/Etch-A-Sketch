function generateGrid(size) {
    const container = document.querySelector('.gridContainer');
    for (let counter = 0; counter < size; counter++) {
        const row = document.createElement('div');
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.draggable = false;
            cell.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = 'black';
            });
            row.draggable = false;
            row.appendChild(cell);
        }
        row.classList.add('row');
        container.appendChild(row);
    }
}

function clearGrid() {
    const container = document.querySelector('.gridContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function updateGrid(slider, newSize) {
    slider.nextElementSibling.value = newSize;
    clearGrid();
    generateGrid(newSize);
}



//const size = getSizeInput();
generateGrid(20);

