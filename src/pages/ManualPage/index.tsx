import "./manual.css"
import { useEffect, useState, useRef } from "react"
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
import { Indexer } from "../../Indexer"
import { Sale } from "../../Sale"
import {SaleItem} from "../../SaleItem"
import { Navigate } from "react-router-dom"
import { Product } from "../../Product"
import { Directions } from "../../Directions"
import { ipcRenderer } from "electron"



const ManualPage = () => { 
    
    const stockFileID = useStockFileIdentifier()
    const productList = useRef<Array<Product>>([])
    
    const previousItem = () => {
        const previousIndex = index - 1
        if(items.isContained(previousIndex))
            setIndex(previousIndex)
        

    }
    const nextItem = () => { 
        const nextIndex = index + 1;
        if(items.isContained(nextIndex))
        setIndex(nextIndex)
    }
 
    const [items, setItems]= useState<Indexer<SaleItem>>(new Indexer([]))

    
    function registerCommandsOfManualPage(){
        ipcRenderer.send('register-the-acceletators-directions-commands')
        console.log("registrou")
    }
    function unRegisterCommandsOfManualPage(){
        ipcRenderer.send('unregister-the-acceletators-directions-commands')
    }

    const [index, setIndex] = useState(0); 
    const [noteValue, setNoteValue] = useState("0.00")
    const [resultValue, setResultValue] = useState(0.00)
    const [totalProducts, setTotalProducts] = useState(0.00)

    function clean(){
        setIndex(0)
        setResultValue(0.00)
        setTotalProducts(0.00)
        setItems(new Indexer([]))
    }

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            if(!ignore){
                try{
                    const rawProductsData = await CSVExtractor(stockFileID.path)
                    const productExtrator = new ProductExtractor(rawProductsData)
                    registerCommandsOfManualPage()
                    productList.current = productExtrator.products
                    
                }
                catch(error){ 
                    console.error(error); 
                }
    
            }

            return () => {
                ignore =true
                unRegisterCommandsOfManualPage()
            }


  
        }; // End fetchData
    
        fetchData()

    }, [])

    useEffect(() => {
        let ignore = false
        if(!ignore){
            ipcRenderer.on('accelerator-directions', (event, key)=>{ 
            
                switch(key){
                case Directions.UP:
                    previousItem()
                    break;
                case Directions.DOWN:
                    nextItem()
                    break;
                }
            })
        }

        return () => { 
            ignore = true
        }
    }) 

    useEffect(() => { 
        const searchProducts = async (value: string) => {
            const value2 = value.replace(/\D+/g, '').replace(/^0+/, '');
            
            if(value2.length >= 3){
                const searchAlgorithm = new SearchAlgorithm(productList.current)
                const sale: Sale = searchAlgorithm.generateSales(parseFloat(value))
                setResultValue(sale.difference)
                setTotalProducts(sale.total)
                setItems(new Indexer(sale.itens))
                setIndex(0)
            }
            else if(value === "0.00" ){
                clean()
            }


   


            
        }
        searchProducts(noteValue);


    }, [noteValue])
    function handleConfirm(e: React.MouseEvent<HTMLButtonElement>) {
        if(items.length > 0){ 
            updateProductList(productList.current, items.content)
            setNoteValue("0.00")
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
            {items.length>0 && <SaleList  items={items.content} index={index} selectItem={(index) => setIndex(index)}/>}
        </>
    )
}

export default ManualPage