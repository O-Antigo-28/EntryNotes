import { NoteExtractor } from "./NoteExtractor";
import { PaymentMethod, Flag, PAYMENT_METHODS, NOTE_FLAGS, MACHINE_NAMES, Note } from "../../Note";
import { normalizeString } from "../../normalizeString";
import { combineDateAndTime } from "./combineDateAndTime";
import { splitAndCheckLength } from "./splitAndCheckLength";
export class CaixaNoteExtractor extends NoteExtractor{

    public extractNotes(_table: Object[]): void {
      const APPROVED_SALE = "AUTORIZADA"

  
      _table.forEach((object: {
        "Data da venda": string,
        "Produto": string ;
        "Parcelado":string;
        "Bandeira":string;
        "Valor bruto":string;
        "Status":string;
        }) => {
          const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.Produto, object.Parcelado)
          const flag: Flag = this._extractFlag(object.Bandeira)
          
          const rawDataAndRawTime = object["Data da venda"]
          // estrutura é data e hora "dd/mm/aaaa às ho/hmm"
          const [rawDate, rawTime] =rawDataAndRawTime.split(" às ")

          let date: Date = this._extractDate(rawDate)
          const time: Date = this._extractClock(rawTime)
          const combinedDate = combineDateAndTime(date, time);

          const value = this._extractValue(object["Valor bruto"])

          this._appendNote(new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, combinedDate, flag ), object.Status)
      })
    }
    protected _extractDate(date:string):Date{
      if (!date){
        throw new Error("Date incorreta")
      }
      const dateDelimiter = "/"
      const lengthOfFormatDate = 3;
      let [day, month, year] = splitAndCheckLength(date, dateDelimiter, lengthOfFormatDate )
      
      return new Date(parseInt(year), parseInt(month) -1 , parseInt(day) )
    }






}