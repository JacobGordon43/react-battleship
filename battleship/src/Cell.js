import React from "react";

const Cell = (props) => {
    // console.log(.a)
    const handleMouseOver = (e)=>{
        console.log("Mouse over");
        console.log("Cell is " + props.valid)
        props.onMouseOver(e);
    }
    //A different return statement is offered for each status of the valid property
    if(props.valid == "valid"){
        return (<button className="cell valid" onMouseOver={handleMouseOver}>{props.row}, {props.col}</button>)
    } else if(props.valid == "invalid"){
        return (<button className="cell invalid" onMouseOver={handleMouseOver}>{props.row}, {props.col}</button>)

    }else{
        return (<button className="cell" onMouseOver={handleMouseOver}>{props.row}, {props.col}, {props.valid}</button>)
    }
}
export default Cell;
