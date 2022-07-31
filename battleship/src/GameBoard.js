import React, { useState } from "react";
import Cell from "./Cell";
const GameBoard = (props) => {
    //An empty array which will be used to store coordinates in
    const [board, setBoard] = useState({cells:[]});
    const [direction, changeDirection] = useState("vertical");
    let directionEventListener = new KeyboardEvent('keypress', {
        key: 'enter'
       });
       console.log(directionEventListener);
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
        const handleChangeDirection = (ship) => {
            console.log("Handled");
            // if(ship !== undefined){
            //   if(direction == "vertical"){
            //     changeDirection("horizontal");
            //   }else{
            //     changeDirection("vertical");
            //   }
            //   console.log(direction);
            // }
            // if(direction == "vertical"){
            //   changeDirection()
            // }
          }

        console.log(board.cells)
        
        const updateBoard = (row, col, length, validity, effectedRows) => {
            let tempCells = [];
            let cont = false;
            let contWasTrue = false;
            let index = 0;
            let nextRow;
            for(let x = 0; x < props.length; x++){
                console.log("Hovered row: " + row)
                if(contWasTrue === false){
                    nextRow = 0;
                }
                //Recreates the array but implements the validity argument to create an updated state for the board
                for(let y = 0; y < props.length; y++){
                    if(tempCells.length < props.length*props.length){
                        //Checks if the current cell in the loop is the cell that is hovered and gives it the validity of valid or invalid
                        if(x == effectedRows[index] && col == y){
                            console.log(effectedRows[index + 1]);
                            tempCells.push({coordinates: [{row: effectedRows[index], col: y}], valid: validity});
                            
                            //Allows for the proceeding cells to display as green or red
                            if(index < length){
                            cont=true;
                            // contWasTrue = true;
                            nextRow += 9
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
                let effectedRows = [row];
                let currentRow = row;
                let index = 0;
                //Places all the row values that will be validated in the updated board
                while(index < props.selectedShip.size - 1){
                    currentRow++;
                    
                    effectedRows.push(currentRow)
                    index++;
                }

                //Calculates the amount of space left when adding the current row placement and the size of the ship
                let rowCalculation = row + props.selectedShip.size;
                //A argument of valid or invalid will be passed into the updateBoard method based on if the calculation surpasses the length of the board
                if(rowCalculation > props.length){      
                    console.log(effectedRows);
                    updateBoard(row, col, props.selectedShip.size, "invalid", effectedRows);
                }else{
                    console.log(effectedRows);
                    updateBoard(row, col, props.selectedShip.size, "valid", effectedRows);
                }
                
            }
        }

        window.addEventListener(directionEventListener, handleChangeDirection(props.selectedShip));

        //Returns the game board, consisting of the title of the game, the board, and the cells. 
        //https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react was used to help get this correct, as there was significant 
        //struggle getting it to work properly
        
    return (
    <div className="container">
        <div className="board">
        {

            board.cells.map((cell) => {
                return(
                    <div className="row">
                        {
                        cell.coordinates.map((coord)=>{
                            return(
                            <Cell row={coord.row} col={coord.col} valid={cell.valid} onMouseOver={placeShip}/>
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
}

export default GameBoard;