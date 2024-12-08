import { ReactNode } from "react"
import { LengthUnit } from "./TLengthUnit"

const MeasureBox = ({children, width, height, unit}: {children: ReactNode, width: number, height: number, unit: LengthUnit}) => {
    return ( 
    <div className="measure-box">
      {children}
      </div> )
}

export default MeasureBox