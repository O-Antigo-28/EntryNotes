export type UnitOfMeasure = "kg" | "un" | "g" | "l" | "ml"  | "dz" | "pct" | "fd" | "cx"
interface ILabel {
    code: string, 
    description: string,
    unitOfMeasure: UnitOfMeasure, 
    value: string
    promotionalValue?: string

}


export class Label implements ILabel{
    constructor(
        public code: string,
        public description: string,
        public unitOfMeasure: UnitOfMeasure,
        public value: string, 
        public promotionalValue: string
        
           
    ){
        
    }
}

