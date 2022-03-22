//1 - crear un boton y agregarle un listener
const start = document.getElementById('start');
const canvas = document.getElementById('canvas');
let win = 0;

start.addEventListener('click', function (e) {
    //limpear el canvas
    canvas.innerHTML = '';
    //2 - crear 3 inputs y optener sus datos
    const rows = document.getElementById('rows').value ? parseInt(document.getElementById('rows').value) : 0;
    const columns = document.getElementById('columns').value ? parseInt(document.getElementById('columns').value) : 0;
    let bombs = document.getElementById('bombs').value ? parseInt(document.getElementById('bombs').value) : 0;
    //3 crear una matris de llena de 0s
    const grid = Array(rows).fill().map(() => Array(columns).fill(0));
    //verificar que las bombas sean menores que la cantidad de celdas
    if (bombs <= rows * columns) {
        //4 - por cada bomba añadir un 1
        for (let i = 0; i < bombs; i++) {
            addBomb(grid, rows, columns);
        }
    } else {
        alert("The bombs don't fit on the grid")
    }
    //create grid
    for (let X = 0; X < rows; X++) {
        const div = document.createElement('div');
        div.className = 'row';
        canvas.appendChild(div);
        for (let Y = 0; Y < columns; Y++) {
            const divR = document.createElement('div');
            divR.id = 'R' + X + 'C' + Y;
            divR.className = 'column';
            divR.innerText = grid[X][Y] ? 'B' : '';
            divR.addEventListener('click', function (e) {
                if (grid[X][Y] > 0) {
                    alert('Game Over!');
                }
                else {
                    checkNumber(grid, X, Y);
                }
            });
            div.appendChild(divR);
        }
    }
});

function addBomb(grid, rows, columns) {
    //toma un numero random de cordenadas x,y si ya es 1 llama de nuevo la funcion hasta encontrar uno que sea 0 
    const X = parseInt(Math.random() * rows);
    const Y = parseInt(Math.random() * columns);
    !grid[X][Y] ? grid[X][Y] = 1 : addBomb(grid, rows, columns);
}

function checkNumber(grid, X, Y) {
    const cell = document.getElementById(`R${X}C${Y}`);

    let suma = 0;
    for (let indexY = Y - 1; indexY <= Y + 1; indexY++) {
        for (let indexX = X - 1; indexX <= X + 1; indexX++) {
            if (grid && grid[indexX] && grid[indexX][indexY] && !isNaN(grid && grid[indexX] && grid[indexX][indexY])) {
                suma = suma + grid[indexX][indexY];
            }
        }
    }
    if (suma > 0) {
        cell.innerText = suma;
        win = win + 1;
    } else if (suma === 0) {

        grid[X][Y] = 'X';
        cell.innerText = 0;
        // win = win + 1;

        for (let indexY = Y - 1; indexY <= Y + 1; indexY++) {
            for (let indexX = X - 1; indexX <= X + 1; indexX++) {
                if (!isNaN(grid && grid[indexX] && grid[indexX][indexY])) {
                    checkNumber(grid, indexX, indexY);
                }
            }
        }
    }
    console.log(win)        
}