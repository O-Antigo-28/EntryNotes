import {atom, useRecoilState} from 'recoil'
import { Product } from '../Product'
import { SaleItem } from '../SaleItem'

export const productListState = atom<Product[]>({
    key: 'productListState',
    default: [],
})

export const useUpdateProductList = () =>{ 
    
    const [productList, setProductList] = useRecoilState<Product[]>(productListState)

    return (productsSold: SaleItem[]) => { 
        const newProductList = [...productList] 
        for(const productSold of productsSold){ 
            const currentQuantity = productSold.product.quantity
            const quantitySold = productSold.quantitySold
            const productID = productSold.product.id
            newProductList[productID].quantity = ( currentQuantity - quantitySold)

        }
        return setProductList(newProductList)
    }
}


