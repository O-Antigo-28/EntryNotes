import { Flag, PaymentMethod, NOTE_FLAGS, Note, PAYMENT_METHODS, MACHINE_NAMES } from "./../../Note";
import { NoteExtractor } from "./NoteExtractor";
import { normalizeString } from "../../normalizeString";
import { combineDateAndTime } from "./combineDateAndTime";
import { splitAndCheckLength } from "./splitAndCheckLength";
import { IDetailedCaixaNote } from "./IDetailedCaixaNote";
import { ISimplifiedCaixaNote } from "./ISimplifiedCaixaNote";
export class CaixaNoteExtractorOld extends NoteExtractor{

    constructor(){
        super()
    }
    isSimplifiedNote(note: Object): boolean{
      return !(note.hasOwnProperty("Hora da venda"))
    }
    private _extractNotesDetailed(_table: IDetailedCaixaNote[]){
      try{
        _table.forEach(rawNote => {
          if(rawNote["Data da venda"].length < 3){
            throw new Error("Nessa nota não possui dados")
          }
          
          const paymentMethod: PaymentMethod = this._extractPaymentMethod(rawNote.Produto, rawNote.Parcelas)
          const flag: Flag = this._extractFlag(rawNote.Bandeira)
          const date: Date = this._extractDate(rawNote["Data da venda"])
          const time: Date = this._extractClock(rawNote["Hora da venda"])
          const combinedDateAndTime = combineDateAndTime(date, time);
          const value = this._extractValue(rawNote["Valor bruto da transação"])
                    
          const note = new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, combinedDateAndTime, flag )
  
          if (this._isValidNote(rawNote.Status, note)){
            this._appendNote(note)
          }
        });
      }catch(e){
        console.error(e)
      }

    }
    private _extractNotesSimplified(_table: ISimplifiedCaixaNote[]){
      _table.forEach(rawNote => {
        if(rawNote["Data da venda"].length > 3){ 
        
          const paymentMethod: PaymentMethod = this._extractPaymentMethod(rawNote.Produto, rawNote.Parcelas)
          const flag: Flag = this._extractFlag(rawNote.Bandeira)
          const [rawDate, rawTime] = rawNote["Data da venda"].split(" às ");
          const date: Date = this._extractDate(rawDate)
          const time: Date = this._extractClock(rawTime)
          const combinedDateAndTime = combineDateAndTime(date, time);
          const value = this._extractValue(rawNote["Valor original da venda"])
    
          const note = new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, combinedDateAndTime, flag )
          if(this._isValidNote(rawNote.Status, note))
            this._appendNote(note)

      }
      });
    }
    public extractNotes(_table: Object[]): void {
      try{
        if (!this.checkExistenceOfRawTable(_table))
          throw new Error("A tabela não existe")
        if (this.isSimplifiedNote(_table[0])){
          this._extractNotesSimplified(_table as ISimplifiedCaixaNote[])
        }
        else{
          this._extractNotesDetailed(_table as IDetailedCaixaNote[])
        }
      }
      catch(e){
        console.error("Não foi possivel extrair as notas", e)
      }


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

