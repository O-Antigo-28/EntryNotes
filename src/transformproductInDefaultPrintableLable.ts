import { IProduct } from "./IProduct" 
import { UnitOfMeasure } from "./components/Label/TUnitOfMeasure"

import { PrintableLabel } from "./pages/Labels/PrintableLabel"
export function transformproductInDefaultPrintableLable(product: IProduct): PrintableLabel{
    const {barcode,description, price, unitOfMeasure, code,price_promotional} = product
    return {code: barcode, description: description, value: price, currency:"R$", unitOfMeasure: unitOfMeasure as UnitOfMeasure, width: 6.5, height: 3.4, lengthUnit:"cm", promotionalValue: price_promotional }
}