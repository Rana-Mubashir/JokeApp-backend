import mongoose, { Schema, model } from "mongoose";

const jokeScehma = new Schema({
    title: {
        type: String,
        unique: true,
        required:true,
    },
    joke: {
        type: String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true })

export const Joke = model("Joke", jokeScehma)