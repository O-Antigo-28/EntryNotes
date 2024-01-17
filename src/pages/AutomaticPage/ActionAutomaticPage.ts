import {Note} from "../../Note"
import {Product} from "../../Product"

export type ActionAutomaticPage = 
{type: 'ADDING_TO_NOTES_LIST', notes: Note[]} |
{type: 'ERASE_DATA'} | 
{type: 'NEXT'}|
{type: 'PREVIOUS'}|
{type: 'UPDATE_SALE_LIST'} | 
{type: 'NEXT_ITEM'}| 
{type: 'PREVIOUS_ITEM'} | 
{type: 'SELECT_ITEM', index: number} | 
{type: 'LOAD_PRODUCTS', products: Product[]} | 
{type: 'GENERATE_SALES'} | 
{type: 'START'}| 
{type: 'STOP'}
