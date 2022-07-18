import React, { useState } from "react";
import Cell from "./Cell";
const GameBoard = (props) => {
    const board = [];

        for(let row = 0; row < props.length; row++){
            console.log(board);
            console.log("Row" + row)
            for(let col = 0; col < props.length; col++){
                console.log(row + "," + col);
                board[row] += {row: row, col: col}
            }
        }

    return (<>
    {board.map(({row, col}) => (<Cell row={row} col={col}/>))}
    </>
    )
}

export default GameBoard