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
                    board.cells.push({coordinates: [{row: row, col: col}], valid: undefined});
                    }else if (board.cells.length == props.length*props.length){
                        console.log("Board successfully made")
                    }
                }
            }
        }

        // console.log(board.cells)rr


        if(props.primary == true){
            const updateBoard = (row, col, length, validity, effectedCells) => {
                let tempCells = [];
                let cont = false;
                let index = 0;
                
                for(let x = 0; x < props.length; x++){
                    console.log("Hovered row: " + row)
    
                    //Recreates the array but implements the validity argument to create an updated state for the board
                    for(let y = 0; y < props.length; y++){
                        let rowConditional = x == effectedCells[index] && col == y;
                        let colConditional = x == row && y == effectedCells[index];
                        if(tempCells.length < props.length*props.length){
                            //Checks if the current cell in the loop is the cell that is hovered and gives it the validity of valid or invalid
                            if((props.direction == "row" ? rowConditional : colConditional)){
                                console.log(effectedCells[index + 1]);
                                if(props.direction == "row"){
                                    tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity});
                                }else{
                                    tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity});
                                }
                                
                                //Allows for the proceeding cells to display as green or red
                                if(index < length){
                                cont=true;
                                // contWasTrue = true;
                                index++;
                                }
                                //Prevents the parent if statement from running again
                                if(index == length){
                                    cont = false;
                                }
                            }else{
                                // if(x==nextRow && col == y){
                                //     console.log("Next Row is " + nextRow)
                                //     console.log(contWasTrue);
                                //     tempCells.push({coordinates: [{row: x, col: nextRow}], valid: validity});
                                // }
                        tempCells.push({coordinates: [{row: x, col: y}], valid: undefined});
                            }
                        }
                    }
                }
                //Sets the state of the board for the cell array to the new array, with the updated validity for the current selected ship
                setBoard({...board, cells: tempCells});        
            }
            
            const placeShip = (e) => {
                if(props.selectedShip !== undefined){
                    let cell = e.target;
                    //Gets the coordinates and splits it between the row and col, which are available through the text of the buttons.
                    let coordinates = cell.innerHTML;
                    let row = parseInt(coordinates[0]);
                    let col = parseInt(coordinates[3]);
                    let effectedCells = props.direction == "row" ? [row] : [col];
                    // let effectedCols = [col];
                    let currentRow = row;
                    let currentCol = col;
                    let index = 0;
                    //Places all the row values that will be validated in the updated board
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
    
                    //Calculates the amount of space left when adding the current row placement and the size of the ship
                    let calculation = props.direction == "row" ? row + props.selectedShip.size : col + props.selectedShip.size;
                    //A argument of valid or invalid will be passed into the updateBoard method based on if the calculation surpasses the length of the board
                    if(calculation > props.length){      
                        console.log(effectedCells);
                        updateBoard(row, col, props.selectedShip.size, "invalid", effectedCells);
                    }else{
                        console.log(effectedCells);
                        updateBoard(row, col, props.selectedShip.size, "valid", effectedCells);
                    }
                    
                }
            }
    
    
            //Returns the game board, consisting of the title of the game, the board, and the cells. 
            //https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react was used to help get this correct, as there was significant 
            //struggle getting it to work properly
            
            return (
            <div className="container">
                <div class="board">
                {
        
                    board.cells.map((cell) => {
                        return(
                            <div className="row">
                                {
                                cell.coordinates.map((coord)=>{
                                    return(
                                    <Cell row={coord.row} col={coord.col} valid={cell.valid} primaryBoard={true} onMouseOver={placeShip}/>
                                    );
                                }
                                )
                            }
                            </div>
                        )
                    })
                }
                
                </div>
            </div>
            )
        }else{
            return (
                    <div class="board secondary-board">
                    {

                        board.cells.map((cell) => {
                            return(
                                <div className="row">
                                    {
                                    cell.coordinates.map((coord)=>{
                                        return(
                                        <Cell row={coord.row} col={coord.col} primaryBoard={false}/>
                                        );
                                    }
                                    )
                                }
                                </div>
                            )
                        })
                    }
                
                    </div>
            )
        }
}

export default GameBoard;