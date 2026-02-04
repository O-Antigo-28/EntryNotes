import { BarcodeEAN13 } from "../../TBarcodeEAN13"
import { UnitOfMeasure } from "./TUnitOfMeasure"
export interface ILabel  {
    description: string
    barcode: string
    unitOfMeasure: UnitOfMeasure
  }