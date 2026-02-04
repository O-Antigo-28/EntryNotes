import { ILabel } from "./ILabel";
import { UnitOfMeasure } from "./TUnitOfMeasure";


export class Label implements ILabel{
    constructor(
        public barcode: string,
        public description: string,
        public unitOfMeasure: UnitOfMeasure,
        
        
           
    ){
        
    }
}

