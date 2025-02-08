import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { PrintableLabel } from '../pages/Labels/PrintableLabel'
import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { ContentNode } from 'react-to-print/lib/types/ContentNode'


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
export const usePrintPrintableLabels = (refContainer: React.RefObject<ContentNode | undefined>) => {
    const [printabelLabels, setPrintableLabels] = useAtom(PrintableLabelsAtom)
    const reactToPrintFn = useReactToPrint({contentRef: refContainer, onAfterPrint() {
        setPrintableLabels([])
    },}) 
    return():PrintableLabelHookResponses => {
        if(printabelLabels.length === 0){
            return PrintableLabelHookResponses.NO_DATA
        }
        reactToPrintFn()
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
        setPrintableLabels((old) => [...old])
        return PrintableLabelHookResponses.OK
        
    }
}
export const useCountPrintableLabel = () => {
    const printableLabelList = useAtomValue(PrintableLabelsAtom)
    return printableLabelList.length
}