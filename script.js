function generateGrid(size) {
    const container = document.querySelector('.gridContainer');
    for (let counter = 0; counter < size; counter++) {
        const row = document.createElement('div');
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.draggable = false;
            cell.style.background
            cell.addEventListener('mousedown', (e) => {
                isDrawing = true;
                draw(e);
            });
            cell.addEventListener('mousemove', (e) => {
                if (isDrawing) {
                    draw(e);
                }
            });
            cell.addEventListener('mouseup', () => {
                isDrawing = false;
                wasDrawn = null;
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
    options.size = newSize;
    clearGrid();
    generateGrid(newSize);
}

function colorCellRandomly(cell) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    cell.style.backgroundColor = randomColor;
    console.log(cell.style.backgroundColor);
    cell.style.opacity = 1;
}

function colorCell(cell, color) {
    cell.style.backgroundColor = color;
    cell.style.opacity = 1;
}

function fadeCell(cell) {
    let computedStyle = window.getComputedStyle(cell);
    let currentColor = computedStyle.backgroundColor;
    cell.style.backgroundColor = `rgba(from ${currentColor} r g b / clamp(0, calc(alpha - 0.1), 1))`; 
    console.log(cell.style.backgroundColor);
}

function darkenCell(cell) {
    let computedStyle = window.getComputedStyle(cell);
    let currentColor = computedStyle.backgroundColor;
    cell.style.backgroundColor = `hsl(from ${currentColor} h s clamp(0, calc(l - 5), 100) / alpha)`; 
    console.log(cell.style.backgroundColor);
}

function getColorSelectorValue(e) {
    options.color = e.target.value;
}

function getCanvasColorSelectorValue(e) {
    const container = document.querySelector('.gridContainer');
    container.style.backgroundColor = e.target.value;
}

function draw(e) {
    if (wasDrawn === e.target) return;
    wasDrawn = e.target;
    if (e.buttons !== 1) return;
        if (options.rainbowMode) {
            colorCellRandomly(e.target);
        } 
        
        else if (options.eraserMode) {
            colorCell(e.target, 'rgba(255, 255, 255, 0)');
        }
        
        else if (options.darkenMode) {
            darkenCell(e.target);
        }

        else if (options.fadeMode) {
            fadeCell(e.target);
        }
        
        else {
            console.log(options.color);
            colorCell(e.target, options.color);
        }
}


function initialize() {
    //Default options
    options = {
        size: 16,
        color: 'black',
        rainbowMode: false,
        eraserMode: false,
        darkenMode: false,
        canvasColor: 'grey'
    };

    isDrawing = false;
    wasDrawn = null;

    const colorSelector = document.getElementById('colorPicker');
    colorSelector.addEventListener('input', getColorSelectorValue);

    const canvasColorSelector = document.getElementById('canvasColor');
    canvasColorSelector.addEventListener('input', getCanvasColorSelectorValue);

    const rainbowButton = document.getElementById('rainbowMode');
    rainbowButton.addEventListener('click', () => {
        options.rainbowMode = !options.rainbowMode;
        if (options.rainbowMode) {
            eraserButton.checked = false;
            options.eraserMode = false;

            darkenModeButton.checked = false;
            options.darkenMode = false;

            fadeButton.checked = false;
            options.fadeMode = false;
        }
    });

    const eraserButton = document.getElementById('eraserMode');
    eraserButton.addEventListener('click', () => {
        options.eraserMode = !options.eraserMode;
        if (options.eraserMode) {
            rainbowButton.checked = false;
            options.rainbowMode = false;

            darkenModeButton.checked = false;
            options.darkenMode = false;

            fadeButton.checked = false;
            options.fadeMode = false;
        }
    });

    const darkenModeButton = document.getElementById('darkenMode');
    darkenModeButton.addEventListener('click', () => {
        options.darkenMode = !options.darkenMode;

        if (options.darkenMode) {
            rainbowButton.checked = false;
            options.rainbowMode = false;

            eraserButton.checked = false;
            options.eraserMode = false;

            fadeButton.checked = false;
            options.fadeMode = false;
        }
    });

    const fadeButton = document.getElementById('fadeMode');
    fadeButton.addEventListener('click', () => {
        options.fadeMode = !options.fadeMode;

        if (options.fadeMode) {
            rainbowButton.checked = false;
            options.rainbowMode = false;

            eraserButton.checked = false;
            options.eraserMode = false;

            darkenModeButton.checked = false;
            options.darkenMode = false;
        }
    });

    const hideGridlinesButton = document.getElementById('hideGrid');
    hideGridlinesButton.addEventListener('click', () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.classList.toggle('noBorder');
        });
    });

    const clearButton = document.getElementById('clearGrid');
    clearButton.addEventListener('click', () => {
        clearGrid();
        generateGrid(options.size);
    });


    generateGrid(options.size);
}

initialize();