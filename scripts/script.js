// Adding listeners
const start = document.getElementById("start");
const canvas = document.getElementById("canvas");

start.addEventListener('click', handleStart);

// function expressions
const addBombs = function(table, qty){
    
    let remaining = qty;
    // Make a copy of inbound table to make it iterable
    const _rows = table.length;
    const _columns = table[0].length;
    const _grid = Array(_rows).fill().map(()=>Array(_columns).fill(0));
    while(remaining>0){
        const bombRow = parseInt(Math.random() * _rows);
        const bombCol = parseInt(Math.random() * _columns);            
        if(_grid[bombRow][bombCol] == 0){
            remaining--;
            _grid[bombRow][bombCol] = 1;
        }        
    }    
    return _grid;
}

const countBombs = function(table, x, y){
    let remaining = qty;
    // Make a copy of inbound table to make it iterable
    const _rows = table.length;
    const _columns = table[0].length;
    const _grid = Array(_rows).fill().map(()=>Array(_columns).fill(0));
    //let sum = 0;
    // Try copying a portion of the original table and adding the contents
    const subArray = [1, 2, 3];
    const sum = subArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum); // 6
}

// Creates game grid and adds event listeners to each cell
function handleStart() {    
    
    const rows = +document.getElementById("rows").value;
    const columns = +document.getElementById("columns").value;            
    const bombs = +document.getElementById("bombs").value;
    
    // Handle valid number of bombs
    if(bombs>columns*rows) {
        alert("number of bombs cannot exceed " + (rows*columns))
        return
    }
        
    // clear Canvas
    canvas.innerHTML="";
    // create logic array
    let grid = Array(rows).fill().map(()=>Array(columns).fill(0));
    // add bombs
    
    grid = addBombs(grid, bombs);    
    
    console.table(grid);

    // draw board
    for (let r = 0; r < rows; r++){
        let div = document.createElement('div');
        div.className = 'row';
        canvas.appendChild(div);
        for (let c = 0; c < columns; c++){
            let divC = document.createElement('div');
            divC.className = 'column';
            divC.id = 'R' + r + 'C' + c;
            div.appendChild(divC);
            divC.addEventListener('click', handleCellClick);
            
            // function definition
            function handleCellClick() {                                                
                
                let cellValue = grid[parseInt(divC.id.substring(1))][divC.id.substring(3)];
                if(cellValue == 1) {
                    divC.className = 'bomb'
                    alert("You lose")
                } else if(cellValue == 0){
                    checkCell(r,c,grid);
                }                
            }
        }                
    }
    alert("Good luck!");    
}

function checkCell (x, y, grid){
    const cell = document.getElementById(`R${x}C${y}`);    
    cell.className = 'columnVisited'
    // console.assert(typeof grid[10][10] !== 'undefined', "hello");
    
}
