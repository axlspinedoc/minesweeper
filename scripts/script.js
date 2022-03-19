// Adding listeners
const start = document.getElementById("start");
const canvas = document.getElementById("canvas");

start.addEventListener('click', handleStart);

/** To Do's 
 * - Recursively open up empty cells until a bomb is adjacent 
 * - Add function to show all bombs when losing
 * - Optimize 
 */


//------------------------------FUNCTIONS---------------------------------------

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
            _grid[bombRow][bombCol] = -1;
        }        
    }    
    return _grid;
}

const countBombs = function(table, x, y){    
    // Make a copy of inbound table to make it iterable
    const _rows = table.length;
    const _columns = table[0].length;
    let _grid = Array(_rows).fill().map(()=>Array(_columns).fill(0));
    _grid = table;
    
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

const checkWin = function (table, bombs){    
    const _rows = table.length;
    const _columns = table[0].length;
    let _grid = Array(_rows).fill().map(()=>Array(_columns).fill(0));
    _grid = table;
    // const sum = _grid.reduce((partialSum, a) => partialSum + a, 0);
    let sum = 0;
    for (let _i = 0; _i<_rows; _i++){
        sum += _grid[_i].reduce((a, b)=> a+b);        
    }        
    console.log(sum);
    if(sum == (_rows*_columns)-bombs*2){
        alert("you win!");
    }
}

const checkCell = function (table, x, y){    
    try{
        const cell = document.getElementById(`R${x}C${y}`);    
        cell.className = 'columnVisited'        
        
        const _rows = table.length;
        const _columns = table[0].length;
        let _grid = Array(_rows).fill().map(()=>Array(_columns).fill(0));    
        _grid = table;

        let _bombs = countBombs(table, x, y);
        cell.innerText = _bombs;
        _grid[x][y] = 1;
    }catch(error){
        // The cell doesn't exist    
    }
    
    
    // if(_bombs != 0){
    //     cell.innerText = _bombs;
    //     _grid[x][y] = 1;    
    // } else {

    // }

    
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
    let grid = Array(rows).fill().map(()=>Array(columns).fill(0));        
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
                let r = parseInt(divC.id.substring(1));
                let c = parseInt(divC.id.substring(3));                
                let cellValue = grid[r][c];
                if(cellValue == -1) {
                    divC.className = 'bomb';
                    alert("You lose");
                    // showBombs();
                } else if(cellValue == 0){                                        
                    grid = checkCell(grid, r, c);
                    console.table(grid);
                    checkWin(grid, bombs);                   
                }                
            }
        }                
    }
    alert("Good luck!");    
}


