import "./labelgrouplist.css"
import { IGroup } from "./../../../IGroup"
import Groups from "./Groups"



const LabelsGroupList = ({groups}:{groups: IGroup[]}) => {

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
                    {groups.length ==0 && <p>Nenhum grupo cadastrado</p>}
                    {groups.length >= 1 && <Groups groups={groups}/>}
                </div>
            </section>
        </div>

    )
}
export default LabelsGroupList