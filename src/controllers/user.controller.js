import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.model.js'
async function signUp(req, res) {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      return res.status(404).json({
        message: "Empty fields"
      })
    }
    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
      return res.status(400).json({
        message: "User with this email already exits"
      })
    }
    const createUser = await User.create({email, username, password})
    if (!createUser) {
      return res.status(404).json({
        message: "Something went wrong while registering user"
      })
    }
    return res.status(200).json({
      message: "User registered successfully",
      data:createUser
    })
  } catch (error) {
    res.status(400)
      .json({
        message: 'not ok',
        error: error,
      })
  }
}

async function login(res, req) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "Empty fields"
      })
    }
    const checkUser = User.findOne({ email })
    if (!checkUser) {
      return res.status(400).json({
        message: "User not found"
      })
    }
    if (checkUser.password != password) {
      res.status(404).json({
        message: "Invalid credentials"
      })
    }
    return res.status(200).json({
      message: "User log in sucessfully",
      data: checkUser
    })
  } catch (error) {
    res.status(400)
      .json({
        message: 'not ok',
        error: error,
      })
  }
}

async function logout() {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(404).json({
        message: "Id must be provided"
      })
    }
    return res.status(200).json({
      message: "User logout sucessfully"
    })

  } catch (error) {
    res.status(400)
      .json({
        message: 'not ok',
        error: error,
      })
  }
}

export { signUp, login, logout }