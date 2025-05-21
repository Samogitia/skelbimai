import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from '../middlewares/errorHandler.js'

import userRouter from '../routes/userRouter.js'
import categoryRouter from '../routes/categoryRouter.js'
import advertRouter from '../routes/advertRouter.js'
import photoRouter from '../routes/photoRouter.js'


const app = express()

app.use(
      morgan(
          'Received request \x1b[32m:method\x1b[36m :url\x1b[33m :status\x1b[0m'
      )
)

app.use(express.json())

app.use(cors())

app.use("/users", userRouter)
app.use("/categories", categoryRouter)
app.use("/adverts", advertRouter)
app.use("/photos", photoRouter)

app.use(errorHandler)


export default app