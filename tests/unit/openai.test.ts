import { analyzeEmotionalContent, classifyContent } from '@/lib/openai'

describe('OpenAI Integration', () => {
  test('analyzeEmotionalContent returns valid structure', async () => {
    const result = await analyzeEmotionalContent('This is a test story')
    expect(result).toHaveProperty('emotionalTags')
    expect(result).toHaveProperty('sentiment')
    expect(result).toHaveProperty('summary')
    expect(Array.isArray(result.emotionalTags)).toBe(true)
  })

  test('classifyContent returns valid structure', async () => {
    const result = await classifyContent('A message I never sent', 'LIBRARY_UNSENT_CONVERSATIONS')
    expect(result).toHaveProperty('category')
    expect(result).toHaveProperty('subcategories')
    expect(result).toHaveProperty('confidence')
    expect(Array.isArray(result.subcategories)).toBe(true)
  })
})
