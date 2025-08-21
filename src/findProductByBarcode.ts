import { ILabel } from "./components/Label/ILabel"
import { IPrice } from "./IPrice"
type labelInFetch = {cost: number, price: number, description: string, barcode: string}
export async function findProductByBarcode(barcode: string): Promise<IPrice & ILabel | undefined>{
    try{
        const result = await fetch(`http://127.0.0.1:3001/basicproduct?code=${barcode}`)    
        const product: labelInFetch = await result.json()
        return {code: product.barcode, description: product.description, value: product.price, unitOfMeasure: "un", currency: "R$" }
    }catch(e){
        return undefined
    }



 

            
}