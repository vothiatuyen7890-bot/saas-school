const express = require('express')
const router = express.Router()
const { prisma } = require('../prismaClient')
const { authenticate } = require('../middleware/auth')

router.use(authenticate)

router.get('/', async (req, res) => {
  const students = await prisma.student.findMany({ where: { ownerId: req.user.id }, include: { grades: true } })
  res.json(students)
})

router.post('/', async (req, res) => {
  const { firstName, lastName, dob, className } = req.body
  const student = await prisma.student.create({ data: { ownerId: req.user.id, firstName, lastName, dob: dob ? new Date(dob) : null, className } })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'student.create', meta: { studentId: student.id } } })
  res.status(201).json(student)
})

router.get('/:id', async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.id }, include: { grades: true } })
  if (!student) return res.status(404).json({ error: 'Not found' })
  if (student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  res.json(student)
})

router.put('/:id', async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.id } })
  if (!student) return res.status(404).json({ error: 'Not found' })
  if (student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  const updated = await prisma.student.update({ where: { id: req.params.id }, data: req.body })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'student.update', meta: { studentId: updated.id } } })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.id } })
  if (!student) return res.status(404).json({ error: 'Not found' })
  if (student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  await prisma.student.delete({ where: { id: req.params.id } })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'student.delete', meta: { studentId: req.params.id } } })
  res.status(204).send()
})

module.exports = router
