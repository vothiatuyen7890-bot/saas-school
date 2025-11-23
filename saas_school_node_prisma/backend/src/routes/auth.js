const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { prisma } = require('../prismaClient')
require('dotenv').config()

function signAccessToken(user) {
  return jwt.sign({ role: user.role }, process.env.JWT_SECRET, { subject: user.id, expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' })
}

router.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'Email already in use' })
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, passwordHash: hash, fullName } })
  const accessToken = signAccessToken(user)
  res.status(201).json({ user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }, accessToken })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const accessToken = signAccessToken(user)
  res.json({ accessToken, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } })
})

module.exports = router
