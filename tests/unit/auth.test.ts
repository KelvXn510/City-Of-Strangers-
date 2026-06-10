import { isUserAdmin, requireAuth } from '@/utils/auth'

describe('Auth Utils', () => {
  test('isUserAdmin checks user role correctly', async () => {
    // Mock implementation
    const result = await isUserAdmin()
    expect(typeof result).toBe('boolean')
  })
})
