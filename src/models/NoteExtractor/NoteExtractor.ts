import { Note, MachineName, Flag, NOTE_FLAGS, PAYMENT_METHODS, PaymentMethod} from "../../Note";
import { normalizeString } from "../../normalizeString";


export abstract class NoteExtractor{
  private _notes: Note[] = []
  constructor(protected _table: Object[]){
    this._extractNotes(this._table)
  }

  protected abstract _extractNotes(_table: Object[]): void

  public get notes() {
    return this._notes
  }
  
  protected _appendNote(note: Note):void{
    this._notes.push(note)
  }
  protected _extractDate(date:string, clock: string = "23:59:59"):Date{
    if (typeof clock != "string" || typeof date != "string"){
        return new Date(2020)
      }
    const [day, month, year] = date.split("/")
    const [hour, minutes, seconds] = clock.split(":")

    
    return new Date(parseInt(year), parseInt(month) -1 , parseInt(day), parseInt(hour), parseInt(minutes), parseInt(seconds) )
  }
  protected abstract _extractFlag(flagRaw:string): Flag

  protected _extractPaymentMethod(modality: string, installments: string): PaymentMethod{ 
    installments = installments.replace(/\D/g, '')
    
    
    let nInstallments = parseInt(installments)
    if(isNaN(nInstallments)  ) {
      nInstallments = 1
    }
    if(nInstallments >  1){ 
      return PAYMENT_METHODS.INSTALLMENT
    }

    modality = normalizeString(modality)

    switch (modality) {
      case PAYMENT_METHODS.CREDIT:
        return nInstallments> 1? PAYMENT_METHODS.INSTALLMENT : PAYMENT_METHODS.CREDIT
        
      case PAYMENT_METHODS.CASH_CREDIT:
        return PAYMENT_METHODS.CREDIT
    
      case PAYMENT_METHODS.DEBIT:
        return PAYMENT_METHODS.DEBIT
  
      case "VOUCHER":
        return PAYMENT_METHODS.TICKET
      
      default: 
        return PAYMENT_METHODS.NONEXISTENT

    }
  }

  protected _extractValue(rawValue:string): number{
    console.log(rawValue)
    if(typeof rawValue !== "string"){ 
      return 0
    }
    if(rawValue.indexOf("R$") !== -1){ 
      rawValue = rawValue.replace("R$", "")
    }
    rawValue = rawValue.replace(",", ".")
    const value = parseFloat(rawValue)
    return value
  }

}