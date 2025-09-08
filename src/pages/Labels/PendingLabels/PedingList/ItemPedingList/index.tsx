import { PrintableLabel } from "./../../../PrintableLabel"

const ItemPedingList = ({printableLabel}:{printableLabel: PrintableLabel}) => {
    const {code, description, value} = printableLabel
    return (
        <tr key={code}>
            <td>{code}</td>
            <td>{description}</td>
            <td>{value}</td>
        </tr>
    )
}

export default ItemPedingList