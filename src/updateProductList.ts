import { Product } from "./Product"
import { SaleItem } from "./SaleItem"

export function updateProductList(productList: Product[], productsSold: SaleItem[]){
    for(const sale of productsSold){
        const currentQuantity = sale.product.quantity
        const quantitySold = sale.quantitySold
        const productID = sale.product.id
        console.log(sale.product.id)
  
        productList[productID].quantity = ( currentQuantity - quantitySold)
    }
  }