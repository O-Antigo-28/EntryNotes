import { BarcodeEAN13 } from "./TBarcodeEAN13"
import { UnitOfMeasure } from "./TUnitOfMeasure"
export interface ILabel {
    description: string
    code: BarcodeEAN13
    unitOfMeasure: UnitOfMeasure
    valueProduct: number
    promotionalValue?: number
  
  }