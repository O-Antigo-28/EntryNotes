import { MachineName,Flag, MACHINE_NAMES, NOTE_FLAGS, PaymentMethod, PAYMENT_METHODS,Note } from "../../Note"
import { normalizeString } from "../../normalizeString"
import { NoteExtractor } from "./NoteExtractor"
function obterDataAtualFormatada() {
  const data = new Date();

  const dia = adicionaZero(data.getDate());
  const mes = adicionaZero(data.getMonth() + 1); // Os meses começam do zero, então é necessário adicionar 1
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

function adicionaZero(numero: number) {
  return numero < 10 ? `0${numero}` : numero;
}
interface ISpreadsheetRedeOld{
  "data da venda": string,
  "hora da venda": string,
  "status da venda": string,
  "valor da venda original": string,
  "número de parcelas": string
  "bandeira": string,
  "modalidade": string      
}
interface ISpreadsheetRedeNew{
  "hora da venda":string,
  "status da venda":string,
  "valor da venda":string,
  "modalidade":string,
  "tipo":string,
  "número de parcelas":string,
  "bandeira":string,
}

export class RedeNoteExtractor extends NoteExtractor{
    protected _oldNotesMethod(_table: Object[]): void {
      const APPROVED_SALE = "APROVADA"
      _table.forEach((object: ISpreadsheetRedeOld               
        ) =>  {
        if(object["data da venda"].length > 3){ 
            const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
            const flag: Flag = this._extractFlag(object.bandeira)
            const date: Date = this._extractDate(object["data da venda"])
            const value = this._extractValue(object["valor da venda original"])
            
            if(normalizeString(object["status da venda"]) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
              this._appendNote(new Note(MACHINE_NAMES.REDE, paymentMethod, value, date, flag ))
            }   
        }

      }) 
    }
    protected _newNotesMethod(_table: Object[]): void {
      const APPROVED_SALE = "APROVADA"
      _table.forEach((object: ISpreadsheetRedeNew) => { 
        const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
        const flag: Flag = this._extractFlag(object.bandeira)
        const date: Date = this._extractDate(obterDataAtualFormatada())
        const value = this._extractValue(object["valor da venda"])
        
        if(normalizeString(object["status da venda"]) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
          this._appendNote(new Note(MACHINE_NAMES.REDE, paymentMethod, value, date, flag ))
        }   
      })
    }
    protected _dataIsCurrent(_table: Object[]): boolean {
      if(_table)
      if(_table.length > 0){
        return !_table[0].hasOwnProperty("data da venda")
      }

    }
    protected _extractDate(date: string): Date {
      if (typeof date != "string"){
        return new Date(2020)
      }


    let [day, month, year] = date.split("/")
    
  

    if(year.length > 4){
      year = year.slice(0, 4)
    }
    
    const [hour, minutes, seconds] = this._extractClock("435")

    
    return new Date(parseInt(year), parseInt(month) -1 , parseInt(day), parseInt(hour), parseInt(minutes), parseInt(seconds) )
    }
    protected _extractClock(clock: string): string[] {
      return ["algo", "alfo", "algo"]
    } 
  
  
    protected _extractFlag(flagRaw:string): Flag{

      flagRaw = normalizeString(flagRaw)
  
      switch (flagRaw) {
        case NOTE_FLAGS.ALELO:
        case "VR":
          return NOTE_FLAGS.ALELO
  
        case NOTE_FLAGS.ELO:
          return NOTE_FLAGS.ELO
  
        case NOTE_FLAGS.HIPERCARD:
          return NOTE_FLAGS.HIPERCARD
  
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