import { ReactNode } from "react"
import { LengthUnit } from "./TLengthUnit"
import { IMeasure } from "./IMeasure";
import "./measurebox.css"

const MeasureBox = ({children, width, height, lengthUnit: unit}: IMeasure & {children:ReactNode}) => {

    const boxWidth = width + unit; 
    const boxHeight = height + unit; 
    
    console.log(boxHeight, boxWidth)
    return ( 
    <div className="measure-box" style={{width: boxWidth, height: boxHeight, overflow: "hidden"} }>
      {children}
      </div> )
}

export default MeasureBox