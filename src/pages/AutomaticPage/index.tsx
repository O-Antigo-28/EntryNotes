import { useParams } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import {readFile} from "fs/promises"
import { Profiler, useState } from "react"
import Button from "../../components/Button"
import NotesPanel from "../../components/NotesPanel"
import { Note } from "../../Note"
import { Indexer } from "../../Indexer"

import * as Papa from "papaparse"


abstract class NoteExtractor{
  private _notes: Note[]
  constructor(protected _table: Object[]){
    this._extractNotes(this._table)
  }

  protected abstract _extractNotes(_table: Object[]):  Note[]

  public get notes() {
    return this._notes
  }

  protected _appendNote(note: Note):void{
    this._notes.push(note)
  }
}


class CaixaNoteExtractor extends NoteExtractor{
  protected _extractNotes(table: Object[]): Note[] {
    throw new Error("Method not implemented.") 
  }
}

class RedeNoteExtractor extends NoteExtractor{
  protected _extractNotes(table: Object[]): Note[] {
    throw new Error("Me")
    table.map((rawNote)=> {
    })
  } 

}




async function CSVExtractor(path: string) :Promise<Object[]> {

  try{ 
    const data:string  = await readFile(path, { encoding: "utf8"})
    return Papa.parse(data, {header: true}).data
  }
  catch(err){
    console.error("erro na leitura do arquivo", err)
    return []
  } 
  
}





const AutomaticPage = () => {

  const {stockPath, redePath, caixaPath}  = useParams()

  const [notes, setNotes] = useState<Note[]>([])
      
  function addToStateList<T>(setStateList: React.Dispatch<React.SetStateAction<T[]>>, list: T[]){

  }

  CSVExtractor(decodeURIComponent(stockPath)).then((data: Object[] ) => {
    console.log(data)
    const salueDate = "data da venda"
    const salueClock = "hora da venda"
    const salueStatus = "status da venda"
    const originalSaleValue = "valor da venda original"
    const updatedSalueValue = "valor da venda atualizado"
    const modality = "modalidade"
    const flag = "bandeira"
    const installments = "número de parcelas"
  

    data.forEach((object: {
      "data da venda": string,
       "hora da venda": string,
       "status da venda": string,
       "valor da venda original": string,
       "número de parcelas": string
       "bandeira": string,
       "modalidade": string                
    })=>  { 
      
    }) 
  })
  
  return (
    <>

      <NotesPanel notes={new Indexer([new Note("CAIXA", "CREDITO", 43.20, new Date(), "MAESTRO")])}/>
      <p>{location.pathname}</p>
      <LinkButton to={MyRoutes.HOME}>Voltar para o inicio</LinkButton>
        
    
    </>
  )
}   

export default AutomaticPage