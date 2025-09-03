
import { IGroup } from '../IGroup';
import "./pedinglabels.css"
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useAddPrintableLabel } from './../../../atoms/PritableLabelsAtom';
import { PrintableLabel } from '../PrintableLabel';
import PendingList from './PedingList';


const PendingLabels = ({groupsSystem}:{groupsSystem: IGroup[]}) => {
    const[ pedingPrintableLabels, setPedingPrintableLabels] =useState<PrintableLabel[]>([])
    const addPrintableLabel = useAddPrintableLabel()
    function addAllPrintableLabels(e: React.MouseEvent<HTMLButtonElement>){
        pedingPrintableLabels.forEach((ppl) => {
            addPrintableLabel(ppl)

        })
    }
    useEffect(() => {
        ipcRenderer.invoke("ipc-get-peding-labels").then((pedingPrintableLabels: PrintableLabel[])=>{
            setPedingPrintableLabels(pedingPrintableLabels)
        })
    }, [])
    return (
        <div>
            <h2>Plaquinhas Pendentes</h2>
            <PendingList  printableLabels={pedingPrintableLabels}/>
            <div>
                <button onClick={addAllPrintableLabels}>adicionar todas plaquinhas</button>
                <button>Todas plaquinhas ja estão impressas</button>
            </div>
        </div>
    )
}

export default PendingLabels;