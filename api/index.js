import express from 'express'
import userRouter from './routes/user.route.js'

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

app.use('/api/user', userRouter) 