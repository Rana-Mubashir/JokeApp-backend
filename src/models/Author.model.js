import { Schema,model } from "mongoose";

const authorSchema=new Schema({

    name:{
        type:String,
    },
    age:{
        type:Number,
    }


})

export const Author = model('Author',authorSchema)