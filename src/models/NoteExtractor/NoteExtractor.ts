import { Note, MachineName, Flag, NOTE_FLAGS, PAYMENT_METHODS, PaymentMethod} from "../../Note";
import { normalizeString } from "../../normalizeString";
import { splitAndCheckLength } from "./splitAndCheckLength";


import { extractValue } from "../../extractValue";

export abstract class NoteExtractor{
  private _notes: Note[] = []
  constructor(){
    

  }
  public abstract extractNotes(_table: Object[]): void
  protected checkExistenceOfRawTable(_table: Object[]): boolean{
    try{
      if(!_table)
        throw new Error("O objeto que foi passado dos dados brutos do extrator de historico de notas é invalido");
  
      if(_table.length <= 0)
        throw new Error("Não existe nenhum dado passado para o extrator caixa");
      return true
    }
    catch(e){
      console.error("A tabela é nula ou não possui itens")
      return false
    }
  }


  protected _isValidNote(status: string, note: Note){
    const APPROVED_SALE = "APROVADA"
    const status_sale = normalizeString(status)
    try{
      if(status_sale !== APPROVED_SALE){
        throw new Error("A Nota não foi aprovada")
      }

      if(note.flag === NOTE_FLAGS.NONEXISTENT){
        throw new Error("A Nota não tem bandeira")
      }

      if(note.paymentMethod === PAYMENT_METHODS.NONEXISTENT){
        throw new Error("A Nota não tem método de pagamento")
      }      
      return true
    }
    catch(e){
      console.error(e)
      return false
    }
  }

  public get notes() {
    return this._notes
  }
  
  protected _appendNote(note: Note):void{
    this._notes.push(note)
  }
  protected abstract _extractDate(date:string):Date

  protected _extractClock(clock: string): Date{
    if(!clock){
      throw new Error("Não foi informad o horário")
  }
    const clockDelimiter = ":"
    const lengthOfFormat = 3; // [hh, mm, ss]
    const [hour, min, sec] = splitAndCheckLength(clock, clockDelimiter, lengthOfFormat)
    const extractedClock = new Date()
    extractedClock.setHours(parseInt(hour), parseInt(min), parseInt(sec), 0 )
    return extractedClock;
  }

  protected _extractFlag(flagRaw:string): Flag{
    flagRaw = normalizeString(flagRaw)
    
    switch (flagRaw) {
      case "VR":
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