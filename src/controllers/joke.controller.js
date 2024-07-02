import express from 'express'
import mongoose from 'mongoose'
import { Joke } from '../models/jokes.model.js'

async function createJoke(req, res) {
    try {
        const { title, joke } = req.body
        if (!title || !joke) {
            res.status(400).json({
                message: "Empty fields"
            })
        }

        const createJoke = await Joke.create({
            title,
            joke
        })
        if (createJoke) {
            res.status(200).json({
                message: "New joke created  successfully",
                data: createJoke
            })
        }
        else {
            res.status(400).json({
                message: "Error in creating new joke"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "Not ok",
            error: error
        })
    }
}

async function getAllJokes(req, res) {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(404).json({
                message: "User id must be provided"
            })
        }
        const AllJokes = Joke.find({ createdBy: userId })
        if (!AllJokes) {
            return res.status(404).json({
                message: "No jokes from this user"
            })
        }

        return res.status(200).json({
            message: "Jokes found",
            Jokes: AllJokes,
        })

    } catch (error) {
        return res.status(400).json({
            message: "Internal server error",
            error: error
        })
    }
}

async function updateJoke() {
    try {
        const id = req.params.id;
        const { title, joke } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Id must be provided"
            })
        }
        if (!title || !joke) {
            return res.status(400).json({
                message: "Empty fields"
            })
        }
        const jokeToUpdate = await Joke.findById(id)
        if (!jokeToUpdate) {
            return res.status(404).json({
                message: "Joke does not exists"
            })
        }

        jokeToUpdate.title = title
        jokeToUpdate.joke = joke

        const saveChanges = await jokeToUpdate.save();
        if (saveChanges) {
            return res.status(200).json({
                message: "Joke updated sucessfully"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Not ok",
            error: error
        })
    }
}

async function delJoke(req, res) {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                message: "Id must be provided"
            })
        }
        const deletedJoke = await Joke.findByIdAndDelete(id)
        if (!deletedJoke) {
            return res.status(400).json({
                message: "Joke does not exists"
            })
        }
        return res.status(200).json({
            message: "Joke is deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Not ok",
            error: error
        })
    }
}

export { createJoke, updateJoke, delJoke, getAllJokes }
