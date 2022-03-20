// Adding listeners
const start = document.getElementById("start");
const canvas = document.getElementById("canvas");

start.addEventListener('click', handleStart);

/** To Do's 
 * - Recursively open up empty cells until a bomb is adjacent
 * - Notes: Follow this pattern to check if  
 *          1 | 2 | 3
 *          4 | x | 5
 *          6 | 7 | 8 
 * - Add function to show all bombs when losing
 * - Optimize 
 */


//------------------------------FUNCTIONS---------------------------------------

const addBombs = function(table, qty){    
    let remaining = qty;
    // Make a copy of inbound table to make it iterable
    const _rows = table.length;
    const _columns = table[0].length;
    
    let _grid = table;
    while(remaining>0){
        const bombRow = parseInt(Math.random() * _rows);
        const bombCol = parseInt(Math.random() * _columns);            
        if(_grid[bombRow][bombCol] != -1){
            remaining--;
            _grid[bombRow][bombCol] = -1;
        }        
    }    
    return _grid;
}

const countBombs = function(table, x, y){    
    // Make a copy of inbound table to make it iterable
    const _rows = table.length;
    const _columns = table[0].length;
    
    let _grid = table;
    
    let sum = 0;
    for(let r = x-1; r <= x+1; r++){
        for(let c = y-1; c <= y+1; c++){            
            try {
                if(_grid[r][c]==-1){
                    sum++
                    console.log('bomb at ' + r + '|' + c);
                }    
            } catch (error) {}            
        }
    }        
    return sum;
}

const checkWin = function (table){    
    const _rows = table.length;
    const _columns = table[0].length;    
    let _grid = table;    
    let unopened = 0;
    for (let _i = 0; _i<_rows; _i++){
        unopened += _grid[_i].filter((a)=> a==='u').length;
    }        
    console.log(unopened);
    if(unopened===0){
        alert("you win!");
    }
}

const checkCell = function (table, x, y){    
    try{
    }catch(error){
        // The cell doesn't exist    
    }
    const cell = document.getElementById(`R${x}C${y}`);    
    cell.className = 'columnVisited'        
                    
    _grid = table;
    let _bombs = countBombs(table, x, y);
    cell.innerText = _bombs;
    _grid[x][y] = _bombs;
    
    // Propagate
    for(let r = x-1; r < x+1; r++){
        for(let c = y-1; c < y+1; c++){
            
            // if(_grid[r][c]==='u'){

            // }
        }
    }    
    return _grid;
}

//-----------------------END OF FUNCTIONS---------------------------------------

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
    canvas.innerHTML="";    
    let grid = Array(rows).fill().map(()=>Array(columns).fill('u'));            
    grid = addBombs(grid, bombs);        
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
                let r = parseInt(divC.id.substring(1));
                let c = parseInt(divC.id.substring(3));                
                let cellValue = grid[r][c];
                if(cellValue == -1) {
                    divC.className = 'bomb';
                    alert("You lose");
                    // showBombs();
                } else if(cellValue == 'u'){                                        
                    grid = checkCell(grid, r, c);
                    console.table(grid);
                    checkWin(grid);                   
                }                
            }
        }                
    }
    alert("Good luck!");    
}


