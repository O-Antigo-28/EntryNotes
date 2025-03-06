import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

async function CreateTablesOfDBLabels(pool: Pool){
    try{
        CreateTableTag(pool)
        CreateTablePrice(pool)
        CreateTableTagGroup(pool)
        CreateTableTagGroup_Tag(pool)
        
    }
    catch{}
}
async function CreateTableTag(pool: Pool){
    
    pool.query("CREATE TABLE IF NOT EXISTS TAG(BARCODE VARCHAR(13) PRIMARY KEY NOT NULL, DESCRIPTION VARCHAR(150) NOT NULL);")
}
async function CreateTablePrice(pool: Pool){
    pool.query("CREATE TABLE IF NOT EXISTS PRICE(PRICE_ID SERIAL PRIMARY KEY NOT NULL, PRICE_VALUE DECIMAL NOT NULL ,PRICE_DATE DATE NOT NULL, TAG_ID VARCHAR(150) NOT NULL, FOREIGN KEY (TAG_ID) REFERENCES TAG(BARCODE) ON DELETE CASCADE);")
}
async function CreateTableTagGroup(pool: Pool){
    pool.query("CREATE TABLE IF NOT EXISTS TAGGROUP(TAGGROUP_ID SERIAL PRIMARY KEY NOT NULL, TAGGROUP_NAME VARCHAR(250) NOT NULL, CREATION_DATE DATE NOT NULL, LAST_UPDATE DATE NOT NULL);")
}
async function CreateTableTagGroup_Tag(pool: Pool){
    pool.query("CREATE TABLE IF NOT EXISTS TAGGROUP_TAG(TAG_BARCODE VARCHAR(150) NOT NULL,GROUP_ID INTEGER NOT NULL,PRIMARY KEY (TAG_BARCODE, GROUP_ID),FOREIGN KEY (TAG_BARCODE) REFERENCES TAG(BARCODE) ON DELETE CASCADE, FOREIGN KEY (GROUP_ID) REFERENCES TAGGROUP(TAGGROUP_ID) ON DELETE CASCADE);")
}

export function connectDB(): Pool{
 

    console.log(process.env.PG_PASSWORD)
    const pool = new Pool({

        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: Number (process.env.PG_PORT)
        })

    

     
    return pool
}


 
