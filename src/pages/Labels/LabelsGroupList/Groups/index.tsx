import { IGroup } from "../../../../IGroup";
import Group from "../Group";
import { useAddPrintablelabelByGroup } from "../../../../atoms/PritableLabelsAtom";
const Groups = ({groups}:{groups: IGroup[]}) => { 
    const addPrintableLabelsByGroup = useAddPrintablelabelByGroup()
    groups.sort((a, b) => {
        if (a.description < b.description){
            return -1
        }
        if(a.description > b.description){
            return 1;
        }
        return 0;
    })
    return (<div> 
        {groups.map((group:IGroup) =>   <Group group={group} onClick={() => {addPrintableLabelsByGroup(group.code)}}/>)}
    </div>)
}
export default Groups