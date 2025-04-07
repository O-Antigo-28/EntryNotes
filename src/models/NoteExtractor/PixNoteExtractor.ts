import { NoteExtractor } from "./NoteExtractor";
import { IPixNote } from "./IPixNote";
import { splitAndCheckLength } from "./splitAndCheckLength";
import { MACHINE_NAMES, PAYMENT_METHODS, Note, NOTE_FLAGS } from "../../Note";
export class PixNoteExtractor extends NoteExtractor{

    public extractNotes(_table: Object[]): void {
        const machine_name = MACHINE_NAMES.CAIXA
        const paymentMethod = PAYMENT_METHODS.PIX
        const flag = NOTE_FLAGS.NONEXISTENT
        _table.forEach((rawNote: IPixNote) => {
            const value = this._extractValue(rawNote["Valor bruto"])
            const date = this._extractDate(rawNote["Data da venda"])
            const note = new Note(machine_name, paymentMethod, value, date, flag )
            this._appendNote(note, rawNote.Status)
        })
    }
    protected _extractDate(date: string): Date {
        if(!date){
            throw new Error("Não foi informada a data")
        }
        const dateDelimiter: string = "/"; 
        const lengthOfFormat: number = 3; 
        const [day, month, year] = splitAndCheckLength(date, dateDelimiter, lengthOfFormat);
        const extractedDate = new Date(parseInt(year), parseInt(month) -1, parseInt(day))
        return extractedDate;
    }
    
    
}