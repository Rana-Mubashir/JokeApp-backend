import app from "./app.js"
import { connectDb } from "./db/db.js"
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(8000,()=>{
        console.log("server listening at port 4000")
    })
})
.catch(()=>{
    console.log("Server is not listening")
})
