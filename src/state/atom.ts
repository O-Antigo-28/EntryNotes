import { atom } from "recoil"

import {SaleItem} from "../SaleItem"

export const saleItemListState = atom({
    key: 'saleItemList', 
    default: []
})