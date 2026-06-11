import { PrismaClient, DistrictType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default districts
  const districts = [
    {
      name: 'Library of Unsent Conversations',
      slug: 'library-unsent-conversations',
      description: 'A collection of messages never sent. Words left unspoken. The conversations that exist only in our hearts.',
      type: 'LIBRARY_UNSENT_CONVERSATIONS' as DistrictType,
      themeColor: '#8b5cf6',
      icon: 'BookOpen',
      order: 1,
      customFields: {
        categories: ['Love', 'Friendship', 'Family', 'Regret', 'Closure', 'Other'],
      },
    },
    {
      name: 'Museum of Almost',
      slug: 'museum-almost',
      description: 'Stories of the lives that almost happened. The alternate paths not taken. The "what ifs" that shaped who we became.',
      type: 'MUSEUM_ALMOST' as DistrictType,
      themeColor: '#06b6d4',
      icon: 'Zap',
      order: 2,
    },
    {
      name: 'Court of Human Decisions',
      slug: 'court-decisions',
      description: 'Submit your dilemmas. Let the community weigh in. Receive an AI verdict from multiple perspectives.',
      type: 'COURT_DECISIONS' as DistrictType,
      themeColor: '#ef4444',
      icon: 'Scale',
      order: 3,
    },
    {
      name: 'Cemetery of Former Selves',
      slug: 'cemetery-former-selves',
      description: 'Bury who you used to be. Honor the versions of yourself that have passed. Digital gravestones for transformation.',
      type: 'CEMETERY_FORMER_SELVES' as DistrictType,
      themeColor: '#6b7280',
      icon: 'Tombstone',
      order: 4,
    },
    {
      name: 'Observatory',
      slug: 'observatory',
      description: 'Write predictions about your future. Leave messages for yourself. Set reminders to see if you were right.',
      type: 'OBSERVATORY' as DistrictType,
      themeColor: '#a78bfa',
      icon: 'Telescope',
      order: 5,
    },
  ]

  for (const district of districts) {
    await prisma.district.upsert({
      where: { slug: district.slug },
      update: {},
      create: district,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
