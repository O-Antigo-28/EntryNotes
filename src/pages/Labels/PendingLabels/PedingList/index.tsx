import { PrintableLabel } from "./../../PrintableLabel"
import ItemPedingList from "./ItemPedingList"

function PendingList({ printableLabels }: { printableLabels: PrintableLabel[]} ) {

    
    return (
        <section>
            <h4>plaquinhas pendentes</h4>
            <table>
                <thead>
                    <th>codbar</th>
                    <th>descrição</th>
                    <th>valor atual</th>
                </thead>
                <tbody>
                    {printableLabels.length >= 0 && printableLabels.map((printablelabel) => {
                return <ItemPedingList printableLabel={printablelabel}/>
            })}
                </tbody>
            </table>
        </section>
    )
}

export default PendingList