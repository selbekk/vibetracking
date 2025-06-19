"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Code, Trophy, Flame, Star, Award, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Plus } from "lucide-react"

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

export default function CodingStreakTracker() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [name, setName] = useState("")
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [showProjectModal, setShowProjectModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectUrl, setProjectUrl] = useState("")

  const [showIdeasModal, setShowIdeasModal] = useState(false)
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([])
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("codingStreakData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setUserData(data)
      setIsRegistered(true)
      updateAchievements(data, true) // Pass true for initial load
    }
    setIsInitialLoad(false)
  }, [])

  const saveUserData = (data: UserData) => {
    localStorage.setItem("codingStreakData", JSON.stringify(data))
    setUserData(data)
  }

  const updateAchievements = (data: UserData, isInitialLoad = false) => {
    const updatedAchievements = achievements.map((achievement) => {
      const isUnlocked = data.achievements.includes(achievement.id)
      let shouldUnlock = false

      if (!isUnlocked) {
        if (achievement.type === "streak" && data.currentStreak >= achievement.requirement) {
          shouldUnlock = true
        } else if (achievement.type === "total" && data.totalProjects >= achievement.requirement) {
          shouldUnlock = true
        }
      }

      return {
        ...achievement,
        unlocked: isUnlocked || shouldUnlock,
      }
    })

    setAchievements(updatedAchievements)

    // Only check for new achievements if this is NOT the initial load
    if (!isInitialLoad) {
      const newAchievements = updatedAchievements.filter(
        (achievement, index) => achievement.unlocked && !achievements[index].unlocked,
      )

      if (newAchievements.length > 0) {
        const updatedUserData = {
          ...data,
          achievements: [...data.achievements, ...newAchievements.map((a) => a.id)],
        }
        saveUserData(updatedUserData)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
    }
  }

  const handleRegistration = () => {
    if (name.trim()) {
      const newUserData: UserData = {
        name: name.trim(),
        joinDate: new Date().toISOString(),
        currentStreak: 0,
        longestStreak: 0,
        totalProjects: 0,
        lastProjectDate: "",
        achievements: [],
        projects: [],
      }
      saveUserData(newUserData)
      setIsRegistered(true)
      updateAchievements(newUserData)
    }
  }

  const addProject = () => {
    if (!userData || !projectName.trim()) return

    const today = new Date().toDateString()
    const lastProjectDate = userData.lastProjectDate ? new Date(userData.lastProjectDate).toDateString() : ""

    if (lastProjectDate === today) {
      return
    }

    let newStreak = userData.currentStreak

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayString = yesterday.toDateString()

    if (lastProjectDate === yesterdayString || userData.currentStreak === 0) {
      newStreak = userData.currentStreak + 1
    } else {
      newStreak = 1
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName.trim(),
      description: projectDescription.trim() || undefined,
      url: projectUrl.trim() || undefined,
      date: new Date().toISOString(),
    }

    const updatedUserData: UserData = {
      ...userData,
      currentStreak: newStreak,
      longestStreak: Math.max(userData.longestStreak, newStreak),
      totalProjects: userData.totalProjects + 1,
      lastProjectDate: new Date().toISOString(),
      projects: [newProject, ...userData.projects],
    }

    saveUserData(updatedUserData)
    updateAchievements(updatedUserData)

    // Reset form and close modal
    setProjectName("")
    setProjectDescription("")
    setProjectUrl("")
    setShowProjectModal(false)
  }

  const canAddProject = () => {
    if (!userData) return false
    const today = new Date().toDateString()
    const lastProjectDate = userData.lastProjectDate ? new Date(userData.lastProjectDate).toDateString() : ""
    return lastProjectDate !== today
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 365) return "from-purple-400 to-pink-400"
    if (streak >= 100) return "from-yellow-400 to-orange-400"
    if (streak >= 30) return "from-blue-400 to-cyan-400"
    if (streak >= 7) return "from-green-400 to-emerald-400"
    return "from-gray-400 to-gray-500"
  }

  // Add this helper function after the getStreakColor function
  const getNextAchievements = (userData: UserData, achievements: Achievement[]) => {
    // Get unlocked achievements
    const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked)

    // Get locked achievements and calculate how close user is to unlocking them
    const lockedAchievements = achievements
      .filter((achievement) => !achievement.unlocked)
      .map((achievement) => {
        let progress = 0
        let current = 0

        if (achievement.type === "streak") {
          current = userData.currentStreak
          progress = Math.min(current / achievement.requirement, 1)
        } else if (achievement.type === "total") {
          current = userData.totalProjects
          progress = Math.min(current / achievement.requirement, 1)
        }

        return {
          ...achievement,
          progress,
          current,
          remaining: Math.max(0, achievement.requirement - current),
        }
      })
      .sort((a, b) => b.progress - a.progress) // Sort by progress (closest first)
      .slice(0, 3) // Take only the next 3

    return { unlockedAchievements, nextAchievements: lockedAchievements }
  }

  const openProjectModal = () => {
    if (canAddProject()) {
      setShowProjectModal(true)
    }
  }

  const generateProjectIdeas = async () => {
    setIsGeneratingIdeas(true)
    try {
      const res = await fetch("/api/project-ideas", { method: "POST" })
      if (!res.ok) throw new Error("Request failed")
      const { ideas } = await res.json()
      setProjectIdeas(ideas)
    } catch (err) {
      console.error("Error fetching ideas:", err)
      // The API already returns fallback ideas, but double-check just in case
      if (projectIdeas.length === 0) {
        setProjectIdeas([
          {
            id: "local-fallback",
            name: "Random Quote App",
            description: "Displays a random inspirational quote each time you click.",
            difficulty: "Beginner",
            technologies: ["HTML", "CSS", "JavaScript"],
          },
        ])
      }
    } finally {
      setIsGeneratingIdeas(false)
      setShowIdeasModal(true)
    }
  }

  const useProjectIdea = (idea: ProjectIdea) => {
    setProjectName(idea.name)
    setProjectDescription(idea.description)
    setSelectedIdea(idea)
    setShowIdeasModal(false)
    setShowProjectModal(true)
  }

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Daily Code Quest
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              Welcome to your coding journey! Build something new every day and watch your skills grow. Consistency is
              the key to mastery.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                What should we call you?
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                onKeyDown={(e) => e.key === "Enter" && handleRegistration()}
              />
            </div>
            <Button
              onClick={handleRegistration}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-105"
              disabled={!name.trim()}
            >
              Start My Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 p-4">
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <Card className="bg-white p-8 text-center shadow-2xl border-0 animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Achievement Unlocked!</h2>
            <p className="text-gray-600">You're making amazing progress!</p>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome back, {userData?.name}!
          </h1>
          <p className="text-gray-600">Keep building, keep growing</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", getStreakColor(userData?.currentStreak || 0))}>
                  <Flame className="w-5 h-5 text-white" />
                </div>
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800 mb-2">{userData?.currentStreak || 0} days</div>
              <Progress
                value={Math.min(((userData?.currentStreak || 0) / 30) * 100, 100)}
                className="h-2 bg-green-100"
              />
              <p className="text-sm text-gray-500 mt-2">
                Next milestone: {userData?.currentStreak && userData.currentStreak >= 30 ? "100 days" : "30 days"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800 mb-2">{userData?.totalProjects || 0}</div>
              <Progress
                value={Math.min(((userData?.totalProjects || 0) / 100) * 100, 100)}
                className="h-2 bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-2">
                Next milestone:{" "}
                {userData?.totalProjects && userData.totalProjects >= 100 ? "500 projects" : "100 projects"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                Longest Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800 mb-2">{userData?.longestStreak || 0} days</div>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-500">Personal best</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={openProjectModal}
            disabled={!canAddProject()}
            className={cn(
              "px-8 py-3 text-lg font-medium transition-all duration-300 transform",
              canAddProject()
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed",
            )}
          >
            {canAddProject() ? (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Log Today's Project
              </>
            ) : (
              <>
                <Code className="w-5 h-5 mr-2" />
                Project Logged for Today!
              </>
            )}
          </Button>
          {canAddProject() && (
            <div className="text-center mt-4">
              <Button
                onClick={generateProjectIdeas}
                disabled={isGeneratingIdeas}
                variant="outline"
                className="bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-600"
              >
                {isGeneratingIdeas ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Get Project Ideas
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Project Modal */}
        <Dialog
          open={showProjectModal}
          onOpenChange={(open) => {
            setShowProjectModal(open)
            if (!open) {
              setSelectedIdea(null)
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-600" />
                Log Today's Project
              </DialogTitle>
              <DialogDescription>
                {selectedIdea
                  ? `Using AI-suggested idea: ${selectedIdea.name}`
                  : "Add details about the project you built today to maintain your coding streak."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-sm font-medium">
                  Project Name *
                </Label>
                <Input
                  id="project-name"
                  placeholder="e.g., Todo App, Weather Dashboard"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description" className="text-sm font-medium">
                  Description (optional)
                </Label>
                <Textarea
                  id="project-description"
                  placeholder="Brief description of what you built..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-url" className="text-sm font-medium">
                  Project URL (optional)
                </Label>
                <Input
                  id="project-url"
                  placeholder="https://github.com/username/project or live demo URL"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowProjectModal(false)}
                className="bg-white border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={addProject}
                disabled={!projectName.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Log Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Project Ideas Modal */}
        <Dialog open={showIdeasModal} onOpenChange={setShowIdeasModal}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                AI-Generated Project Ideas
              </DialogTitle>
              <DialogDescription>
                Fresh coding project ideas to keep your streak going. Click on any idea to use it for today's project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {projectIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    setSelectedIdea(idea)
                    setShowIdeasModal(false)
                    setShowProjectModal(true)
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{idea.name}</h3>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        idea.difficulty === "Beginner" && "bg-green-100 text-green-700",
                        idea.difficulty === "Intermediate" && "bg-yellow-100 text-yellow-700",
                        idea.difficulty === "Advanced" && "bg-red-100 text-red-700",
                      )}
                    >
                      {idea.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowIdeasModal(false)}
                className="bg-white border-gray-300 hover:bg-gray-50"
              >
                Close
              </Button>
              <Button
                onClick={generateProjectIdeas}
                disabled={isGeneratingIdeas}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                {isGeneratingIdeas ? "Generating..." : "Generate New Ideas"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Recent Projects */}
        {userData?.projects && userData.projects.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                Recent Projects
              </CardTitle>
              <CardDescription>Your latest coding achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.projects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                        {project.description && <p className="text-sm text-gray-600 mb-2">{project.description}</p>}
                        <p className="text-xs text-gray-500">
                          {new Date(project.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      {project.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white border-green-200 hover:bg-green-50 hover:border-green-300"
                          onClick={() => window.open(project.url, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {userData.projects.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    And {userData.projects.length - 5} more projects...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Achievements
            </CardTitle>
            <CardDescription>
              {userData && getNextAchievements(userData, achievements).unlockedAchievements.length > 0
                ? `${getNextAchievements(userData, achievements).unlockedAchievements.length} unlocked • Next milestones coming up`
                : "Start coding to unlock your first achievements!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userData &&
              (() => {
                const { unlockedAchievements, nextAchievements } = getNextAchievements(userData, achievements)

                return (
                  <div className="space-y-6">
                    {/* Unlocked Achievements */}
                    {unlockedAchievements.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Unlocked ({unlockedAchievements.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {unlockedAchievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className="p-4 rounded-lg border-2 border-green-200 bg-green-50 shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-green-500 text-white">{achievement.icon}</div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                    Unlocked
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Achievements */}
                    {nextAchievements.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-blue-600 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Next Milestones
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {nextAchievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50 shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500 text-white">{achievement.icon}</div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                                  <div className="space-y-2">
                                    <Progress value={achievement.progress * 100} className="h-2 bg-blue-100" />
                                    <div className="flex justify-between text-xs text-gray-500">
                                      <span>
                                        {achievement.current} / {achievement.requirement}
                                      </span>
                                      <span>{achievement.remaining} to go</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {unlockedAchievements.length === 0 && nextAchievements.length === 0 && (
                      <div className="text-center py-8">
                        <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Start your coding journey to unlock achievements!</p>
                      </div>
                    )}
                  </div>
                )
              })()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
