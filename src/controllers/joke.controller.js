import express from 'express'
import mongoose from 'mongoose'
import { Joke } from '../models/jokes.model.js'

async function createJoke(req, res) {
    try {
        const { title, joke, createdBy } = req.body
        if (!title || !joke) {
            res.status(400).json({
                message: "Empty fields"
            })
        }
        const createJoke = await Joke.create({
            title,
            joke,
            createdBy
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
        const createdBy = req.params.createdBy
        if (!createdBy) {
            return res.status(404).json({
                message: "createdby id must be provided"
            })
        }
        const AllJokes = await Joke.find({ createdBy: createdBy })
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

async function updateJoke(req, res) {
    try {
        const createdBy = req.params.createdBy
        const jokeId = req.params.jokeId
        const { title, joke } = req.body
        if (!createdBy || !jokeId) {
            req.status(404).json({
                message: 'ids must be provided'
            })
        }
        if (!title || !joke) {
            req.status(404).json({
                message: 'content must be provided'
            })
        }
        const findJoke = await Joke.findOneAndUpdate({
            $or: [
                {
                    createdBy: createdBy,
                    _id: jokeId
                }
            ]
        }, {
            title: title,
            joke: joke
        }, { new: true })
    } catch (error) {
        res.status(400).json({
            message: "Not ok",
            error: error
        })
    }
}

async function delJoke(req, res) {
    try {
        const createdBy = req.params.createdBy
        const jokeId = req.params.jokeId
        if (!createdBy || !jokeId) {
            return res.status(404).json({
                message: "both ids must be provided"
            })
        }
        const findJoke = await Joke.findOneAndDelete({
            $or: [
                { createdBy: createdBy },
                { _id: jokeId }
            ]
        });
        if (!findJoke) {
            return res.status(400).json({
                message: "Joke not found"
            })
        }
        return res.status(200).json({
            message: "deleted",
            data: findJoke
        })
    } catch (error) {
        res.status(400).json({
            message: "Not ok",
            error: error
        })
    }
}


export { createJoke, updateJoke, delJoke, getAllJokes }
