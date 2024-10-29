import "./manual.css"
import { useEffect, useState } from "react"
import LinkButton from   "../../components/LinkButton"
import Button from "react-bootstrap/Button"
import { MyRoutes } from "../../MyRoutes"
import Header from "../../components/Header"
import PriceInput from "../../components/PriceInput"
import Stack  from "react-bootstrap/Stack"
import redoIcon from "../../assets/icons/ManualPage/redoIcon.svg"
import undoIcon from "../../assets/icons/ManualPage/undoIcon.svg"
import ValueSystemInput from "../../components/ValueSystemInput"
import SaleList from "../../components/SaleList"
import { CSVExtractor } from "../../CSVExtractor"
import { useStockFileIdentifier } from "../../atoms/fileIdentifiers"
import { ProductExtractor } from "../../ProductExtrator"
import { SearchAlgorithm } from "../../SearchAlgorithm"
import { Sale } from "../../Sale"

const ManualPage = () => { 

    let searchAlgorithm: SearchAlgorithm = null; 
    

    const stockFileID = useStockFileIdentifier()

    const [noteValue, setNoteValue] = useState("0.00")
    const [resultValue, setResultValue] = useState(0.00)
    const [totalProducts, setTotalProducts] = useState(0.00)



    useEffect(() => {
        const fetchData = async () => {
            try{
                const rawProductsData =  await CSVExtractor(stockFileID.path)
                const productExtrator = new ProductExtractor(rawProductsData)
                const productsList = productExtrator.products
                searchAlgorithm = new SearchAlgorithm(productsList)
            }
            catch(error){ 
                console.error(error); 
            }
  
        }; // End fetchData

        fetchData()
        return () => {

        }

      

    }, [])
    useEffect(() => { 
        const searchProducts = async (value: number) => {
            const sale: Sale = searchAlgorithm.generateSales(value)
            setResultValue(sale.difference)
            setTotalProducts(sale.total)


            
        }
        searchProducts(parseFloat(noteValue));


    }, [noteValue])


    return (
        <>
            <Header><></></Header>
            <Stack className="m-2" direction="horizontal" gap={3}>
                <Stack direction="vertical">
                    <PriceInput value={noteValue} setValue={setNoteValue}/>
                    <Stack className="mt-auto" direction="horizontal" gap={1}>
                        <Button variant="secondary">Localizar</Button>

                        <Button className="ms-auto" variant="secondary"><img src={undoIcon}/></Button>
                        <Button variant="secondary"><img src={redoIcon}/></Button>
                    </Stack>
                </Stack>
                <Stack direction="vertical" gap={2}>
                    <ValueSystemInput value={totalProducts}>total em produtos</ValueSystemInput>
                    <ValueSystemInput value={resultValue}>resultado</ValueSystemInput>
                </Stack>
            </Stack>
         
            <LinkButton to={MyRoutes.HOME} >Voltar para o inicio</LinkButton>
         
        </>
    )
}

export default ManualPage