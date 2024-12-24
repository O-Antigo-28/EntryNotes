import { IMeasure } from "./IMeasure"
import { LengthUnit } from "./TLengthUnit"
class Measure implements IMeasure{
    constructor(
      public width: number,
      public height: number,
      public lengthUnit: LengthUnit
    ){
      
    
  }
  }
export default Measure  