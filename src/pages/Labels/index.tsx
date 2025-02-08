
import Tabs from "react-bootstrap/Tabs"
import Tab  from "react-bootstrap/Tab"
import Title from "../../components/Title"
import QuickCreationLabels from "./QuickCreationLabels"
import PrintableLabelList from "./PrintableLabelList"
import LabelsGroupList from "./LabelsGroupList"
import ListPrintableLabelPanel from "../../components/ListPrintableLabelPanel"

const Labels = () => { 
    


    return (
        <>
            <Title>Labels</Title>
            <Tabs defaultActiveKey={"default-creation"}>
                <Tab title="Criação Padrão" eventKey={"default-creation"} >
                    <QuickCreationLabels></QuickCreationLabels>
                </Tab>
                <Tab title="Criação por Grupo" eventKey={"group-creation"}>
                    <LabelsGroupList></LabelsGroupList>
                </Tab>
            </Tabs>
            
            <div className="labels">
                <ListPrintableLabelPanel></ListPrintableLabelPanel>
            </div>



                

        </>
    )
}

export default Labels