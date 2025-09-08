import { IProduct } from "./IProduct" 
import { UnitOfMeasure } from "./components/Label/TUnitOfMeasure"

import { PrintableLabel } from "./pages/Labels/PrintableLabel"
export function transformproductInDefaultPrintableLable(product: IProduct): PrintableLabel{
    const {barcode,description, price, unitOfMeasure } = product
    console.log(unitOfMeasure)
    return {code: barcode, description: description, value: price, currency:"R$", unitOfMeasure: unitOfMeasure as UnitOfMeasure, width: 10, height: 4.5, lengthUnit:"cm"}
}