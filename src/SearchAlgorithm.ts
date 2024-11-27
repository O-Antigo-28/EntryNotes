import { Product } from "./Product"
import {SaleItem} from "./SaleItem"
import { Sale } from "./Sale"
export class SearchAlgorithm {
    constructor(private _productList: Product[]){
        
    }
    public test(value: number){
        console.log(`valor de entrada ${value}`)
        console.log(this._closeSale(value))
        console.log(this._saleValue(this._closeSale(value)))

        console.log(this._twoClosestSales(value))
        console.log(this._saleValue(this._twoClosestSales(value)))

        console.log(this._nearestSales(value))
        console.log(this._saleValue(this._nearestSales(value)))

    }
    public generateSales(value: number): Sale{
        
        const sales1 = this._closeSale(value)
        const sales2 = this._twoClosestSales(value)
        const sales3 = this._nearestSales(value)
        
        const allSales = [sales1, sales2, sales3]

        const bestSale = this._salesComparator(allSales, value) 
        const total = this._saleValue(bestSale)
        const diff = value - total

        return new Sale(total, diff, bestSale)

    }

    private _closeSale(value: number): SaleItem[]{
        
        let produto_mais_proximo = this._productList[0]
        let menor_diferenca = 999999;
        let quantity;
        let firstTime = true
        for(const product of this._productList){
            // console.log(`quantidade: ${quantidade}`)
            let productValue = product.value
            let currentQuantity = this._searchQuantityForOneProduct(product, value)
            let currentDifference = difference(value, (productValue * currentQuantity))
            // console.log(`olha os valores ${dif_atual} <=> menor dif ${menor_diferenca}`)
            if(firstTime){
                firstTime = false
                // console.log(`quantidade_atual: ${quantidade_atual}`)
                produto_mais_proximo = product
                menor_diferenca = currentDifference
                quantity = currentQuantity
            }
            else if(currentQuantity == 0){
                continue
            }
            else if(menor_diferenca > currentDifference){
                // console.log("atualizou_produto")
                produto_mais_proximo = product
                quantity = currentQuantity
                menor_diferenca = currentDifference
                
            }          
        }
        const venda_mais_proxima = new SaleItem(produto_mais_proximo, quantity)

        // console.log(`final ${quantidade}`)
        return [venda_mais_proxima]
    }

    private _searchQuantityForOneProduct(product: Product, valor: number){
        let productValue = product.value
        let smallestDifference = 99999;
        let quantity = 0
        // console.log(`quantidade: ${produto.quantidade}`)
    
        for(let i = 1; i <= product.quantity; i++){
            let currentDifference = difference(productValue * i, valor)

            // console.log(`dif atual:${dif_atual} <=> menor dif: ${menor_diferenca}`)
            // console.log(`iteraçao ${i}` )

            if(smallestDifference < currentDifference){
                break
            }
            else{
                smallestDifference = currentDifference
                quantity = i
            }
        } 
        // console.log(`quantidade retornada pela funcao: ${quantidade}`)

        return quantity

    }

    private _twoClosestSales(valor: number){

        let menor_diferenca = 99999;
        let Prod_1
        let Prod_2
        let quantitys = [1, 1]
        for(const prod1 of this._productList){
            for(const prod2 of this._productList){
                if(prod1.code == prod2.code){
                    continue
                }
                let array = this._searchQuantityForTwoProducts(prod1, prod2, valor)
                let dif_atual =  array[2];
                if(menor_diferenca < dif_atual){
                    continue
                }
                else{
                    menor_diferenca = dif_atual
                    Prod_1 = prod1
                    Prod_2 = prod2
                    quantitys[0] = array[0]
                    quantitys[1] = array[1]
                }



            
            }
        }
        let sale1 = new SaleItem(Prod_1, quantitys[0])
        let sale2 = new SaleItem(Prod_2, quantitys[1])
        return [sale1, sale2]
    }

    private _searchQuantityForTwoProducts(prod1: Product, prod2:Product, valor: number){
        let value1 = prod1.value
        let value2 = prod2.value
        let quantitys = [1, 1]
        let smallestDifference = 99999
        
        for(let i = 1; i <= prod1.quantity; i++){
            for(let u = 1; u <= prod2.quantity; u++){
                let sum = (value1 * i) + (value2 * u)
                
                let currentDifference = difference(sum, valor); 
                if(smallestDifference < currentDifference){
                    break
                }
                else{
                    smallestDifference = currentDifference
                    quantitys[0] = i
                    quantitys[1] = u
                }

            }
        }
        return [quantitys[0], quantitys[1], smallestDifference]
    }

 


    private _nearestSales(value: number){
        let saleList = []
        let totalSalueList = 0
        let remainingValue = value
        for(const product of this._productList){
            const productValue = product.value
            remainingValue = value - totalSalueList
            let currentQuantity = this._searchQuantityForOneProduct(product, remainingValue)
            let currentValue = productValue * currentQuantity
            if((currentValue + totalSalueList) < value){
                totalSalueList += currentValue
                let newSale = new SaleItem(product, currentQuantity)
                saleList.push(newSale)
            }
            else if(difference(totalSalueList, value) < 0.75){
                break
            }
        }
        return saleList
    }
    private _salesComparator(competitiveSales: SaleItem[][] , value: number){
        let nearestSale: SaleItem[] = null;
        let closestDifference: number = null
        
        for(const venda of competitiveSales){
        
            let currentDifference: number = difference(this._saleValue(venda), value)
            if(nearestSale == null && closestDifference == null){
                nearestSale = competitiveSales[0]
                closestDifference = currentDifference
            }
            else if(currentDifference < closestDifference){
                closestDifference = currentDifference
                nearestSale = venda
            }
        

        }
        console.log("venda mais proxima", nearestSale)
        return nearestSale
        
    }

    private _saleValue(salesList: SaleItem[]){
        let result:number = 0
        for(const sale of salesList){
            result += sale.result
        }
        return result
    }
}

function difference(firstValue: number, SecondValue: number){
    return Math.abs(SecondValue - firstValue)
}

