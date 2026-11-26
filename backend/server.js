import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '23 Hours backend is running'
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
