import { ILabel } from "./ILabel";
import { UnitOfMeasure } from "./TUnitOfMeasure";


export class Label implements ILabel{
    constructor(
        public code: string,
        public description: string,
        public unitOfMeasure: UnitOfMeasure,
        
        
           
    ){
        
    }
}

