import { createConnection } from "typeorm"


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