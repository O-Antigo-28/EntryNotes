import "./automatic.css"
import { useParams, useLocation} from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import {  useState, useEffect} from "react"
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

const CAIXA_FILE_ENCODING = "win1252"

const AutomaticPage = () => {

  const {stockPath, redePath, caixaPath}  = useParams()
  const [notes, setNotes] = useState<Indexer<Note>>(new Indexer<Note>([]))
  const [sales, setSales] = useState<Indexer<Sale>>(new Indexer<Sale>([]))
  const [products, setProducts] = useState<Product[]>([])
  const [processingCompleted, setProcessingCompleted] = useState(false)
  const [rangeValue, setRangeValue] = useState<number>(0)
  const [items, setItems] = useState<Indexer<SaleItem>>(new Indexer<SaleItem>([]))
  const [ready, setReady] = useState(false)
  const [currentItemID, setCurrentItemID] = useState<number>(0)

  
  function eraseData(){ 
    setNotes(new Indexer<Note>([]))
    setSales(new Indexer<Sale>([]))
    setItems(new Indexer<SaleItem>([]))
    setProducts([])

    IDGenerator.reset()
  }
  
  // const [downloadedFiles, setdownloadedFiles] = useState<boolean>(false)

  function handleKeyDown(){ 

  }

  function handleKeyUp(){ 

  }
 
  function nextNote(){ 
    notes.next()
    setItems(new Indexer<SaleItem>(sales.next().itens))
    setRangeValue(notes.index)
  }

  function previosNote(){ 
    notes.previous()
    setItems(new Indexer<SaleItem>(sales.previous().itens))
    setRangeValue(notes.index)
  }

  // function nextItem(){
  //   setItems((oldItems)=> { 
  //     oldItems.next()
  //     return oldItems
  //   })
  //   console.log(items.index)
  //   console.log(items.length)
  //   console.log(items.content)
  //   setCurrentItemID(items.index)

  // }
  function handleSelectItem(index: number){
    items.setIndex(index)
    console.log(processingCompleted)
    console.log(ready)
    console.log(items)
    setCurrentItemID(items.index)
  }

  // function previosItem(){
  //   console.log(items)
  //   items.previous()
  //   setCurrentItemID(items.index)

  // }

  function updateProductList(productList: Product[], productsSold: SaleItem[]){
    for(const sale of productsSold){
        const currentQuantity = sale.product.quantity
        const quantitySold = sale.quantitySold
        const productID = sale.product.id

        productList[productID].quantity = ( currentQuantity - quantitySold)
    }
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
          setProducts(productExtractor.products)
          addToStateIndexer<Note>(setNotes, caixaExtractor.notes)
          addToStateIndexer<Note>(setNotes, redeExtractor.notes)
          setNotes( (notes) => {
            setProducts((products)=>{ 
              let allSales:Sale[] = []

              const algorithm = new SearchAlgorithm(products)
          
              notes.content.forEach(note => {
                const salueList = algorithm.generateSales(note.value)
                console.log(salueList)

                updateProductList(products, salueList.itens)
                allSales.push(salueList)
              });
              
              setSales(new Indexer<Sale>(allSales))
              setSales((oldSales)=> {
                setProcessingCompleted(true) 
                return oldSales
              })

              
              
              return products
            })

            return notes
          })
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    return () => { 
      eraseData()
      ignore = true
    }
    
  }, []); 

  useEffect(()=> { 
    if(processingCompleted){ 
      setItems(new Indexer<SaleItem>(sales.current().itens))
      setItems((items) => {
        console.log(items)

        setReady(true)
        return items
      })


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
            // previosItem()
            break;
          case Directions.DOWN:
            // nextItem()
            break;
            }
      } )
  
      
    }

  
  }, [processingCompleted])

  function addToStateIndexer<T>(setStateList: React.Dispatch<React.SetStateAction<Indexer<T>>>, addedList: T[]): void{
    setStateList((oldIndexer: Indexer<T>)=>{ 
      if(oldIndexer.content.length === 0){
        return new Indexer<T>(addedList)
      }
      
      const uptdateIndexer =  [...oldIndexer.content].concat(addedList)

      return new Indexer<T>(uptdateIndexer)
    })

  }

  return (
    <section className="automaticPage" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>

      {(ready && items.length > 0) 
       &&
      <div>
        <div className="automaticPage__Panel">

          <div className="automaticPage__notePanel">
            <NoteElement note={notes.current()}/>
            <ButtonContainer style={{flexDirection: "row"}}>
              <Button listener={previosNote}>anterior</Button>
              <Button listener={nextNote}>próximo</Button>
              {/**             
               * <Button listener={previosItem}>anterior</Button>
                <Button listener={nextItem}>próximo</Button> 
                */}
 
            </ButtonContainer>
          </div>
        
          <div className="automaticPage__results">
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={sales.current().total}>tot. produtos</ValueSystemInput>
            <ValueSystemInput style={{backgroundColor:"#eeeeee"}} value={sales.current().difference} colors={true} >diferença</ValueSystemInput>
          </div>

        </div>

        
        <SaleList items={items.content} selectItem={handleSelectItem} index={currentItemID}/>
      </div>
      }
      <LinkButton leaving={eraseData}  to={MyRoutes.HOME}>Voltar</LinkButton>

    </section>
    
  )
}   

export default AutomaticPage