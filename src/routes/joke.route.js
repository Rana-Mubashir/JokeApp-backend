import { Router } from "express";
import { createJoke,updateJoke,delJoke,getAllJokes } from "../controllers/joke.controller.js";
const jokeRouter=Router()

jokeRouter.post("/create",createJoke)
jokeRouter.put("/update/:jokeId/:createdBy",updateJoke)
jokeRouter.delete("/delete/:jokeId/:createdBy",delJoke)
jokeRouter.get("/getAll/:createdBy",getAllJokes)


export default jokeRouter