import { PoolClient } from "pg";


export async function createPrice(client: PoolClient ,barcode: string, price: number){
    client.query("INSERT INTO PRICE(PRICE_VALUE, TAG_ID) VALUES($1, $2);", [price, barcode ])

}