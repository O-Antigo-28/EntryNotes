import "./automatic.css"
import { useParams, useLocation} from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import React, {  useState, useEffect, useReducer} from "react"
import NotesPanel from "../../components/NotesPanel"
import { RedeNoteExtractor } from "../../models/NoteExtractor/RedeNoteExtractor"
import { Note } from "../../Note"
import { Indexer } from "../../Indexer"

import { CaixaNoteExtractor } from "../../models/NoteExtractor/CaixaNoteExtractor"
import ValueSystemInput from "../../components/ValueSystemInput"

import { CSVExtractor } from "../../CSVExtractor"
import SaleList from "../../components/SaleList"
import {Product} from "../../Product"
import {SaleItem} from "../../SaleItem"
import { ProductExtractor } from "../../ProductExtrator"
import { SearchAlgorithm } from "../../SearchAlgorithm"
import SystemInput from "../../components/SystemInput"
import AppLogo from "../../components/AppLogo"
import { Sale } from "../../Sale"
import {IDGenerator} from "../../IDGenerator"
import ButtonContainer from "../../components/ButtonContainer"
import NoteElement from "../../components/NoteElement"
import Button from "../../components/Button"

import {ipcRenderer} from "electron"
import { Directions } from "../../Directions"
import { useRecoilState, useSetRecoilState } from "recoil"
import { saleItemListState } from "../../state/atom"

interface IStatesAutomaticPage{
  ready: boolean,
  items: Indexer<SaleItem>,
  indexItem: number,
  notes: Indexer<Note>,
  sales: Indexer<Sale>, 
  products: Array<Product>
}

type ActionAutomaticPage = 
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

function updateProductList(productList: Product[], productsSold: SaleItem[]){
  for(const sale of productsSold){
      const currentQuantity = sale.product.quantity
      const quantitySold = sale.quantitySold
      const productID = sale.product.id

      productList[productID].quantity = ( currentQuantity - quantitySold)
  }
}

const CAIXA_FILE_ENCODING = "win1252"

const reducerAutomaticPage: React.Reducer<IStatesAutomaticPage, ActionAutomaticPage> = (state, action) => { 
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

const AutomaticPage = () => {

  const {stockPath, redePath, caixaPath}  = useParams()


  
  const setSaleItemList = useSetRecoilState<SaleItem[]>(saleItemListState)
  
  const [state, dispatch] = useReducer(reducerAutomaticPage, {ready: false, indexItem: 0,items: new Indexer<SaleItem>([]), notes: new Indexer<Note>([]), sales: new Indexer<Sale>([]), products: []})

  // const [downloadedFiles, setdownloadedFiles] = useState<boolean>(false)

  function handleKeyDown(){ 

  }

  function handleKeyUp(){ 

  }

  function eraseData(){
    dispatch({type: "ERASE_DATA"})
  }
 
  function nextNote(){ 
    dispatch({type: 'NEXT'})
    dispatch({type: 'UPDATE_SALE_LIST'})
  }

  function previosNote(){ 
    dispatch({type: 'PREVIOUS'})
    dispatch({type: 'UPDATE_SALE_LIST'})
  }

  function nextItem(){
    dispatch({type: 'NEXT_ITEM'})
  }

  function handleSelectItem(index: number){
    dispatch({type: 'SELECT_ITEM', index: index})
  }

  function previosItem(){
    dispatch({type: 'PREVIOUS_ITEM'})
  }

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        // STOCK
        const rawProductsData = await CSVExtractor(decodeURIComponent(stockPath));
        const productExtractor = new ProductExtractor(rawProductsData)
        console.log(productExtractor.products)
        // REDE
        const rawRedeData = await CSVExtractor(decodeURIComponent(redePath));
        const redeExtractor = new RedeNoteExtractor(rawRedeData);
        console.log(redeExtractor.notes)
        // CAIXA
        const rawCaixaData = await(CSVExtractor(decodeURIComponent(caixaPath), CAIXA_FILE_ENCODING))
        const caixaExtractor = new CaixaNoteExtractor(rawCaixaData)
        console.log(caixaExtractor.notes)

        if(!ignore){ 
          dispatch({type: "LOAD_PRODUCTS", products: productExtractor.products})
      
          dispatch({type: 'ADDING_TO_NOTES_LIST', notes: redeExtractor.notes})
          dispatch({type: 'ADDING_TO_NOTES_LIST', notes: caixaExtractor.notes})

          dispatch({type: 'GENERATE_SALES'})
          dispatch({type: 'UPDATE_SALE_LIST'})

          dispatch({type: 'START'})
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    return () => { 
      dispatch({type: "ERASE_DATA"})
      ignore = true
    }
    
  }, []); 

  useEffect(()=> { 
    if(state.ready){
      ipcRenderer.send('register-the-commands')
      ipcRenderer.on('accelerator-directions', (event, key)=>{ 
        switch(key){
          case Directions.LEFT:
            previosNote()
            break;
          case Directions.RIGHT:
            nextNote()
            break;
          case Directions.UP:
            previosItem()
            break;
          case Directions.DOWN:
            nextItem()
            break;
        }
      })
    }

  
  }, [state.ready])

  return (
    <section className="automaticPage" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>

      {( state.ready) 
       &&
      <div>
        <div className="automaticPage__Panel">

          <div className="automaticPage__notePanel">
            <NoteElement note={state.notes.current()}/>
            <ButtonContainer style={{flexDirection: "row", height: "2rem"}}>
              <Button presetStyle="p" listener={previosNote}>anterior</Button>
              <Button presetStyle="p" listener={nextNote}>próximo</Button>
              {/**             
               * <Button listener={previosItem}>anterior</Button>
                <Button listener={nextItem}>próximo</Button> 
                */}

            </ButtonContainer>
          </div>
        
          <div className="automaticPage__results">
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={state.sales.current().total}>tot. produtos</ValueSystemInput>
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={state.sales.current().difference} colors={true} >diferença</ValueSystemInput>
          </div>

        </div>

        
        <SaleList items={state.items.content} selectItem={handleSelectItem} index={state.indexItem}/>
      </div>
      }
      <LinkButton leaving={eraseData}  to={MyRoutes.HOME}>Voltar</LinkButton>

    </section>
    
  )
}   

export default AutomaticPage