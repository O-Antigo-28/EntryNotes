import {atom, useRecoilState} from 'recoil'
import { Product } from '../Product'
import { SaleItem } from '../SaleItem'

export const productListState = atom<Product[]>({
    key: 'productListState',
    default: [],
})



