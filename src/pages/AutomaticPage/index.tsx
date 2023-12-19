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
import SalueList from "../../components/SalueList"
import {Product} from "../../Product"
import {Sale} from "../../Sale"
const CAIXA_FILE_ENCODING = "win1252"

function generateSales(notes: Note[], products: Product[]): Sale[][]{ 
  return []
}


const AutomaticPage = () => {

  const {stockPath, redePath, caixaPath}  = useParams()

  const [notes, setNotes] = useState<Indexer<Note>>(new Indexer<Note>([]))
  const [currentNote, setCurrentNote] = useState<Note>(notes.current())
  const [rangeValue, setRangeValue] = useState(0)

  const [SI_TotalProducts, setSI_TotalProducts]= useState(0)
  const [SI_Difference, setSI_Difference] = useState(0) 

  const [productsSold, setProductsSold] = useState([])

  

  function handleKeyDown(){ 

  }

  function handleKeyUp(){ 

  }
  function nextNote(){ 
    setCurrentNote(notes.next())
    setRangeValue(notes.index)
  }
  function previosNote(){ 
    setCurrentNote(notes.previous())
    setRangeValue(notes.index)

  }


  useEffect(() => {
    const fetchData = async () => {
      try {

        // REDE
        const rawRedeData = await CSVExtractor(decodeURIComponent(redePath));
        const redeExtractor = new RedeNoteExtractor(rawRedeData);
        console.log(redeExtractor.notes)
        addToStateIndexer<Note>(setNotes, notes, redeExtractor.notes)

        // CAIXA
        const rawCaixaData = await(CSVExtractor(decodeURIComponent(caixaPath), CAIXA_FILE_ENCODING))
        const caixaExtractor = new CaixaNoteExtractor(rawCaixaData)
        console.log(caixaExtractor.notes)
        addToStateIndexer<Note>(setNotes, notes, caixaExtractor.notes)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [stockPath]); 
  function addToStateIndexer<T>(setStateList: React.Dispatch<React.SetStateAction<Indexer<T>>>, content: Indexer<T>, addedList: T[]): void{
    setStateList((oldIndexer: Indexer<T>)=>{ 
      if(oldIndexer.content.length === 0){
        return new Indexer<T>(addedList)
      }
      
      const uptdateIndexer =  [...oldIndexer.content].concat(addedList)

      return new Indexer<T>(uptdateIndexer)
    })

  }


  
  return (
    <section onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>

      {notes.length > 0 && <NotesPanel nextNote={nextNote} previousNote={previosNote} index={notes.index} currentNote={currentNote}/>}
      <p>{location.pathname}</p>
      <ValueSystemInput value={SI_TotalProducts}>total produtos</ValueSystemInput>
      <ValueSystemInput  value={SI_Difference}>diferença</ValueSystemInput>

      <SalueList salues={productsSold}/>
      


    </section>
  )
}   

export default AutomaticPage