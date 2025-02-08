import { BarcodeEAN13 } from "../../TBarcodeEAN13"
import { UnitOfMeasure } from "./TUnitOfMeasure"
export interface ILabel {
    description: string
    code: string
    unitOfMeasure: UnitOfMeasure
    valueProduct: number
    promotionalValue?: number
  
  }