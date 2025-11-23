const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function main() {
  const password = 'Admin@1234'
  const hash = await bcrypt.hash(password, 10)
  const exists = await prisma.user.findUnique({ where: { email: 'admin@school.test' } })
  if (!exists) {
    await prisma.user.create({ data: { email: 'admin@school.test', passwordHash: hash, fullName: 'Admin', role: 'admin' } })
    console.log('Admin created with email admin@school.test and password', password)
  } else {
    console.log('Admin exists')
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
