import { Indexer } from "../../Indexer"
import {SaleItem} from "../../SaleItem"
import {Note} from "../../Note"
import { Sale } from "../../Sale"
import { IDGenerator } from "../../IDGenerator"
import { IStatesAutomaticPage } from "./IStateAutomaticPage"
import { ActionAutomaticPage } from "./ActionAutomaticPage"
import { SearchAlgorithm } from "../../SearchAlgorithm"
import { updateProductList } from "../../updateProductList"

export const reducerAutomaticPage: React.Reducer<IStatesAutomaticPage, ActionAutomaticPage> = (state, action) => { 
    switch(action.type){
      case 'ADDING_TO_NOTES_LIST':{
        return state.notes.length === 0? {...state, notes: new Indexer<Note>(action.notes)} : {...state, notes: new Indexer<Note>([...state.notes.content].concat(action.notes))}
      }
      case 'NEXT': {
        state.notes.next()
        state.sales.next()
        return state
      }
      case 'PREVIOUS': {
        state.notes.previous()
        state.sales.previous()
        return state
      }
      case 'UPDATE_SALE_LIST': {
  
        return {...state, items: new Indexer<SaleItem>(state.sales.current().itens), indexItem: 0}
      }
      case 'ERASE_DATA': { 
        IDGenerator.reset()
        return {ready: false, indexItem: 0, items: new Indexer<SaleItem>([]), notes: new Indexer<Note>([]), sales: new Indexer<Sale>([]), products: []}
      }
      case 'NEXT_ITEM': {
        state.items.next()
        return {...state, indexItem: state.items.index}
  
      }
      case 'SELECT_ITEM': {
        state.items.setIndex(action.index)
        return {...state, indexItem: state.items.index}
      }
      case 'PREVIOUS_ITEM': {
        state.items.previous()
        
        return {...state, indexItem: state.items.index}
      }
      case 'LOAD_PRODUCTS': { 
        return {...state, products: action.products} 
      }
      case 'GENERATE_SALES':{
        
        let allSales:Sale[] = []
  
        const algorithm = new SearchAlgorithm(state.products)
    
        state.notes.content.forEach(note => {
          const salueList = algorithm.generateSales(note.value)
  
          updateProductList(state.products, salueList.itens)
          allSales.push(salueList)
        });
        
        return {...state, sales: new Indexer<Sale>(allSales)}
      }
      case 'START':{
        return {...state, ready: true}
      }
      case 'STOP': { 
        return {...state, ready: false}
      }
      default:
        return state
    }
  }