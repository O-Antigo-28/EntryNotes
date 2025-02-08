import { usePrintableLabels, usePrintPrintableLabels} from "../../../atoms/PritableLabelsAtom"
import MeasureBox from "../../../components/MeasureBox";
import LabelElement from "../../../components/Label";
import { useRef , forwardRef} from "react";
import Button from 'react-bootstrap/Button'
import './printablelabellist.css'


const PrintableLabelList = forwardRef<HTMLUListElement>((props, ref) => {
    const printableLabels = usePrintableLabels()
    const hasPrintableLabels = printableLabels.length > 0;

    return(
        <div className="PrintableLabelList" style={{visibility: hasPrintableLabels? "visible" : "hidden"}}>
            <ul className="PrintableLabelList__List"  ref={ref}>
                {printableLabels.map((printableLabel) => {
                    return( 
                    <MeasureBox key={printableLabel.code} height={printableLabel.height}  width={printableLabel.width} lengthUnit={printableLabel.lengthUnit}>
                        <LabelElement {...printableLabel} key={printableLabel.code}/>
                    </MeasureBox>)
                })}
            </ul>

            
        </div>


    )
})
export default PrintableLabelList