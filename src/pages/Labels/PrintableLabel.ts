import { LengthUnit } from "../../components/MeasureBox/TLengthUnit"
import { UnitOfMeasure } from "./../../components/Label/TUnitOfMeasure"
import { BarcodeEAN13 } from "../../components/Label/TBarcodeEAN13"
import { ILabel } from "../../components/Label/ILabel"
import { IMeasure } from "../../components/MeasureBox/IMeasure"

export class PrintableLabel implements ILabel, IMeasure{
    constructor(
        public code: BarcodeEAN13, 
        public description: string, 
        public unitOfMeasure: UnitOfMeasure,
        public valueProduct: number, 
        public width: number, 
        public height: number, 
        public lengthUnit: LengthUnit,
        public promotionalValue?: number 
    ){

    }

    public static isValid(PrintableLabel: PrintableLabel): boolean{
        try{
            if(!PrintableLabel)
                throw new Error("PrintableLabel indefinida")

            const isValidMeasure =  PrintableLabel.lengthUnit !== undefined && PrintableLabel.width  !== undefined && PrintableLabel.height !== undefined

            if (!isValidMeasure){
                throw new Error("As medidas de PrintableLabel são invalidas")
            }
            const isValidLabel = PrintableLabel.code !== undefined && PrintableLabel.description  !== undefined && PrintableLabel.unitOfMeasure !== undefined && PrintableLabel.valueProduct !== undefined
            if (!isValidLabel){
                throw new Error("Os dados passados para Label não estão corretos")
            }
            let isValidPromotion: boolean = true    
            if (PrintableLabel.promotionalValue)
                isValidPromotion = PrintableLabel.valueProduct > PrintableLabel.promotionalValue;

            if (!isValidPromotion)
                throw new Error("O valor do produto sem a promoção está mais barato que o valor promocional")

     

            return true
        }
        catch(e){
            return false
        }
        


    }
}
