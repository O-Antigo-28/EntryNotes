import { useEffect, useState} from "react"
import { ipcRenderer } from "electron"
import "./labelgrouplist.css"
import { IGroup } from "./../../../IGroup"
import Groups from "./Groups"
interface IGroups {
    system: IGroup[]
}



const LabelsGroupList = () => {
    const [groupsSystem, setGroupsSystem] = useState<IGroup[]>([])
    useEffect(() => {
        ipcRenderer.invoke('ipc-get-groups').then((groups: IGroups) => {
            setGroupsSystem(groups.system)
        })
    }, [])

    return (
        <div className="LabelGroupList">
            <section className="GroupList__container">
                <h2>seus grupos</h2>
                <div className="GroupList__list">
                    <p>Nenhum grupo cadastrado</p>
                </div>
            </section>
            <section className="GroupList__container">
                <h2>Grupos do Sistema</h2>
                <div className="GroupList__list">
                    {groupsSystem.length ==0 && <p>Nenhum grupo cadastrado</p>}
                    {groupsSystem.length >= 1 && <Groups groups={groupsSystem}/>}
                </div>
            </section>
        </div>

    )
}
export default LabelsGroupList