import { createConnection } from "typeorm"
import { DataSource} from "typeorm"
import "reflect-metadata"
import { User } from "./entities/User"
import {DetailsBuy} from "./entities/DetailsBuy"
import {Product} from "./entities/Product"
import {PromotionalProduct} from "./entities/PromotionalProduct"
import {Purchase} from "./entities/Purchase"


const main = async () => {
    try{
        await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: 'root',
            password: "Cloud%%1234.",
            database: 'supermarket'
        })
        console.log("Connected to MySQL SuperMarketAPI")
    } catch(error){
        console.log(error)
        throw new Error("Unable to connect to db")
    }
    
}

main()