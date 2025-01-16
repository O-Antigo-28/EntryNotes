import { Flag, PaymentMethod, PAYMENT_METHODS, NOTE_FLAGS, MACHINE_NAMES, Note } from "./../../Note";
import { normalizeString } from "./../../normalizeString";
import { NoteExtractor } from "./NoteExtractor";
import { combineDateAndTime } from "./combineDateAndTime";
import { splitAndCheckLength } from "./splitAndCheckLength";
interface ISpreadsheetRedeOld{
    "data da venda": string,
    "hora da venda": string,
    "status da venda": string,
    "valor da venda original": string,
    "número de parcelas": string
    "bandeira": string,
    "modalidade": string      
  }
export class RedeNoteExtractorOld extends NoteExtractor{
    public extractNotes(_table: Object[]): void {
        const APPROVED_SALE = "APROVADA"
        _table.forEach((object: ISpreadsheetRedeOld               
        ) =>  {
        if(object["data da venda"].length > 3){ 
            const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
            const flag: Flag = this._extractFlag(object.bandeira)
            const date: Date = this._extractDate(object["data da venda"])
            const clock: Date = this._extractClock(object["hora da venda"])
            const combinedDateAndTime = combineDateAndTime(date, clock)
            const value = this._extractValue(object["valor da venda original"])
            const note = new Note(MACHINE_NAMES.REDE, paymentMethod, value, combinedDateAndTime, flag )
            if(this._isValidNote(object["status da venda"], note)){
                this._appendNote(note)
            }

        }

        }) 
    
    }
    protected _extractDate(date: string): Date {
        if(!date){
            throw new Error("Não foi possivel obter a data, pois o formato dos dados brutos não está como o esperado")
        }
        const dateDelimiter: string = "/"; 
        const lengthOfFormat: number = 3; 
        const [day, month, year] = splitAndCheckLength(date, dateDelimiter, lengthOfFormat);
        const extractedDate = new Date(parseInt(year), parseInt(month) -1, parseInt(day))
        return extractedDate;
    }


}