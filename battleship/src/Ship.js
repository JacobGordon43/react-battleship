import React from "react";
import ShipBlock from "./ShipBlock";
const Ship = (props) => {
const handleSelect = () => {
    console.log("Selected Ship")
    console.log(props.ship.size);
    console.log(props.ship);
    props.onClick(props.ship);
}
    console.log(props.ship.size);
    let arr = []
    for(let i=0; i < props.ship.size; i++){
        arr.push(i);
    }
    return (
        <div className="ship" onClick={handleSelect}>
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