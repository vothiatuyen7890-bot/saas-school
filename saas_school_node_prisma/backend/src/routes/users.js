const express = require('express')
const router = express.Router()
const { prisma } = require('../prismaClient')
const { authenticate, requireRole } = require('../middleware/auth')

router.use(authenticate)
router.use(requireRole('admin'))

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({ include: { students: true } })
  const out = users.map(u => ({ id: u.id, email: u.email, fullName: u.fullName, totalStudents: u.students.length }))
  res.json(out)
})

module.exports = router
