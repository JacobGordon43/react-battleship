import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons"

const Cell = (props) => {
    const handleMouseOver = (e)=>{
        console.log("Mouse over");
        console.log("Cell is " + props.valid)
        props.onMouseOver(props.row, props.col, false);
    }
    const handleOnClick = (e) =>{
        console.log("In Cell");
        console.log(props.occupied)
        props.onClick(props.row, props.col, true);
        console.log(props.onClick(props.row, props.col, true));
    }
    //A different return statement is offered for each status of the valid property
    if(props.primaryBoard == true){
        if(props.occupied){
            return (<div class="cell occupied" onMouseOver={handleMouseOver} onClick={handleOnClick}>{props.cellId}</div>)
        }
        else if(props.valid == "valid"){
            return (<div class="cell valid" onMouseOver={handleMouseOver} onClick={handleOnClick}>{props.cellId}</div>)
        } else if(props.valid == "invalid"){
            return (<div class="cell invalid" onMouseOver={handleMouseOver} onClick={handleOnClick}>{props.cellId}</div>)
    
        }else{
            return (<div class="cell" onMouseOver={handleMouseOver} onClick={handleOnClick}><FontAwesomeIcon icon={faWater}></FontAwesomeIcon></div>)
        }
    }else{
        return <div class="secondary-board-cell"></div>
    }

}
export default Cell;
