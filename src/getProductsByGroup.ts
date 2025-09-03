import { PrintableLabel } from "./pages/Labels/PrintableLabel"
import { IProduct } from "./IProduct"
import { transformproductInDefaultPrintableLable } from "./transformproductInDefaultPrintableLable"
export async function getProdutsByGroup(groupcode: string): Promise<PrintableLabel[] | undefined>{
    try{
        const result = await fetch(`http://127.0.0.1:3001/group?code=${groupcode}`)
        const products: IProduct[] = await result.json()
        
        return products.map((product):PrintableLabel => {
            const barcode = product.barcode.replace(/^0+/, "");
            return transformproductInDefaultPrintableLable({...product, barcode})
        })
    }catch(e){
        return undefined
    }
}