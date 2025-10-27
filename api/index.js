import express from 'express'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

app.use('/api/user', userRouter)
app.use('/api/auth/', authRouter)