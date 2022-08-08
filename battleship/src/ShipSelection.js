import React, { useState } from "react";
import Ship from './Ship';
const ShipSelection = (props) => {
    const [ships, setShips] = useState([{id: 0, size: 2}, {id: 1, size: 3}, {id: 2, size: 3}, {id: 3, size: 4}]);
    const [usedShips, setUsedShips] = useState([]);

    const handleShipSelection = (ship) => {
        console.log(props.selectedShip);
        let tempShips = [];
        for(let i = 0; i < ships.length; i++){
            console.log("The ship is " + ship.id)
            
            if(props.selectedShip != undefined){
                if(i == props.selectedShip.id){
                    console.log("Adding back to the ships");
                    tempShips.push(props.selectedShip);
                }
            }
            if(ships[i].id != ship.id){
                console.log("The ship is not " + ships[i].id)
                tempShips.push({id: ships[i].id, size: ships[i].size});
                console.log(tempShips);
            }
        }
        setShips(...[tempShips])
        props.onClick(ship);
    }

console.log(props.selectedShip)
    if(ships.length > 0){
        console.log("The selected ship is " + props.selectedShip);
        return(
            <div class="ship-container">
            <div className="ship-selection">
                {
                    ships.map((ship)=>{
                        // console.log(ship)
                        return(
                            
                            <Ship ship={ship} id={ship.id} onClick={handleShipSelection}/>
                        )
                    })
                    }
                </div>
                </div>
            )
    }else if(props.selectedShip === undefined){
        return (
            <button class="play" onClick={props.onClick}>Play</button>
        )
    }
    
}

export default ShipSelection;