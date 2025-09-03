import { IGroup } from "../../../../IGroup"
import { useId } from "react"
import "./group.css"
interface IGroupElement extends React.HTMLAttributes<HTMLDivElement>{
    group: IGroup
}
const Group:React.FC<IGroupElement> = ({group, ...props}) => { 
    const id = useId()
    return (
        <div className="GroupFilters" > 
            <label htmlFor={id}>
                {group.description}
                <input id={id} type="checkbox" value={group.code}  {...props}/>
            </label>
        </div>
    )
}

export default Group