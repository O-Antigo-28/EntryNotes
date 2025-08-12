import { IGroup } from "../../../../IGroup"
import "./group.css"
interface IGroupElement extends React.HTMLAttributes<HTMLDivElement>{
    group: IGroup
}
const Group:React.FC<IGroupElement> = ({group, ...props}) => { 

    return (<div className="Group"  {...props}> 
        <p>{group.description}</p>
    </div>)
}

export default Group