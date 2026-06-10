import { prisma } from '@/lib/prisma'
import { UserRole } from '@/types'

export async function suspendUser(userId: string, adminId: string, reason?: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isSuspended: true },
  })

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'SUSPEND_USER',
      targetType: 'user',
      targetId: userId,
      reason,
    },
  })

  return user
}

export async function banUser(userId: string, adminId: string, reason?: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isBanned: true },
  })

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'BAN_USER',
      targetType: 'user',
      targetId: userId,
      reason,
    },
  })

  return user
}

export async function restoreUser(userId: string, adminId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isSuspended: false, isBanned: false },
  })

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'BAN_USER', // Using existing action type
      targetType: 'user',
      targetId: userId,
    },
  })

  return user
}

export async function approveContent(contentId: string, contentType: string, adminId: string) {
  if (contentType === 'story') {
    await prisma.story.update({
      where: { id: contentId },
      data: { status: 'APPROVED', publishedAt: new Date() },
    })
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'APPROVE_CONTENT',
      targetType: contentType,
      targetId: contentId,
    },
  })
}

export async function rejectContent(contentId: string, contentType: string, adminId: string, reason?: string) {
  if (contentType === 'story') {
    await prisma.story.update({
      where: { id: contentId },
      data: { status: 'REJECTED' },
    })
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'REJECT_CONTENT',
      targetType: contentType,
      targetId: contentId,
      reason,
    },
  })
}

export async function archiveContent(contentId: string, contentType: string, adminId: string) {
  if (contentType === 'story') {
    await prisma.story.update({
      where: { id: contentId },
      data: { status: 'ARCHIVED', archivedAt: new Date() },
    })
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'ARCHIVE_CONTENT',
      targetType: contentType,
      targetId: contentId,
    },
  })
}

export async function deleteContent(contentId: string, contentType: string, adminId: string) {
  if (contentType === 'story') {
    await prisma.story.delete({
      where: { id: contentId },
    })
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'DELETE_CONTENT',
      targetType: contentType,
      targetId: contentId,
    },
  })
}

export async function moveContent(
  contentId: string,
  fromDistrictId: string,
  toDistrictId: string,
  adminId: string,
  reason?: string,
) {
  await prisma.story.update({
    where: { id: contentId },
    data: {
      districtId: toDistrictId,
      movedFrom: fromDistrictId,
    },
  })

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'MOVE_CONTENT',
      targetType: 'story',
      targetId: contentId,
      changes: { from: fromDistrictId, to: toDistrictId },
      reason,
    },
  })
}

export async function getPendingContent() {
  return prisma.story.findMany({
    where: { status: 'PENDING_REVIEW' },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, email: true },
      },
      district: true,
    },
  })
}

export async function getReports(status?: string, limit = 50) {
  return prisma.report.findMany({
    where: status ? { status: status as any } : {},
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      story: {
        select: { id: true, title: true },
      },
      case: {
        select: { id: true, title: true },
      },
      user: {
        select: { id: true, email: true },
      },
      reportedBy: {
        select: { id: true, email: true },
      },
    },
  })
}

export async function getAdminStats() {
  const [totalUsers, totalStories, totalCases, totalReports, activeUsers] = await Promise.all([
    prisma.user.count(),
    prisma.story.count(),
    prisma.courtCase.count(),
    prisma.report.count(),
    prisma.user.count({
      where: {
        lastLoginAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    }),
  ])

  return {
    totalUsers,
    totalStories,
    totalCases,
    totalReports,
    activeUsers,
  }
}
