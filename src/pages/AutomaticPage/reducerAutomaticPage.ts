import { Indexer } from "../../Indexer"
import {SaleItem} from "../../SaleItem"
import {Note} from "../../Note"
import { Sale } from "../../Sale"
import { IDGenerator } from "../../IDGenerator"
import { IStatesAutomaticPage } from "./IStateAutomaticPage"
import { ActionAutomaticPage } from "./ActionAutomaticPage"
import { SearchAlgorithm } from "../../SearchAlgorithm"
import { updateProductList } from "../../updateProductList"
import { ipcRenderer } from "electron"
import { useUpdateProductList } from "../../state/productList"
import { NoteSale } from "./../../NoteSale"

export const reducerAutomaticPage: React.Reducer<IStatesAutomaticPage, ActionAutomaticPage> = (state, action) => { 
    // const updateProductList = useUpdateProductList () 
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
        console.log(state.products)
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
      case 'AUTO_MODE': { 
        async function initServer(){
          
        }
        async function initAutoMode(){

        }

        function waitSendingSale(){
          return new Promise<string>((resolve) => { 
            ipcRenderer.on("message-send-notes", (event, message:string) => {
              console.log("eu recebi a mensagem ", message)
              ipcRenderer.removeAllListeners("message-send-notes")
              resolve(message)
            })
          })
        }
        async function sendSales(){
          if (state.notes.length != state.sales.length)
            throw Error("o número de vendas não é o mesmo numero de notinhas")
          let count: number = 0
          for(let index = 0; index < state.sales.length; index ++){
            const noteSale = Object.assign({}, state.sales.content[index], state.notes.content[index])
            if (count >=3){
              throw Error(`não foi possivel mandar a nota de valor ${noteSale.value} e maquina ${noteSale.machineName}`)
            }
            ipcRenderer.send("send-sales", noteSale as NoteSale )

            const message:string = await waitSendingSale()
            console.log(message)
            if(message.toUpperCase() !== "OK"){
              index--;
              count++;
            }else{
              count = 0;
            }
            
          }
          ipcRenderer.send("finish_sales")
        }
        sendSales()
        return state
      }
      default:
        return state
    }
  }