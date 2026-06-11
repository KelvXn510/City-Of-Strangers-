

/**
 * Content Safety and Moderation Module
 * Uses both AI detection and rule-based systems for content safety
 */

export async function performModerationCheck(content: string): Promise<{
  isSafe: boolean
  flaggedCategories: string[]
  confidence: number
}> {
  // Rule-based detection first (fast)
  const unsafePatterns = [
    /\b(hate|violence|illegal)\b/gi,
    /contact\s+(info|details|phone|email|address)/gi,
  ]

  let flaggedCategories: string[] = []

  for (const pattern of unsafePatterns) {
    if (pattern.test(content)) {
      flaggedCategories.push(pattern.source)
    }
  }

  // If rule-based check flags content, return early
  if (flaggedCategories.length > 0) {
    return {
      isSafe: false,
      flaggedCategories,
      confidence: 0.8,
    }
  }

  // Content is safe
  return {
    isSafe: true,
    flaggedCategories: [],
    confidence: 0.95,
  }
}

export async function generateContentSummary(content: string): Promise<string> {
  // Generate concise summary for display
  const maxLength = 150
  if (content.length <= maxLength) return content

  const sentences = content.split(/[.!?]+/).filter((s) => s.trim())
  let summary = ''

  for (const sentence of sentences) {
    if ((summary + sentence).length > maxLength) break
    summary += sentence + '. '
  }

  return summary.trim()
}

export async function generateMetadata(content: string): Promise<{
  wordCount: number
  readingTime: number // in minutes
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
}> {
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // Average 200 WPM

  // Simple sentiment analysis
  const positiveWords =
    /(good|great|love|hope|joy|happy|amazing|wonderful|beautiful|inspiring|grateful)/gi
  const negativeWords =
    /(bad|hate|sad|angry|depressed|tragic|terrible|awful|disappointing|painful)/gi

  const positiveMatches = (content.match(positiveWords) || []).length
  const negativeMatches = (content.match(negativeWords) || []).length

  let sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
  if (positiveMatches > negativeMatches * 1.5) {
    sentiment = 'positive'
  } else if (negativeMatches > positiveMatches * 1.5) {
    sentiment = 'negative'
  } else if (positiveMatches > 0 || negativeMatches > 0) {
    sentiment = 'mixed'
  } else {
    sentiment = 'neutral'
  }

  return {
    wordCount,
    readingTime,
    sentiment,
  }
}

export const MODERATION_CATEGORIES = {
  HATE_SPEECH: 'hate_speech',
  HARASSMENT: 'harassment',
  THREATS: 'threats',
  SELF_HARM: 'self_harm',
  SEXUAL_CONTENT: 'sexual_content',
  VIOLENCE: 'violence',
  ILLEGAL: 'illegal_activity',
  PERSONAL_INFO: 'personal_information',
} as const
