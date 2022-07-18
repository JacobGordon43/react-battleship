import React from "react";

const Cell = (props) => {
    console.log(props.row)
    return (<button className="cell">{props.row}, {props.col}</button>)
}
export default Cell;
