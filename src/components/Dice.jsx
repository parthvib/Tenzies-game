import React from "react";

export default function Dice(props){

    
    
   const style={
        backgroundColor:props.isHeld?"#009900":"white"
    }
    
    
    return (
        
    <div className="container" style={style} onClick={props.holdDice}>{props.value}</div>
    
    )
}