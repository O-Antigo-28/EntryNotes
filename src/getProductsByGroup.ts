import { PrintableLabel } from "./pages/Labels/PrintableLabel"
import { IPrice } from "./IPrice"
import {ILabel} from "./components/Label/ILabel"
import { UnitOfMeasure } from "./components/Label/TUnitOfMeasure"

type labelInFetch = {cost: number, price: number, description: string, barcode: string, code: string, lengthUnit: string}
export async function getProdutsByGroup(groupcode: string): Promise<PrintableLabel[] | undefined>{
    try{
        const result = await fetch(`http://127.0.0.1:3001/group?code=${groupcode}`)
        const products: labelInFetch[] = await result.json()
        
        return products.map((labelInFetch):PrintableLabel => {
            const barcode = labelInFetch.barcode.replace(/^0+/, "");
            return {code: barcode, description: labelInFetch.description, value: labelInFetch.price, currency:"R$", unitOfMeasure: labelInFetch.lengthUnit as UnitOfMeasure, width: 10, height: 4.5, lengthUnit:"cm"}
        })
    }catch(e){
        return undefined
    }
}