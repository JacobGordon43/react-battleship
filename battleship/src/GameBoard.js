import React, { useState } from "react";
import Cell from "./Cell";
const GameBoard = (props) => {
    //An empty array which will be used to store coordinates in
    const [board, setBoard] = useState({cells:[]});
    // const [secondaryBoard, setSecondaryBoard] = useState({cells:[]});

        //Used to initialize the board with
        if(board.cells.length !== props.length*props.length){
            for(let row = 0; row < props.length; row++){
                // console.log(board);
                // console.log("Row" + row)
                for(let col = 0; col < props.length; col++){
                    // console.log(row + "," + col);
                    //On the first column, it stores an array with a column value to initialize the column of coordinates
                    
                    //Each column afterwards gets both points stored in the coresponding spot within the board
                    if(board.cells.length < props.length*props.length){
                    board.cells.push({coordinates: [{row: row, col: col}], valid: undefined, occupied: false, shipId: undefined});
                    }else if (board.cells.length == props.length*props.length){
                        console.log("Board successfully made")
                    }
                }
            }
        }
        // board.cells[3].occupied = true;
        console.log(board.cells)

        //Determines how the game board will be handled if it is the primary vs secondary game board
        if(props.primary == true){
            const updateBoard = (row, col, length, validity, effectedCells, clicked, shipIndex) => {
                let tempCells = [];
                let cont = false;
                let index = 0;
                let boardIndex = 0;
                
                for(let x = 0; x < props.length; x++){
                    console.log("Hovered row: " + row)
    
                    //Recreates the array but implements the validity argument to create an updated state for the board
                    for(let y = 0; y < props.length; y++){
                        console.log(board.cells[boardIndex])
                        let rowConditional = x == effectedCells[index] && col == y;
                        let colConditional = x == row && y == effectedCells[index];
                        if(x == row && y == col){
                            if(board.cells[boardIndex].occupied){
                                validity = false;
                                return
                            }
                        }
                        if(tempCells.length < props.length*props.length){
                            //Checks if the current cell in the loop is the cell that is hovered and gives it the validity of valid or invalid
                            if((props.direction == "row" ? rowConditional : colConditional)){
                                if(props.direction == "row"){
                                    if(clicked){
                                        tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: true, shipId: board.cells[boardIndex].shipId});
                                    }else{
                                        if(board.cells[boardIndex].occupied){
                                            tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: "invalid", occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                                        }else{
                                            tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: shipIndex});
                                        }
                                    }
                                }else{
                                    if(clicked){
                                        tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity, occupied: true});
                                    }else{
                                        tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity, occupied: board.cells[boardIndex].occupied});
                                    }
                                }
                                
                                //Allows for the proceeding cells to display as green or red
                                if(index < length){
                                cont=true;
                                // contWasTrue = true;
                                index++;
                                }

                            }else{
                                tempCells.push({coordinates: [{row: x, col: y}], valid: undefined, occupied:board.cells[boardIndex].occupied});
                            }
                        }
                        boardIndex++;
                    }
                    if(clicked){
                        console.log(tempCells)
                    }
                }
                //Sets the state of the board for the cell array to the new array, with the updated validity for the current selected ship
                setBoard({...board, cells: tempCells});        
            }
            
            const placeShip = (e, row, col, clicked) => {
                console.log(e)
                console.log("The row is " + row);
                console.log(props.selectedShip)
                if(props.selectedShip.size > 1){
                    let effectedCells = props.direction == "row" ? [row] : [col];
                    // let effectedCols = [col];
                    let currentRow = row;
                    let currentCol = col;
                    let index = 0;
                    let calculation = props.direction == "row" ? row + props.selectedShip.size : col + props.selectedShip.size;
                    while(index < props.selectedShip.size - 1){
                        if(props.direction == "row"){
                            currentRow++;
                            effectedCells.push(currentRow)
                            index++;
                        }else{
                            currentCol++;
                            
                            effectedCells.push(currentCol);
                            console.log(effectedCells);
                            console.log("Coordinates: " + row + ", " + col)
                            index++;
                        }
                    }
                        //Places all the row values that will be validated in the updated board

                        //Calculates the amount of space left when adding the current row placement and the size of the ship
                        //A argument of valid or invalid will be passed into the updateBoard method based on if the calculation surpasses the length of the board
                        if(calculation > props.length){      
                            console.log(effectedCells);
                            updateBoard(row, col, props.selectedShip.size, "invalid", effectedCells, clicked, props.selectedShip.id);
                        }else{
                            console.log(effectedCells);
                            updateBoard(row, col, props.selectedShip.size, "valid", effectedCells, clicked, props.selectedShip.id);
                        }                    
                   
                    props.onClick(props.selectedShip.id);
                }
            }
    
            const handleOnClick = () => {
                props.handleOnClick(props.ship)
            }
            //Returns the game board, consisting of the title of the game, the board, and the cells. 
            //https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react was used to help get this correct, as there was significant 
            //struggle getting it to work properly
            
            return (
                <div class="board">
                {
        
                    board.cells.map((cell) => {
                        return(

                            cell.coordinates.map((coord)=>{
                                return(
                                <Cell row={coord.row} col={coord.col} valid={cell.valid} occupied={cell.occupied} shipId={cell.shipId} primaryBoard={true} onClick={placeShip} onMouseOver={placeShip}/>
                                );
                            }
                            )
                        )
                    })
                }
                
                </div>
            )
        }else{
            return (
                    <div class="board secondary-board">
                    {

                        board.cells.map((cell) => {
                            return(
                                    
                                cell.coordinates.map((coord)=>{
                                    return(
                                    <Cell row={coord.row} col={coord.col} primaryBoard={false}/>
                                    );
                                }
                                )
                                
                            )
                        })
                    }
                
                    </div>
            )
        }
}

export default GameBoard;