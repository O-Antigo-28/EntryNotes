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
        if(!PrintableLabel)
            return false

        const isValidMeasure =  PrintableLabel.lengthUnit !== undefined && PrintableLabel.width  !== undefined && PrintableLabel.height !== undefined
        const isValidLabel = PrintableLabel.code !== undefined && PrintableLabel.description  !== undefined && PrintableLabel.unitOfMeasure !== undefined && PrintableLabel.valueProduct !== undefined

        return isValidLabel && isValidMeasure
    }
}
