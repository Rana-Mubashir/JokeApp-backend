import { model,Schema } from "mongoose";

const bookSchema=new Schema({
    title:{
        type:String,
    },
    chapters:{
        type:Number,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:author
    },
    launch:{
        type:Boolean,
        default:true
    }

})

export const Book= model('Book',bookSchema)