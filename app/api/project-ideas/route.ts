import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Fallback ideas in case the OpenAI call fails or no API key is configured
const fallbackIdeas = [
  {
    id: "fallback-1",
    name: "Personal Expense Tracker",
    description: "Track daily expenses with categories and visual spending insights.",
    difficulty: "Beginner",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "fallback-2",
    name: "Weather Dashboard",
    description: "Display current weather and a 5-day forecast with nice charts.",
    difficulty: "Intermediate",
    technologies: ["React", "REST API", "Tailwind CSS"],
  },
  {
    id: "fallback-3",
    name: "Task Automation Bot",
    description: "Automate repetitive local-file tasks like renaming and sorting.",
    difficulty: "Advanced",
    technologies: ["Python", "CLI", "Automation"],
  },
]

export async function POST(_req: NextRequest) {
  // If the user hasn’t set an API key, just return the fallback ideas.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ ideas: fallbackIdeas })
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a creative coding mentor who generates inspiring project ideas for developers.
Generate exactly 6 diverse coding project ideas.  Return ONLY valid JSON matching:
[
  {
    "name": "Project name",
    "description": "1-2 sentence description.",
    "difficulty": "Beginner|Intermediate|Advanced",
    "technologies": ["Tech1","Tech2"]
  }
]`,
      prompt: "Generate 6 creative daily-coding project ideas.",
    })

    const ideas = JSON.parse(text).map((idea: any, idx: number) => ({
      ...idea,
      id: `idea-${Date.now()}-${idx}`,
    }))

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json({ ideas: fallbackIdeas })
  }
}
