import { ChangeEvent, useId, useState } from "react"
import { Note } from "../../Note"
import Button from "../Button"
import NoteElement from "../NoteElement"
import { Indexer } from "../../Indexer"


const NotesPanel = ({notes}: { notes: Indexer<Note>}) => {

    const [currentNote, setCurrentNote] = useState(notes.current())
    const [rangeValue, setRangeValue] = useState(0)


    const rangeID = useId()

    function nextNote(): void { 
        setCurrentNote(notes.next())
        setRangeValue(notes.index)
    }
    function previousNote():void { 

        setCurrentNote(notes.previous())
        setRangeValue(notes.index)
    }

    function handleChangeRange(e: ChangeEvent<HTMLInputElement>){
        const index = parseInt(e.target.value)
        try{ 
            setCurrentNote(notes.search(index))
            setRangeValue(index)
        }
        catch(err){
            console.error(err)
        }
        finally{ 
            notes.index = index
        }

    }



    return(
        <>
            <NoteElement note={currentNote}/>
            <div>
                <label htmlFor={rangeID}></label>
                <input type="range" name="" value={rangeValue } min={0} onChange={handleChangeRange} max={notes.length -1 } id={rangeID} />
            </div>
            <div>
                <Button listener={previousNote}>Anterior</Button>
                <Button listener={nextNote}>Próximo</Button>
            </div>
        </>
    )
}

export default NotesPanel