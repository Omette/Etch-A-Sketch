function generateGrid(size) {
    const container = document.querySelector('.gridContainer');
    for (let counter = 0; counter < size; counter++) {
        const row = document.createElement('div');
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        row.classList.add('row');
        container.appendChild(row);
    }
    
}


generateGrid(16);