const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth')
const studentRoutes = require('./routes/students')
const gradeRoutes = require('./routes/grades')
const userRoutes = require('./routes/users')

app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/grades', gradeRoutes)
app.use('/api/admin/users', userRoutes)

app.get('/health', (req, res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log('Backend running on', port))
