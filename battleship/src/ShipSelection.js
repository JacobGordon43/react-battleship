import React, { useState } from "react";
import Ship from './Ship';
const ShipSelection = (props) => {
    const [ships, setShips] = useState([{id: 0, size: 2}, {id: 1, size: 3}, {id: 2, size: 3}, {id: 3, size: 4}]);
    const [usedShips, setUsedShips] = useState([]);

    const handleShipSelection = (ship) => {
        console.log("Selected Ship in Ship Selection");
        props.onClick(ship);
    }
    console.log(ships[0]);
    return(
        <>
        <h2>Select a ship</h2>
        <div className="ship-selection">
            {
                ships.map((ship)=>{
                    // console.log(ship)
                    return(
                        
                        <Ship ship={ship} onClick={handleShipSelection}/>
                    )
                })
                }
            </div>
            </>
        )
    
}

export default ShipSelection;