import React, { useState } from "react";
import Cell from "./Cell";
const GameBoard = (props) => {
    //An empty array which will be used to store coordinates in
    const [board, setBoard] = useState({cells:[]});
    let cellCounter = 0;
    // const [secondaryBoard, setSecondaryBoard] = useState({cells:[]});

        //Used to initialize the board with
        if(board.cells.length < props.length * props.length){
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
            console.log("New")
        }
        // board.cells[3].occupied = true;
        console.log(board.cells)

        //Determines how the game board will be handled if it is the primary vs secondary game board
        if(props.primary == true){
            /**
             * 
             * @param {*} row The row that is being hovered/clicked
             * @param {*} col The col that is being hovered/clicked
             * @param {*} length The length of the ship
             * @param {*} validity Whether the cells where the ship is being hovered over is valid or invalid
             * @param {*} effectedCells An array of cells (the row/col value only) that will be primarily looked at
             * @param {*} clicked A true/false that will determine if a ship is placed down or not.
             * @param {*} shipIndex The id of the ship that is being hovered over the board
             * @returns Returns an updated board
             */
            const updateBoard = (row, col, length, validity, effectedCells, clicked, shipIndex) => {
                let tempCells = [];
                let cont = false;
                let index = 0;
                let boardIndex = 0;
                
                for(let x = 0; x < props.length; x++){
                    console.log("Hovered row: " + row)
    
                    //Recreates the array but implements the validity argument to create an updated state for the board
                    for(let y = 0; y < props.length; y++){
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
                                    console.log(validity);
                                    if(validity == "valid"){
                                        // console.log(validity)
                                        if(clicked){
                                            tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: true, shipId: shipIndex});
                                            props.onClick(true, shipIndex, clicked);
                                        }else{
                                            tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                                        }
                                    }else{
                                        // if(board.cells[boardIndex].occupied){
                                        //     tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: "invalid", occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                                        // }else{
                                        //     tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: shipIndex});
                                        // }
                                        tempCells.push({coordinates: [{row: effectedCells[index], col: y}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});

                                    }
                                }else{
                                    if(validity == "valid"){
                                        if(clicked){
                                            tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity, occupied: true, shipId: shipIndex});
                                            // props.selectedShip = undefined;
                                            props.onClick(true, shipIndex, clicked);

                                        }else{
                                            tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                                        }
                                    }else{
                                        tempCells.push({coordinates: [{row: x, col: effectedCells[index]}], valid: validity, occupied: board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                                    }
                                }
                                
                                //Allows for the proceeding cells to display as green or red
                                if(index < length){
                                cont=true;
                                // contWasTrue = true;
                                index++;
                                }

                            }else{
                                tempCells.push({coordinates: [{row: x, col: y}], valid: undefined, occupied:board.cells[boardIndex].occupied, shipId: board.cells[boardIndex].shipId});
                            }
                        }
                        boardIndex++;
                    }
                }
                //Sets the state of the board for the cell array to the new array, with the updated validity for the current selected ship
                setBoard({...board, cells: tempCells});        
            }

            /**
             * 
             * @param {*} row The row of the cell that has been clicked
             * @param {*} col The col of the cell that has been clicked
             * @param {*} clicked A true/false value that is determined by whether the user clicks or hovers over a cell
             */
            const validateShip = (row, col, clicked) => {
                if(props.selectedShip != undefined){
                    if(props.selectedShip.size > 1){
                        let effectedCells = props.direction == "row" ? [row] : [col];
                        // let effectedCols = [col];
                        let currentRow = row;
                        let currentCol = col;
                        let index = 0;
                        let isNextOccupied = false;
                        let calculation = props.direction == "row" ? row + props.selectedShip.size : col + props.selectedShip.size;
                        //Goes through every cell that a ship will take
                        while(index < props.selectedShip.size - 1){
                            //If statement to determine if it is looking at row cells or col cells
                            if(props.direction == "row"){
                                let currentArrayIndex = (currentRow * 9) + col;
                                //Checks to see if the current block within the ship will intersect with a cell that is currently occupied
                                if(calculation <= props.length){
                                    console.log("Leading to isNextOccupied")
                                    if(board.cells[currentArrayIndex + 9].occupied){
                                        isNextOccupied = true;
                                    }
                                }
                                //Goes to the next row in the array and places it into the effectedCells array, which will be passed into the updateBoard method.
                                //The index is then incremented to indicate that another block within the ship has been checked
                                currentRow++;
                                effectedCells.push(currentRow);
                                index++;
                            }else{
                                //This block of code runs the the same logic as the previous one, but it checks for the col direction
                                let currentArrayIndex = (row * 9) + currentCol;
                                if(calculation <= props.length){
                                    if(board.cells[currentArrayIndex + 1].occupied){
                                        isNextOccupied = true;
                                    }
                                }
                                console.log(currentCol);
                                currentCol++;
                                effectedCells.push(currentCol);
                                console.log(effectedCells);
                                index++;
                            }
                        }
                            //Places all the row values that will be validated in the updated board
    
                            //Calculates the amount of space left when adding the current row placement and the size of the ship
                            //A argument of valid or invalid will be passed into the updateBoard method based on if the calculation surpasses the length of the board
                            if(isNextOccupied){
                                updateBoard(row, col, props.selectedShip.size, "invalid", effectedCells, clicked, props.selectedShip.id);
                            }else{
                                if(calculation > props.length){      
                                    console.log(effectedCells);
                                    updateBoard(row, col, props.selectedShip.size, "invalid", effectedCells, clicked, props.selectedShip.id);
                                }else{
                                    console.log(effectedCells);
                                    updateBoard(row, col, props.selectedShip.size, "valid", effectedCells, clicked, props.selectedShip.id);
                                }       
                            }
                        props.onClick(props.selectedShip.id);
                    }
                }

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
                                <Cell row={coord.row} col={coord.col} valid={cell.valid} occupied={cell.occupied} cellId={cellCounter++} shipId={cell.shipId} primaryBoard={true} onClick={validateShip} onMouseOver={validateShip}/>
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