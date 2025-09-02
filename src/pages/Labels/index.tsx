
import Tabs from "react-bootstrap/Tabs"
import Tab  from "react-bootstrap/Tab"
import Title from "../../components/Title"
import QuickCreationLabels from "./QuickCreationLabels"
import PrintableLabelList from "./PrintableLabelList"
import LabelsGroupList from "./LabelsGroupList"
import ListPrintableLabelPanel from "../../components/ListPrintableLabelPanel"
import PendingLabels from "./PendingLabels"
import { useState, useEffect } from "react"
import { ipcRenderer } from "electron"
import { IGroup } from "./IGroup"
import { IGroups } from "./IGroups"
const Labels = () => { 
    
    const [groupsSystem, setGroupsSystem] = useState<IGroup[]>([])
    useEffect(() => {
        ipcRenderer.invoke('ipc-get-groups').then((groups: IGroups) => {
            setGroupsSystem(groups.system)
        })
    }, [])

    return (
        <>
            <Title>Labels</Title>
            <Tabs defaultActiveKey={"default-creation"}>
                <Tab title="Criação Padrão" eventKey={"default-creation"} >
                    <QuickCreationLabels></QuickCreationLabels>
                </Tab>
                <Tab title="Plaquinhas Pendentes" eventKey={"pending-creation"}>
                    <PendingLabels></PendingLabels>
                </Tab>
                <Tab title="Criação por Grupo" eventKey={"group-creation"}>
                    <LabelsGroupList groups={groupsSystem}></LabelsGroupList>
                </Tab>
            </Tabs>
            
            <div className="labels">
                <ListPrintableLabelPanel></ListPrintableLabelPanel>
            </div>



                

        </>
    )
}

export default Labels