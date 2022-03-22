// Adding listeners
const start = document.getElementById("start");
const canvas = document.getElementById("canvas");

start.addEventListener('click', handleStart);
let enableGame = true;

//------------------------------FUNCTIONS---------------------------------------

const addBombs = function(table, qty){
    let remaining = qty;    
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
    let _grid = table;
    let sum = 0;
    for(let r = x-1; r <= x+1; r++){
        for(let c = y-1; c <= y+1; c++){
            try {
                if(_grid[r][c]==-1){
                    sum++
                }
            } catch (error) {}
        }
    }
    return sum;
}

const checkWin = function (table){
    let win = false;
    const _rows = table.length;
    let _grid = table;
    let unopened = 0;
    for (let _i = 0; _i<_rows; _i++){
        unopened += _grid[_i].filter((a)=> a==='u').length;
    }
    if(unopened===0){
        win = true;
        alert("you win!");
    }
    return win;
}

const checkCell = function (table, x, y){

    _grid = table;
    if(_grid[x][y]==='u'){          // Only if cell hasn't been opened

        const cell = document.getElementById(`R${x}C${y}`);
        cell.className = 'columnVisited';
        let _bombs = countBombs(table, x, y);

        if(_bombs !== 0){           // Only if there are bombs near
            _grid[x][y] = _bombs;
            cell.innerText = _bombs;
            cell.className = 'columnAdjacentBomb';

        }else{                      // Propagate only if there are no bombs
            _grid[x][y] = 0;
            for(let r = x-1; r <= x+1; r++){
                for(let c = y-1; c <= y+1; c++){
                    try{
                        _grid = checkCell(_grid, r, c);
                    }catch(error){}
                }
            }
        }
    }
    return _grid;
}

const showBombs = function(table) {
    _grid = table;
    const _rows = table.length;
    const _columns = table[0].length;
    for (let r = 0; r < _rows; r++){
        for (let c = 0; c < _columns; c++){
            if(_grid[r][c]=== -1){
                const cell = document.getElementById(`R${r}C${c}`);
                cell.className='bomb';
            }
        }
    }    
}

//-----------------------END OF FUNCTIONS---------------------------------------

// Creates game grid and adds event listeners to each cell
function handleStart() {
    enableGame = true;
    const rows = +document.getElementById("rows").value;
    const columns = +document.getElementById("columns").value;
    const bombs = +document.getElementById("bombs").value;    
    if(bombs>columns*rows) {//<-------------------- Handle valid number of bombs
        alert("number of bombs cannot exceed " + (rows*columns));
        return;
    }
    canvas.innerHTML="";
    let grid = Array(rows).fill().map(()=>Array(columns).fill('u'));
    grid = addBombs(grid, bombs);    
    console.table(grid);//<------------------------------------------- Debugging    
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
            divC.addEventListener('contextmenu', handleRightClick);
            
            function handleCellClick() {
                if(enableGame === true){
                    let r = parseInt(divC.id.substring(1));
                    let c = parseInt(divC.id.substring(3));
                    let cellValue = grid[r][c];
                    if(cellValue == -1) {
                        divC.className = 'bomb';
                        alert("You lose");
                        enableGame = false;
                        showBombs(grid);
                    } else if(cellValue == 'u'){
                        grid = checkCell(grid, r, c);                                                
                        console.table(grid);//<----------------------- Debugging                        
                        if(true === checkWin(grid)){
                            enableGame = false;
                            showBombs(grid);
                        }                         
                    }
                }
            }
            function handleRightClick(){                
                if(true === enableGame){
                    let r = parseInt(divC.id.substring(1));
                    let c = parseInt(divC.id.substring(3));
                    let cellValue = grid[r][c];
                    if(cellValue === 'u' || cellValue === -1){
                        divC.className = 'flag';
                    }
                }
            }
        }
    }
    alert("Good luck!");
}


