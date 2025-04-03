import { PrintableLabel } from "../../pages/Labels/PrintableLabel"
import { UnitOfMeasure } from "../../components/Label/TUnitOfMeasure"
export type TModelLabel = Pick<PrintableLabel, "description"> & {barcode: string, comercial_unit_measure: UnitOfMeasure}
