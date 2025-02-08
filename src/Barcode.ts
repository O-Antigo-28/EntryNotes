import { BarcodeEAN13 } from "./TBarcodeEAN13";

export class Barcode{
    public static isEAN13Barcode(code: string):boolean{
        const verificationNumber = this._getVerificationNumberOfEAN13Barcode(code)
        const lastDigitOfCode = Number(code[code.length-1])
        return lastDigitOfCode === verificationNumber
    }  
    private static _getVerificationNumberOfEAN13Barcode(code: string): number{
        console.log("codigo passado: " + code )
        if(code.length === 13){
          code = code.substring(0, 12)
        }
        console.log("o codigo analisado: " + code)
        let sumOddNumbers = 0
        let sumEvenNumbers = 0
    
        for(let i = 1; i <= code.length; i++){
          const evenNumber = i % 2 === 0
    
          if(evenNumber){
            sumEvenNumbers += Number(code[i-1])
          }
          else{
            sumOddNumbers += Number(code[i-1])
              
          }
        }
    
        const portionEven = sumEvenNumbers * 3
        const resultBlender = sumOddNumbers + portionEven
    
        console.log(resultBlender)
        const remainder = resultBlender % 10
        let verificationNumber = 0
        if (remainder > 0){
          verificationNumber = Math.abs(remainder - 10)
        }
        return Math.abs(verificationNumber)
    
    
    }
    public static createBarcodeEAN13(value: string): BarcodeEAN13  {
        while (value.length < 13) {
            value = "0" + value
        }
        return value as BarcodeEAN13;
      }
}
