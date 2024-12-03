import "./automatic.css"
import { useParams} from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import { MyRoutes } from "../../MyRoutes"
import {  useEffect, useReducer} from "react"
import { RedeNoteExtractor } from "../../models/NoteExtractor/RedeNoteExtractor"
import { Note } from "../../Note"
import { Indexer } from "../../Indexer"

import { CaixaNoteExtractor } from "../../models/NoteExtractor/CaixaNoteExtractor"
import ValueSystemInput from "../../components/ValueSystemInput"

import { CSVExtractor } from "../../CSVExtractor"
import SaleList from "../../components/SaleList"
import {SaleItem} from "../../SaleItem"
import { ProductExtractor } from "../../ProductExtrator"
import { Sale } from "../../Sale"
import ButtonContainer from "../../components/ButtonContainer"
import NoteElement from "../../components/NoteElement"
import Button from "../../components/Button"

import {ipcRenderer} from "electron"
import { Directions } from "../../Directions"

import { reducerAutomaticPage } from "./reducerAutomaticPage"
import { useCaixaFileIdentifier, useRedeFileIdentifier, useStockFileIdentifier } from "./../../atoms/fileIdentifiers"
import { registerAcceleratorsDirections, unregisterAcceleratorsDirections } from "../IpcCommunication"

const CAIXA_FILE_ENCODING = "win1252"



const AutomaticPage = () => {

  const stockPath = useStockFileIdentifier().path
  const redePath = useRedeFileIdentifier().path
  const caixaPath = useCaixaFileIdentifier().path

  console.log(stockPath)
  console.log(redePath)
  console.log(caixaPath)
  const [state, dispatch] = useReducer(reducerAutomaticPage, {
      ready: false,
      indexItem: 0,
      items: new Indexer<SaleItem>([]),
      notes: new Indexer<Note>([]),
      sales: new Indexer<Sale>([]), 
      products: []}
    )


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
  function autoMode(){
    dispatch({type: 'AUTO_MODE'})
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
        
  

       

        if(!ignore){

          dispatch({type: "LOAD_PRODUCTS", products: productExtractor.products})

          // REDE
          if(redePath.length > 3){
            const rawRedeData = await CSVExtractor(decodeURIComponent(redePath));
            const redeExtractor = new RedeNoteExtractor(rawRedeData);
            dispatch({type: 'ADDING_TO_NOTES_LIST', notes: redeExtractor.notes})
          }

          // CAIXA
          if(caixaPath.length > 3){
            const rawCaixaData = await(CSVExtractor(decodeURIComponent(caixaPath), CAIXA_FILE_ENCODING))
            const caixaExtractor = new CaixaNoteExtractor(rawCaixaData)
            dispatch({type: 'ADDING_TO_NOTES_LIST', notes: caixaExtractor.notes})
          }


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
      eraseData()
      unregisterAcceleratorsDirections()
      ignore = true
    }
    
  }, []); 

  function registerCommandsOfAutomaticPage(){
    registerAcceleratorsDirections()
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

  useEffect(()=> { 
    if(state.ready){
      registerCommandsOfAutomaticPage()
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
              <Button presetStyle="p" onClick={previosNote}>anterior</Button>
              <Button presetStyle="p" onClick={nextNote}>próximo</Button>
            </ButtonContainer>
          </div>
        
          <div className="automaticPage__results">
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={state.sales.current().total}>tot. produtos</ValueSystemInput>
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={state.sales.current().difference} colors={true} >diferença</ValueSystemInput>
            <Button presetStyle="p" onClick={autoMode}>AUTO</Button>
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