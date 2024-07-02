import express, { json } from 'express'
import cors from 'cors'
import  userRouter  from './routes/user.route.js';
import jokeRouter from './routes/joke.route.js';
const app = express();

app.use(cors ({
    origin:process.env.CORS_ORIGIN
}))

app.use (express.json({
    limit:"16kb",
}))

app.use("/api/user",userRouter)
app.use("/api/joke",jokeRouter)

export default app