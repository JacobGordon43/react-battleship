import React, { useState } from "react";
import Cell from "./Cell";
const GameBoard = (props) => {
    //An empty array which will be used to store coordinates in
    const board = [];
        //Used to initialize the board with
        for(let row = 0; row < props.length; row++){
            // console.log(board);
            // console.log("Row" + row)
            for(let col = 0; col < props.length; col++){
                // console.log(row + "," + col);
                //On the first column, it stores an array with a column value to initialize the column of coordinates
                if(col == 0){
                    board[row] = [{row: row, col: col}];
                }
                //Each column afterwards gets both points stored in the coresponding spot within the board
                board[row][col] = {row: row, col: col}
            }
        }
        console.log(board);
        // board.map((row, col) => {console.log(row[0])})
        //Returns the game board, consisting of the title of the game, the board, and the cells. 
        //https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react was used to help get this correct, as there was significant 
        //struggle getting it to work properly
    return (
    <div className="container">
        <h1>Battleship</h1>
        <div className="board">
        {

            board.map((row, col) => {
                return(
                    <div className="row">
                {row.map((xrow) => {
                    // console.log(xrow.row + " " + xrow.col)
                    return(
                        <Cell row={xrow.row} col={xrow.col}/>
                    )
                })}
                </div>
                )
            })
        }
    </div>
    </div>
    )
}

export default GameBoard;