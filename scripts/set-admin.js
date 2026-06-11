const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'newazabid83@gmail.com';
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ Success! User ${user.email} is now an ADMIN.`);
  } catch (error) {
    if (error.code === 'P2025') {
      console.error(`❌ User with email ${email} not found in the database. Please register first.`);
    } else {
      console.error('Failed to update user:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
