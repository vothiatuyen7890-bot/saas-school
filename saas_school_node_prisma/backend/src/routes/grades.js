const express = require('express')
const router = express.Router()
const { prisma } = require('../prismaClient')
const { authenticate } = require('../middleware/auth')

router.use(authenticate)

router.get('/students/:studentId/grades', async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.studentId } })
  if (!student) return res.status(404).json({ error: 'Student not found' })
  if (student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  const grades = await prisma.grade.findMany({ where: { studentId: req.params.studentId } })
  res.json(grades)
})

router.post('/students/:studentId/grades', async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.params.studentId } })
  if (!student) return res.status(404).json({ error: 'Student not found' })
  if (student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  const { subject, score, term, teacher } = req.body
  const grade = await prisma.grade.create({ data: { studentId: req.params.studentId, subject, score: Number(score), term, teacher } })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'grade.create', meta: { gradeId: grade.id, studentId: req.params.studentId } } })
  res.status(201).json(grade)
})

router.put('/:id', async (req, res) => {
  const grade = await prisma.grade.findUnique({ where: { id: req.params.id }, include: { student: true } })
  if (!grade) return res.status(404).json({ error: 'Not found' })
  if (grade.student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  const updated = await prisma.grade.update({ where: { id: req.params.id }, data: req.body })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'grade.update', meta: { gradeId: updated.id } } })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  const grade = await prisma.grade.findUnique({ where: { id: req.params.id }, include: { student: true } })
  if (!grade) return res.status(404).json({ error: 'Not found' })
  if (grade.student.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  await prisma.grade.delete({ where: { id: req.params.id } })
  await prisma.activityLog.create({ data: { userId: req.user.id, action: 'grade.delete', meta: { gradeId: req.params.id } } })
  res.status(204).send()
})

module.exports = router
