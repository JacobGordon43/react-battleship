import React from "react";
import ShipBlock from "./ShipBlock";
const Ship = (props) => {
    console.log(this);
    let arr = []
    for(let i=0; i < props.size; i++){
        arr.push(i);
    }
    return (
        <div className="ship" onClick={(ship)=>{console.log(this)}}>
            {
                arr.map((size) => {
                    // <div className ="ship-block">{size}</div>
                    return(
                        <ShipBlock></ShipBlock>                        
                    )
                })
            }
        </div>
    )
}
export default Ship;