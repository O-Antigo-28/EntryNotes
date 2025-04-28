import { Note, PAYMENT_METHODS } from "../../Note"

import InlineArray from "../InlineArray"
import "./noteElement.css"
function addZero(_number: number): string {
    return _number < 10 ? `0${_number}` : _number.toString();
  }

const NoteElement = ({note}: {note: Note}) => { 

    const day =   note.date.getDate()
    const month = note.date.getMonth() + 1
    const year =  note.date.getFullYear() 
    
    const date:string[] = [day.toString(), month.toString(), year.toString()]

    const hour =    note.date.getHours()
    const minutes = note.date.getMinutes()
    const seconds = note.date.getSeconds()

    const clock: string[] = [addZero(hour), addZero(minutes), addZero(seconds)]

    let headerNote = (               
        <div className="elementSeparator">
            <span className="machineName">{note.machineName}</span>
            <div className="paymentMethod">
                <span >{note.flag}</span>
                <span> {note.paymentMethod}</span>
            </div>
        </div>
    )

    if(!note) return <></>
    if(note.paymentMethod === PAYMENT_METHODS.PIX){
        headerNote = (<div className="elementCenter">
            <span className="paymentMethod">{note.paymentMethod}</span>
        </div>)
    }
    return(
        <section className="noteElement">
            <div className="noteElementContainer">
                {headerNote}
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