import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeEmotionalContent(text: string): Promise<{
  emotionalTags: string[]
  sentiment: string
  summary: string
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an emotional intelligence analyst. Analyze the provided text and extract:
1. Emotional tags (list of emotions present)
2. Overall sentiment (positive, negative, neutral, mixed)
3. A concise summary (1-2 sentences)

Respond in JSON format: {"emotionalTags": [...], "sentiment": "...", "summary": "..."}`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const content = response.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error analyzing emotional content:', error)
    return {
      emotionalTags: [],
      sentiment: 'neutral',
      summary: '',
    }
  }
}

export async function classifyContent(
  text: string,
  districtType: string,
): Promise<{
  category: string
  subcategories: string[]
  confidence: number
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Classify the following text for the district type: ${districtType}
Return JSON: {"category": "...", "subcategories": [...], "confidence": 0.0-1.0}`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const content = response.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error classifying content:', error)
    return {
      category: 'unclassified',
      subcategories: [],
      confidence: 0,
    }
  }
}

export async function generateCourtVerdict(
  situation: string,
  question: string,
  opinions: string[],
): Promise<{
  logicalPerspective: string
  emotionalPerspective: string
  riskPerspective: string
  optimisticPerspective: string
  longTermPerspective: string
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a wise counsel providing verdicts on human dilemmas. Analyze from 5 perspectives:
1. Logical - objective analysis
2. Emotional - emotional considerations
3. Risk - potential risks and downsides
4. Optimistic - best case scenario
5. Long-term - long-term consequences

Provide thoughtful, compassionate guidance. Return JSON with keys: logicalPerspective, emotionalPerspective, riskPerspective, optimisticPerspective, longTermPerspective`,
        },
        {
          role: 'user',
          content: `Situation: ${situation}\n\nQuestion: ${question}\n\nCommunity Opinions:\n${opinions.join('\n')}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    })

    const content = response.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating court verdict:', error)
    return {
      logicalPerspective: 'Unable to generate verdict at this time.',
      emotionalPerspective: 'Unable to generate verdict at this time.',
      riskPerspective: 'Unable to generate verdict at this time.',
      optimisticPerspective: 'Unable to generate verdict at this time.',
      longTermPerspective: 'Unable to generate verdict at this time.',
    }
  }
}

export async function detectHarmfulContent(text: string): Promise<{
  isFlagged: boolean
  reasons: string[]
  severity: 'low' | 'medium' | 'high'
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Analyze text for potentially harmful content. Check for:
- Threats or violence
- Harassment
- Hate speech
- Personal information sharing
- Self-harm content

Return JSON: {"isFlagged": boolean, "reasons": [...], "severity": "low|medium|high"}
Be fair and nuanced - not everything negative should be flagged.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    })

    const content = response.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error detecting harmful content:', error)
    return {
      isFlagged: false,
      reasons: [],
      severity: 'low',
    }
  }
}

export async function generateAlternateTimeline(story: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Create an alternate timeline summary based on the provided "almost" story. 
Show what could have happened if things went differently. Be creative, hopeful, and thought-provoking.
Keep it to 2-3 paragraphs.`,
        },
        {
          role: 'user',
          content: story,
        },
      ],
      temperature: 0.9,
      max_tokens: 400,
    })

    return response.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating alternate timeline:', error)
    return ''
  }
}

export async function identifyLifeThemes(story: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Identify the major life themes in this "almost" story. 
Return a JSON array of theme strings. Examples: "courage", "family", "ambition", "loss", "transformation"`,
        },
        {
          role: 'user',
          content: story,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const content = response.choices[0].message.content || '[]'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error identifying life themes:', error)
    return []
  }
}
