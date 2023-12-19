// import { Product } from "./Product.js"
// export class ProductValidator{
//     constructor(product){
//         this._product = product
//         //this._parameters = parameters
//         this._valid = this._validate()

//     }
//     // validar com parametros
//     _validate() { 
//         if (this._product === undefined || this._product === null){
//             return false
//         }

//         for (const atrib of Object.keys(this._product).slice(1)) {
//             if(this._hasNoProperty(atrib)){ 
//                 //console.log(this._product)
//                 return false
//             }
//         }

//         //console.log(this._product.valor)
//         //console.log(this._product.quantidade)

//         const provider = this._product.fornecedor
//         if (provider == "DIVERSO"){ 
//             return false
//         }

//         return true
//     }

//     get isValid(){
//         return this._valid

//     }


//     _hasNoProperty(property){
//         let value = this._product[property]
//         if (value === undefined){
//             return true
//         }
//         if (typeof value === "string"){ 
//             value = value.replaceAll(" ", "")
//             return value.length <= 0
//         }
//         else{ 
//             return value <= 0
//         }
//     }

   
// }

