function generateGrid(size) {
    const container = document.querySelector('.gridContainer');
    for (let counter = 0; counter < size; counter++) {
        const row = document.createElement('div');
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.draggable = false;
            cell.addEventListener('mouseover', (e) => {
                if (options.rainbowMode) {
                    colorCellRandomly(e.target);
                } else if (options.eraserMode) {
                    colorCell(e.target, 'white');
                } else {
                    console.log(options.color);
                    colorCell(e.target, options.color);
                }
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

function colorCellRandomly(cell) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    cell.style.backgroundColor = randomColor;
}

function colorCell(cell, color) {
    cell.style.backgroundColor = color;
}

function getColorSelectorValue() {
    const colorSelector = document.getElementById('colorPicker');
    options.color = colorSelector.value;
}


function initialize() {
    //Default options
    options = {
        color: 'black',
        rainbowMode: false,
        eraserMode: false
    };

    const colorSelector = document.getElementById('colorPicker');
    colorSelector.addEventListener('input', getColorSelectorValue);

    const rainbowButton = document.getElementById('rainbowMode');
    rainbowButton.addEventListener('click', () => {
        options.rainbowMode = !options.rainbowMode;
    });


    const slider = document.getElementById('gridSize');
    generateGrid(slider.value);
}

initialize();