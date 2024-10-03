import { NoteExtractor } from "./NoteExtractor";
import { PaymentMethod, Flag, PAYMENT_METHODS, NOTE_FLAGS, MACHINE_NAMES, Note } from "../../Note";
import { normalizeString } from "../../normalizeString";

export class CaixaNoteExtractor extends NoteExtractor{
    protected _dataIsCurrent(_table: Object[]): boolean {

      return true
    }
    protected _extractDate(date:string = "1/1/1999", ):Date{
      if (typeof date != "string"){
          return new Date(2020)
        }
  
  
      let [day, month, year] = date.split("/")
      
  
      if(year.length > 4){
        year = year.slice(0, 4)
      }
      
    
  
      
      return new Date(parseInt(year), parseInt(month) -1 , parseInt(day) )
    }
  
    protected _extractClock(clock: string): Date {
      const time:  Date = new Date()
      const [hours, minutes] = clock.split("h")
      time.setHours(parseInt(hours), parseInt(minutes))
      return time

    }

    protected _oldNotesMethod(_table: Object[]): void {
      const APPROVED_SALE = "APROVADA"
      _table.forEach((object: { 
          "Data da venda": string,
          "Hora da venda": string,
          "Produto":string,
          "Parcelas":string,
          "Bandeira":string,
          "Status":string,
          "Valor bruto":string, 
      })=> { 
          if(object["Data da venda"].length > 3){ 

              const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.Produto, object.Parcelas)
              const flag: Flag = this._extractFlag(object.Bandeira)
              const date: Date = this._extractDate(object["Data da venda"])
              const value = this._extractValue(object["Valor bruto"])
              
              if(normalizeString(object.Status) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
                this._appendNote(new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, date, flag ))
              }   
          }

      }) 
    }


    protected _newNotesMethod(_table: Object[]): void{
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
          console.log("data da venda ", rawDataAndRawTime)
          // estrutura é data e hora "dd/mm/aaaa às ho/hmm"
          const [rawDate, rawTime] =rawDataAndRawTime.split(" às ")
          console.log(`rawDate ${rawDate} / rawTime ${rawTime}`)

          let date: Date = this._extractDate(rawDate)
          const time: Date = this._extractClock(rawTime)
          const value = this._extractValue(object["Valor bruto"])
          date.setHours(time.getHours(), time.getMinutes())
          if(normalizeString(object.Status) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
            this._appendNote(new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, date, flag ))
          } 
          
      })
    }

    protected _extractFlag(flagRaw:string): Flag{

        flagRaw = normalizeString(flagRaw)
    
        switch (flagRaw) {
          case NOTE_FLAGS.ALELO:
            return NOTE_FLAGS.ALELO
    
          case "ELO FULL":
          case NOTE_FLAGS.ELO:
            return NOTE_FLAGS.ELO
    
          case NOTE_FLAGS.HIPERCARD:
            return NOTE_FLAGS.HIPERCARD
    
          case "MDS":
          case NOTE_FLAGS.MAESTRO:
            return NOTE_FLAGS.MAESTRO
    
          case NOTE_FLAGS.VISA:
            return NOTE_FLAGS.VISA
    
          case NOTE_FLAGS.MASTERCARD:
            return NOTE_FLAGS.MASTERCARD
    
    
    
          default:
            return NOTE_FLAGS.NONEXISTENT
        }
      }
    
}