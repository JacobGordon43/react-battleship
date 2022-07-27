import React, { useState } from "react";
import Ship from './Ship';
const ShipSelection = (props) => {
    const [ships, setShips] = useState([{size: 2}, {size: 3}, {size: 3}, {size: 4}]);
    const [usedShips, setUsedShips] = useState([]);
    console.log(ships[0]);
    return(
        <div className="ship-selection">
           
            {
                ships.map((ship)=>{
                    console.log(ship.size)
                    return(
                        <Ship size={ship.size}/>
                    )
                })
                }
            </div>
        )
    
}

export default ShipSelection;