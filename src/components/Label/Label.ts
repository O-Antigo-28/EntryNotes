import { ILabel } from "./ILabel";
import { BarcodeEAN13 } from "./TBarcodeEAN13";
import { UnitOfMeasure } from "./TUnitOfMeasure";


export class Label implements ILabel{
    constructor(
        public code: BarcodeEAN13,
        public description: string,
        public unitOfMeasure: UnitOfMeasure,
        public valueProduct: number, 
        public promotionalValue?: number
        
           
    ){
        
    }
}

