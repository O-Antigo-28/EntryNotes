import { Produto } from "./Product.js"
import { ProductValidator } from "./ProductValidator.js"
export class ExtratorCSV{
    

    constructor(data, column_titles, separator){
        
        this._products = []
        this._column_titles = [...column_titles] 
        this._titlesMap = []
        this._separator = separator
        this._caracNewLine = "\r\n"

        this._extractProducts(data)
    }

    get products(){ 
        return this._products
    }


    _extractProducts(data){

        let newData = this._simplifiesData(data)

        this._mapTitles(newData)

        this._createProductList(this._separateProducts(newData))
        
        
    }

    _mapTitles(data){
        
        const titlesArea = this._extractTitles(data)
        
        let titlesPosition = []
        for (const index in titlesArea) {
            for(const title of this._column_titles){
                if(title === titlesArea[index]){
                    const map = {title: title, position: index}
                    titlesPosition.push(map)
                    break 
                }
            }
        }


        this._titlesMap = titlesPosition.sort((a, b) => { 
            return a.position - b.position
        })



    }
    _extractTitles(data){
        //const startTitles = `${this._column_titles[0]}${this._separator}`
        // data.substr(data.indexOf(startTitles), data.slice(data.indexOf(startTitles)).indexOf("\r\n"))
        const rawTitles = data.substr(0, data.indexOf(this._caracNewLine))

        const splitTitles = rawTitles.split(this._separator) 
        const filteredTitles = splitTitles.filter((title) =>  title.length > 3 )

        return filteredTitles

    }

    _simplifiesData(data){ 
                
        var expReg = /;+/g;
        var result = data.replace(expReg, this._separator);
    
        return result
    }

    _separateProducts(data){ 
        //const separator = "\r\n\r\n;\r\n\r\n"
        //data.substring(data.indexOf(separator) + separator.length, data.lastIndexOf(separator))
        const productRegion = data.slice(data.indexOf(this._caracNewLine))
        const separedProducts = productRegion.split(this._caracNewLine)

        return separedProducts
    }
    _productIsValid(product){
        const prodValidator = new ProductValidator(product)
        return prodValidator.isValid
    }
    _createProductList(separateProducts){
        let IDCreator = 0
        
        
        for (const separateProduct of separateProducts) {
    
            const carac = separateProduct.split(this._separator)
            if (!carac[4]){
                continue
             }
            const code = carac[0]
            const description = carac[1].substring(0, 17)
            const provider = carac[2]
            const quantity =  parseFloat(carac[3])
            const totalSalueValue = parseFloat(carac[4].replace(",", "."))
            const totalCostValue = parseFloat(carac[5])


            if (totalCostValue >= totalSalueValue){
                continue
            }
            
            if (quantity == 0 || totalSalueValue == 0){
                continue
            }


            const salueValue = totalSalueValue / parseFloat(quantity)

            const product = new Produto(IDCreator++,code, description, provider, quantity, salueValue)

            
            
            if (!this._productIsValid(product)){
                IDCreator--
                continue    
            }

            this._products.push(product)
            



        }

        

    }




}