#!/usr/bin/env node

/**
 * Database Migration and Seeding Script
 * Ensures database is properly initialized with schema and default data
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting database initialization...')

  try {
    // Create default districts
    console.log('📍 Creating default districts...')
    const districts = [
      {
        name: 'Library of Unsent Conversations',
        slug: 'library-unsent-conversations',
        description: 'A collection of messages never sent. Words left unspoken. The conversations that exist only in our hearts.',
        type: 'LIBRARY_UNSENT_CONVERSATIONS',
        themeColor: '#8b5cf6',
        icon: 'BookOpen',
        order: 1,
      },
      {
        name: 'Museum of Almost',
        slug: 'museum-almost',
        description: 'Stories of the lives that almost happened. The alternate paths not taken. The "what ifs" that shaped who we became.',
        type: 'MUSEUM_ALMOST',
        themeColor: '#06b6d4',
        icon: 'Zap',
        order: 2,
      },
      {
        name: 'Court of Human Decisions',
        slug: 'court-decisions',
        description: 'Submit your dilemmas. Let the community weigh in. Receive an AI verdict from multiple perspectives.',
        type: 'COURT_DECISIONS',
        themeColor: '#ef4444',
        icon: 'Scale',
        order: 3,
      },
      {
        name: 'Cemetery of Former Selves',
        slug: 'cemetery-former-selves',
        description: 'Bury who you used to be. Honor the versions of yourself that have passed. Digital gravestones for transformation.',
        type: 'CEMETERY_FORMER_SELVES',
        themeColor: '#6b7280',
        icon: 'Tombstone',
        order: 4,
      },
      {
        name: 'Observatory',
        slug: 'observatory',
        description: 'Write predictions about your future. Leave messages for yourself. Set reminders to see if you were right.',
        type: 'OBSERVATORY',
        themeColor: '#a78bfa',
        icon: 'Telescope',
        order: 5,
      },
    ]

    for (const district of districts) {
      const existing = await prisma.district.findUnique({
        where: { slug: district.slug },
      })

      if (!existing) {
        await prisma.district.create({
          data: district,
        })
        console.log(`  ✅ Created: ${district.name}`)
      } else {
        console.log(`  ⏭️  Already exists: ${district.name}`)
      }
    }

    console.log('✅ Database initialization complete!')
  } catch (error) {
    console.error('❌ Error during initialization:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
