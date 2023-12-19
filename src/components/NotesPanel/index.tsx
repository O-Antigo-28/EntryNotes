import { ChangeEvent, useId, useState } from "react"
import { Note } from "../../Note"
import Button from "../Button"
import NoteElement from "../NoteElement"
import { Indexer } from "../../Indexer"


const NotesPanel = ({currentNote, index, nextNote, previousNote}: { currentNote: Note, index : number,  nextNote(): void, previousNote(): void} ) => {

    const rangeID = useId()

    function handleNextNote(): void {
        nextNote()
    }
    function handlePreviousNote():void { 
        previousNote()
    }

    // function handleChangeRange(e: ChangeEvent<HTMLInputElement>){
    //     const index = parseInt(e.target.value)
    //     try{ 
    //         setCurrentNote(notes.search(index))
    //         setRangeValue(index)
    //     }
    //     catch(err){
    //         console.error(err)
    //     }
    //     finally{ 
    //         notes.index = index
    //     }

    // }



    return(
        <section>
            <NoteElement note={currentNote}/>

            <div>
                <label htmlFor={rangeID}></label>
                {/* <input type="range" name="" value={rangeValue } min={0} onChange={handleChangeRange} max={notes.length -1 } id={rangeID} /> */}
            </div>
            <div>
                <Button listener={handlePreviousNote}>Anterior</Button>
                <Button listener={handleNextNote}>Próximo</Button>
            </div>
        </section>
    )
}

export default NotesPanel