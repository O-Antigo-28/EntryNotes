import { Indexer } from "../../Indexer"
import {Product} from "../../Product"
import {SaleItem} from "../../SaleItem"
import {Note} from "../../Note"
import { Sale } from "../../Sale"

export interface IStatesAutomaticPage{
    ready: boolean,
    items: Indexer<SaleItem>,
    indexItem: number,
    notes: Indexer<Note>,
    sales: Indexer<Sale>, 
    products: Array<Product>
}
