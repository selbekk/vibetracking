"use client"

import type React from "react"
import { Calendar, Code, Trophy, Flame, Star, Award, Target } from "lucide-react"
import { LandingPage } from "@/components/landing-page"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  name: string
  description?: string
  url?: string
  date: string
}

interface UserData {
  name: string
  joinDate: string
  currentStreak: number
  longestStreak: number
  totalProjects: number
  lastProjectDate: string
  achievements: string[]
  projects: Project[]
}

interface ProjectIdea {
  id: string
  name: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  technologies: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  requirement: number
  type: "streak" | "total" | "milestone"
  unlocked: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  // Beginner Achievements (First Steps)
  {
    id: "first-project",
    title: "Hello World",
    description: "Complete your first coding project",
    icon: <Code className="w-4 h-4" />,
    requirement: 1,
    type: "total",
    unlocked: false,
  },
  {
    id: "second-day",
    title: "Back for More",
    description: "Code for 2 consecutive days",
    icon: <Flame className="w-4 h-4" />,
    requirement: 2,
    type: "streak",
    unlocked: false,
  },
  {
    id: "hat-trick",
    title: "Hat Trick",
    description: "Code for 3 consecutive days",
    icon: <Target className="w-4 h-4" />,
    requirement: 3,
    type: "streak",
    unlocked: false,
  },
  {
    id: "five-alive",
    title: "Five Alive",
    description: "Complete 5 coding projects",
    icon: <Star className="w-4 h-4" />,
    requirement: 5,
    type: "total",
    unlocked: false,
  },

