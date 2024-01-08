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
const CAIXA_FILE_ENCODING = "win1252"



const AutomaticPage = () => {
  
  const {stockPath, redePath, caixaPath}  = useParams()

  const [notes, setNotes] = useState<Indexer<Note>>(new Indexer<Note>([]))
  // const [sales, setSales] = useState<Indexer<SaleItem[]>>(new Indexer<SaleItem[]>([]))
  const [sales, setSales] = useState<Indexer<Sale>>(new Indexer<Sale>([]))
  
  const [products, setProducts] = useState<Product[]>([])
  const [difference, setDifference] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  // const [downloadedFiles, setdownloadedFiles] = useState<boolean>(false)

  // // const [currentNote, setCurrentNote] = useState<Note>()
  const [rangeValue, setRangeValue] = useState<number>(0)

  // const [SI_TotalProducts, setSI_TotalProducts]= useState(0)
  // const [SI_Difference, setSI_Difference] = useState(0) 

  function eraseData(){ 
    setNotes(new Indexer<Note>([]))
    setSales(new Indexer<Sale>([]))
    setProducts([])
    setDifference(0)
    setTotal(0)
    IDGenerator.reset()

  }
 
  

  function handleKeyDown(){ 

  }

  function handleKeyUp(){ 

  }
  
  function nextNote(){ 
    notes.next()
    sales.next()

    // setCurrentNote(notes.next())
    setRangeValue(notes.index)
  }
  function previosNote(){ 
    // setCurrentNote(notes.previous())
    sales.previous()
    notes.previous()
    setRangeValue(notes.index)

  }
  function loadNotes(notes: Indexer<Note>){
    if(notes.length > 0){ 
    //  setCurrentNote(notes.content[0]) 
    }
    
  }
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
              
              
              // setSales(new Indexer<SaleItem[]>(allSales))
              setSales(new Indexer<Sale>(allSales))


              
              return products
            })

            return notes
          })
          // setdownloadedFiles(true)
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
      

      {(notes.length> 0 && sales.length > 0)
       &&
      <div >
        <NotesPanel nextNote={nextNote} previousNote={previosNote} index={notes.index} currentNote={notes.content[notes.index]}/>
        {/* <ValueSystemInput value={SI_TotalProducts}>total produtos</ValueSystemInput>
        <ValueSystemInput  value={SI_Difference}>diferença</ValueSystemInput> */}
        <div>
          <ValueSystemInput value={difference}>diferença</ValueSystemInput>
          <ValueSystemInput value={total}>tot. produtos</ValueSystemInput>
        </div>

        <SaleList sale={sales.content[sales.index]}/>
        
      </div>}

        <LinkButton leaving={eraseData} to={MyRoutes.HOME}>Voltar</LinkButton>

    </section>
    
  )
}   

export default AutomaticPage