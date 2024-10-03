import { Note, MachineName, Flag, NOTE_FLAGS, PAYMENT_METHODS, PaymentMethod} from "../../Note";
import { normalizeString } from "../../normalizeString";



import { extractValue } from "../../extractValue";

export abstract class NoteExtractor{
  private _notes: Note[] = []
  constructor(protected _table: Object[]){

    this._extractNotes(this._table)
  }
  protected abstract _oldNotesMethod(_table: Object[]): void
  protected abstract _newNotesMethod(_table: Object[]):void
  protected _extractNotes(_table: Object[]){
    if (this._dataIsCurrent(_table)){
      // console.log("é atual", _table)
      this._newNotesMethod(_table)
    }
    else{
      // console.log("não é atual",  _table)
      this._oldNotesMethod(_table)
    }
  }


  protected abstract _dataIsCurrent(_table: Object[]): boolean

  public get notes() {
    return this._notes
  }
  
  protected _appendNote(note: Note):void{
    this._notes.push(note)
  }
  protected abstract _extractDate(date:string):Date
  protected abstract _extractClock(clock: string): Date

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
    return extractValue(rawValue)
  }


}