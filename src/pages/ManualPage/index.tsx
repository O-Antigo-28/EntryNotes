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
import { useRedeFileIdentifier, useStockFileIdentifier } from "../../atoms/fileIdentifiers"
import { ProductExtractor } from "../../ProductExtrator"
import { SearchAlgorithm, updateProductList } from "../../SearchAlgorithm"
import { Sale } from "../../Sale"
import {SaleItem} from "../../SaleItem"
import { Navigate } from "react-router-dom"
import { Product } from "../../Product"


const ManualPage = () => { 

    
    
    const [items, setItems]= useState<Array<SaleItem>>([])
    const [productList, setProductList] = useState<Array<Product>>([])
    
    

    const stockFileID = useStockFileIdentifier()
    const [index, setIndex] = useState(0); 
    const [noteValue, setNoteValue] = useState("0.00")
    const [resultValue, setResultValue] = useState(0.00)
    const [totalProducts, setTotalProducts] = useState(0.00)

    function clean(){
        setNoteValue("0.00")
        setResultValue(0.00)
        setTotalProducts(0.00)
        setItems([])
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const rawProductsData = await CSVExtractor(stockFileID.path)
                console.log("rawProducts", rawProductsData)
                const productExtrator = new ProductExtractor(rawProductsData)
                setProductList(productExtrator.products)
                console.log("productsLIst")

            }
            catch(error){ 
                console.error(error); 
            }
  
        }; // End fetchData
    
        fetchData()
 

      

    }, [])


    useEffect(() => { 
        const searchProducts = async (value: string) => {
            const value2 = value.replace(/\D+/g, '').replace(/^0+/, '');
            
            if(value2.length >= 3){
                const searchAlgorithm = new SearchAlgorithm(productList)
                const sale: Sale = searchAlgorithm.generateSales(parseFloat(value))
                setResultValue(sale.difference)
                setTotalProducts(sale.total)
                setItems(sale.itens)
            }
            else if(value === "0.00"){
                clean()
            }


   


            
        }
        searchProducts(noteValue);


    }, [noteValue])
    function handleConfirm(e: React.MouseEvent<HTMLButtonElement>) {
        if(items.length > 0){ 
            updateProductList(productList, items)
            clean()
        }
    }

    return (
        <>
            <Header><></></Header>
            <Stack className="m-2" direction="horizontal" gap={3}>
                <Stack direction="vertical">
                    <PriceInput value={noteValue} setValue={setNoteValue}/>
                    <Stack className="mt-auto" direction="horizontal" gap={1}>
                        <Button variant="secondary" onClick={handleConfirm}>Confirmar</Button>

                        <Button className="ms-auto" variant="secondary"><img src={undoIcon}/></Button>
                        <Button variant="secondary"><img src={redoIcon}/></Button>
                    </Stack>
                </Stack>
                <Stack direction="vertical" gap={2}>
                    <ValueSystemInput value={totalProducts}>total em produtos</ValueSystemInput>
                    <ValueSystemInput value={resultValue} colors>resultado</ValueSystemInput>
                </Stack>
            </Stack>
         
            {stockFileID.path.length < 3 && <Navigate to={MyRoutes.AUTO_FILE_SELECTION}/>}
            {items.length>0 && <SaleList  items={items} index={index} selectItem={(index) => setIndex(index)}/>}
        </>
    )
}

export default ManualPage