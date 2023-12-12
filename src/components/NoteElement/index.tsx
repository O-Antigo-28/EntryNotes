import { Note } from "../../Note"

import InlineArray from "../InlineArray"
import "./noteElement.css"

const NoteElement = ({note}: {note: Note}) => { 

    const day =   note.date.getDate()
    const month = note.date.getMonth() + 1
    const year =  note.date.getFullYear() 
    
    const date = [day, month, year]

    const hour =    note.date.getHours()
    const minutes = note.date.getMinutes()
    const seconds = note.date.getSeconds()

    const clock = [hour, minutes, seconds]

    return(
        <section className="noteElement">
            <div className="noteElementContainer">
                <div className="elementSeparator">
                    <span className="machineName">{note.machineName}</span>
                    <div className="paymentMethod">
                        <span >{note.flag}</span>
                        <span> {note.paymentMethod}</span>
                    </div>
                </div>
                <div className="elementSeparator">
                    <span>valor</span>
                    <span className="noteValue">{note.value.toFixed(2)}</span>
                </div>
                <section className="elementSeparator noteTime">
                    <InlineArray delimiter="/" array={date}/>
                    <InlineArray delimiter=":" array={clock}/>
                </section>
            </div>
        </section>
    )
}
export default NoteElement