  // Weekly Achievements
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Maintain a 7-day coding streak",
    icon: <Award className="w-4 h-4" />,
    requirement: 7,
    type: "streak",
    unlocked: false,
  },
  {
    id: "ten-strong",
    title: "Perfect Ten",
    description: "Code for 10 consecutive days",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 10,
    type: "streak",
    unlocked: false,
  },
  {
    id: "two-weeks",
    title: "Fortnight Fighter",
    description: "Maintain a 14-day coding streak",
    icon: <Flame className="w-4 h-4" />,
    requirement: 14,
    type: "streak",
    unlocked: false,
  },
  {
    id: "twenty-one",
    title: "Habit Former",
    description: "Code for 21 consecutive days",
    icon: <Target className="w-4 h-4" />,
    requirement: 21,
    type: "streak",
    unlocked: false,
  },

  // Monthly Achievements
  {
    id: "consistency-king",
    title: "Monthly Master",
    description: "Code for 30 consecutive days",
    icon: <Award className="w-4 h-4" />,
    requirement: 30,
    type: "streak",
    unlocked: false,
  },
  {
    id: "double-month",
    title: "Double Down",
    description: "Maintain a 60-day coding streak",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 60,
    type: "streak",
    unlocked: false,
  },
  {
    id: "quarter-year",
    title: "Quarter Champion",
    description: "Code for 90 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 90,
    type: "streak",
    unlocked: false,
  },
  {
    id: "half-year",
    title: "Half Year Hero",
    description: "Maintain a 180-day coding streak",
    icon: <Award className="w-4 h-4" />,
    requirement: 180,
    type: "streak",
    unlocked: false,
  },

  // Yearly Achievement
  {
    id: "year-champion",
    title: "Year Champion",
    description: "Maintain a 365-day streak",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 365,
    type: "streak",
    unlocked: false,
  },
  {
    id: "legend",
    title: "Coding Legend",
    description: "Code for 500 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 500,
    type: "streak",
    unlocked: false,
  },

  // Project Count Achievements
  {
    id: "dozen-projects",
    title: "Baker's Dozen",
    description: "Complete 12 coding projects",
    icon: <Code className="w-4 h-4" />,
    requirement: 12,
    type: "total",
    unlocked: false,
  },
  {
    id: "twenty-projects",
    title: "Score Keeper",
    description: "Complete 20 coding projects",
    icon: <Target className="w-4 h-4" />,
    requirement: 20,
    type: "total",
    unlocked: false,
  },
  {
    id: "fifty-projects",
    title: "Half Century",
    description: "Complete 50 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 50,
    type: "total",
    unlocked: false,
  },
  {
    id: "century-club",
    title: "Century Club",
    description: "Complete 100 coding projects",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 100,
    type: "total",
    unlocked: false,
  },
  {
    id: "double-century",
    title: "Double Century",
    description: "Complete 200 coding projects",
    icon: <Star className="w-4 h-4" />,
    requirement: 200,
    type: "total",
    unlocked: false,
  },
  {
    id: "triple-century",
    title: "Triple Century",
    description: "Complete 300 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 300,
    type: "total",
    unlocked: false,
  },

  // Special Milestone Achievements
  {
    id: "first-week",
    title: "Rookie Week",
    description: "Complete your first week of coding",
    icon: <Calendar className="w-4 h-4" />,
    requirement: 7,
    type: "streak",
    unlocked: false,
  },
  {
    id: "first-month",
    title: "Monthly Milestone",
    description: "Reach your first month of coding",
    icon: <Calendar className="w-4 h-4" />,
    requirement: 30,
    type: "streak",
    unlocked: false,
  },
  {
    id: "hundred-days",
    title: "Centurion",
    description: "Code for 100 consecutive days",
    icon: <Award className="w-4 h-4" />,
    requirement: 100,
    type: "streak",
    unlocked: false,
  },
  {
    id: "150-days",
    title: "Sesquicentennial",
    description: "Maintain a 150-day coding streak",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 150,
    type: "streak",
    unlocked: false,
  },
  {
    id: "200-days",
    title: "Bicentennial",
    description: "Code for 200 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 200,
    type: "streak",
    unlocked: false,
  },
  {
    id: "250-days",
    title: "Quarter Millennium",
    description: "Maintain a 250-day coding streak",
    icon: <Award className="w-4 h-4" />,
    requirement: 250,
    type: "streak",
    unlocked: false,
  },
  {
    id: "300-days",
    title: "Triple Century Streak",
    description: "Code for 300 consecutive days",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 300,
    type: "streak",
    unlocked: false,
  },

  // Fun Milestone Achievements
  {
    id: "lucky-seven",
    title: "Lucky Seven",
    description: "Complete 7 coding projects",
    icon: <Star className="w-4 h-4" />,
    requirement: 7,
    type: "total",
    unlocked: false,
  },
  {
    id: "lucky-thirteen",
    title: "Lucky Thirteen",
    description: "Maintain a 13-day coding streak",
    icon: <Target className="w-4 h-4" />,
    requirement: 13,
    type: "streak",
    unlocked: false,
  },
  {
    id: "sweet-sixteen",
    title: "Sweet Sixteen",
    description: "Code for 16 consecutive days",
    icon: <Award className="w-4 h-4" />,
    requirement: 16,
    type: "streak",
    unlocked: false,
  },
  {
    id: "dirty-thirty",
    title: "Dirty Thirty",
    description: "Complete 30 coding projects",
    icon: <Code className="w-4 h-4" />,
    requirement: 30,
    type: "total",
    unlocked: false,
  },
  {
    id: "nifty-fifty",
    title: "Nifty Fifty",
    description: "Maintain a 50-day coding streak",
    icon: <Flame className="w-4 h-4" />,
    requirement: 50,
    type: "streak",
    unlocked: false,
  },

  // Seasonal Achievements (based on days)
  {
    id: "spring-coder",
    title: "Spring Awakening",
    description: "Code for 45 consecutive days",
    icon: <Target className="w-4 h-4" />,
    requirement: 45,
    type: "streak",
    unlocked: false,
  },
  {
    id: "summer-warrior",
    title: "Summer Warrior",
    description: "Code for 75 consecutive days",
    icon: <Award className="w-4 h-4" />,
    requirement: 75,
    type: "streak",
    unlocked: false,
  },
  {
    id: "autumn-achiever",
    title: "Autumn Achiever",
    description: "Complete 75 coding projects",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 75,
    type: "total",
    unlocked: false,
  },
  {
    id: "winter-warrior",
    title: "Winter Warrior",
    description: "Code for 120 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 120,
    type: "streak",
    unlocked: false,
  },

  // Dedication Achievements
  {
    id: "unstoppable",
    title: "Unstoppable Force",
    description: "Code for 40 consecutive days",
    icon: <Flame className="w-4 h-4" />,
    requirement: 40,
    type: "streak",
    unlocked: false,
  },
  {
    id: "relentless",
    title: "Relentless Coder",
    description: "Code for 80 consecutive days",
    icon: <Target className="w-4 h-4" />,
    requirement: 80,
    type: "streak",
    unlocked: false,
  },
  {
    id: "marathon-runner",
    title: "Marathon Runner",
    description: "Complete 42 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 42,
    type: "total",
    unlocked: false,
  },
  {
    id: "iron-will",
    title: "Iron Will",
    description: "Code for 365 consecutive days",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 365,
    type: "streak",
    unlocked: false,
  },

  // Project Milestone Achievements
  {
    id: "project-enthusiast",
    title: "Project Enthusiast",
    description: "Complete 15 coding projects",
    icon: <Code className="w-4 h-4" />,
    requirement: 15,
    type: "total",
    unlocked: false,
  },
  {
    id: "project-master",
    title: "Project Master",
    description: "Complete 25 coding projects",
    icon: <Star className="w-4 h-4" />,
    requirement: 25,
    type: "total",
    unlocked: false,
  },
  {
    id: "project-guru",
    title: "Project Guru",
    description: "Complete 35 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 35,
    type: "total",
    unlocked: false,
  },
  {
    id: "project-legend",
    title: "Project Legend",
    description: "Complete 60 coding projects",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 60,
    type: "total",
    unlocked: false,
  },

  // Consistency Achievements
  {
    id: "steady-eddie",
    title: "Steady Eddie",
    description: "Code for 25 consecutive days",
    icon: <Target className="w-4 h-4" />,
    requirement: 25,
    type: "streak",
    unlocked: false,
  },
  {
    id: "persistent-programmer",
    title: "Persistent Programmer",
    description: "Code for 35 consecutive days",
    icon: <Flame className="w-4 h-4" />,
    requirement: 35,
    type: "streak",
    unlocked: false,
  },
  {
    id: "dedicated-developer",
    title: "Dedicated Developer",
    description: "Code for 55 consecutive days",
    icon: <Award className="w-4 h-4" />,
    requirement: 55,
    type: "streak",
    unlocked: false,
  },
  {
    id: "committed-coder",
    title: "Committed Coder",
    description: "Code for 65 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 65,
    type: "streak",
    unlocked: false,
  },

  // Elite Achievements
  {
    id: "elite-programmer",
    title: "Elite Programmer",
    description: "Complete 125 coding projects",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 125,
    type: "total",
    unlocked: false,
  },
  {
    id: "coding-machine",
    title: "Coding Machine",
    description: "Complete 150 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 150,
    type: "total",
    unlocked: false,
  },
  {
    id: "code-master",
    title: "Code Master",
    description: "Complete 175 coding projects",
    icon: <Star className="w-4 h-4" />,
    requirement: 175,
    type: "total",
    unlocked: false,
  },
  {
    id: "grand-master",
    title: "Grand Master",
    description: "Complete 250 coding projects",
    icon: <Trophy className="w-4 h-4" />,
    requirement: 250,
    type: "total",
    unlocked: false,
  },

  // Ultimate Achievements
  {
    id: "coding-deity",
    title: "Coding Deity",
    description: "Complete 365 coding projects",
    icon: <Award className="w-4 h-4" />,
    requirement: 365,
    type: "total",
    unlocked: false,
  },
  {
    id: "immortal-coder",
    title: "Immortal Coder",
    description: "Code for 1000 consecutive days",
    icon: <Star className="w-4 h-4" />,
    requirement: 1000,
    type: "streak",
    unlocked: false,
  },
]

export default function HomePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/app")
  }

  return <LandingPage onGetStarted={handleGetStarted} />
}
