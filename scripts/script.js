// Adding listeners
const start = document.getElementById("start");
const canvas = document.getElementById("canvas");

start.addEventListener('click', handleStart);

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
    
    function addBombs (table, qty){
        let remaining = qty;        
            const bombRow = parseInt(Math.random() * rows);
            const bombCol = parseInt(Math.random() * columns);            
            if(table[bombRow][bombCol] == 0){
                remaining--;
                table[bombRow][bombCol] = 1;
            }        
        if(remaining > 0) addBombs(table, remaining);        
        return table;
    }        
    
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
    console.assert(typeof grid[10][10] !== 'undefined', "hello");
    
}
