import React from "react";

const Cell = (props) => {
    // console.log(props.row)
    const handleMouseOver = ()=>{
        console.log("Mouse over");
    }
    return (<button className="cell" onMouseOver={props.onMouseOver}>{props.row}, {props.col}</button>)
}
export default Cell;
