import { Router } from "express";
import { createJoke,updateJoke,delJoke,getAllJokes } from "../controllers/joke.controller.js";
const jokeRouter=Router()

jokeRouter.post("/create",createJoke)
jokeRouter.post("/update:id",updateJoke)
jokeRouter.delete("/delete:id",delJoke)
jokeRouter.get("/getAll/:userId",getAllJokes)

export default jokeRouter