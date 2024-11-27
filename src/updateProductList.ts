import { Product } from "./Product"
import { SaleItem } from "./SaleItem"

export function updateProductList(productList: Product[], productsSold: SaleItem[]){
    for(const sale of productsSold){
        const productToBeChanged = productList.find((product) => product.code === sale.product.code)
        const currentQuantity = productToBeChanged.quantity - sale.quantitySold
        Object.assign(productToBeChanged, {...productToBeChanged, _quantity: currentQuantity})

    }
  }