import "./inlineArray.css"

const InlineArray = ({array, delimiter}: {array: string[], delimiter: string}) => { 
    return(
        <div className="inlineArray">
            {array.map((item, index) => {
                return(
                    <div className="inlineArray" key={index}>
                        <span className="item">{item}</span>
                        {index !== (array.length - 1) && <span >{delimiter}</span>}
                    </div>
                )
            })}
        </div>
    )
}
export default InlineArray