import { atom, useAtom, useAtomValue } from 'jotai'
import { PrintableLabel } from '../pages/Labels/PrintableLabel'

const PrintableLabelsAtom = atom<PrintableLabel[]>([])

function hasCreatedLabel(labels: PrintableLabel[],label: PrintableLabel){
    return labels.map((printableLabel) => printableLabel.code).indexOf(label.code) !== -1
}

export enum PrintableLabelHookResponses{
    OK =1,
    ERROR=2, 
    NO_DATA=3, 
    INVALID_LABEL=4,
    HAS_CREATED=5, 
    NOT_FOUND=6
}
export const usePrintableLabels = () => { 
    return useAtomValue(PrintableLabelsAtom)
}
export const useAddPrintableLabel = () => {
    const [printableLabels, setPrintableLabels] = useAtom(PrintableLabelsAtom)


    return (data: PrintableLabel): PrintableLabelHookResponses =>{
        if (!data)
            return PrintableLabelHookResponses.NO_DATA

        if(!PrintableLabel.isValid(data)){
            return PrintableLabelHookResponses.INVALID_LABEL
        }

        if(hasCreatedLabel(printableLabels, data)){
            return PrintableLabelHookResponses.HAS_CREATED
        }


        setPrintableLabels((printableList) => [...printableList, data])
        return PrintableLabelHookResponses.OK
    }
}
export const useUpdatePrintableLabel = () => { 
    const [printableLabels, setPrintableLabels] = useAtom(PrintableLabelsAtom)
    return (currentLabel: PrintableLabel | null) => {
        if(!currentLabel)
            return PrintableLabelHookResponses.NO_DATA
        const printableLabelToUpdate = printableLabels.find((printableLabel) => (printableLabel.code === currentLabel.code))
        if(!printableLabelToUpdate)
            return PrintableLabelHookResponses.NOT_FOUND

        Object.assign(printableLabelToUpdate, currentLabel)
        setPrintableLabels((old) => (old))
        
    }
}
