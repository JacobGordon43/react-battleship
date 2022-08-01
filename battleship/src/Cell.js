import React from "react";

const Cell = (props) => {
    const handleMouseOver = (e)=>{
        console.log("Mouse over");
        console.log("Cell is " + props.valid)
        props.onMouseOver(e);
    }
    //A different return statement is offered for each status of the valid property
    if(props.primaryBoard == true){
        if(props.valid == "valid"){
            return (<button class="cell valid" onMouseOver={handleMouseOver}>{props.row}, {props.col}</button>)
        } else if(props.valid == "invalid"){
            return (<button class="cell invalid" onMouseOver={handleMouseOver}>{props.row}, {props.col}</button>)
    
        }else{
            return (<button class="cell" onMouseOver={handleMouseOver}>{props.row}, {props.col}, {props.valid}</button>)
        }
    }else{
        return <div class="secondary-board-cell">{props.row}, {props.col}</div>
    }

}
export default Cell;
