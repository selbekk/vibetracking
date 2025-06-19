"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Flame,
  Trophy,
  Target,
  Star,
  CheckCircle,
  ArrowRight,
  Github,
  Twitter,
  Heart,
  Sparkles,
  BarChart3,
  Gift,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LandingPageProps {
  onGetStarted: () => void
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    avatar: "SC",
    content:
      "This app completely changed my coding habits! I've maintained a 127-day streak and built 89 projects. The AI project ideas are incredibly inspiring.",
    rating: 5,
    streak: 127,
    projects: 89,
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Engineer",
    avatar: "MR",
    content:
      "Finally broke through my coding plateau! The achievement system keeps me motivated, and I love seeing my progress visualized. 200+ day streak and counting!",
    rating: 5,
    streak: 203,
    projects: 156,
  },
  {
    name: "Emily Watson",
    role: "CS Student",
    avatar: "EW",
    content:
      "As a student, this helped me build consistent coding habits. The project ideas feature is amazing - I never run out of things to build!",
    rating: 5,
    streak: 45,
    projects: 32,
  },
  {
    name: "David Kim",
    role: "Software Architect",
    avatar: "DK",
    content:
      "I've tried many habit trackers, but this one is specifically designed for developers. The gamification aspect makes daily coding addictive in the best way!",
    rating: 5,
    streak: 89,
    projects: 67,
  },
  {
    name: "Lisa Thompson",
    role: "Backend Developer",
    avatar: "LT",
    content:
      "Went from coding sporadically to having a solid daily routine. The achievement system celebrates every milestone, big or small. Highly recommend!",
    rating: 5,
    streak: 156,
    projects: 98,
  },
  {
    name: "Alex Johnson",
    role: "Mobile Developer",
    avatar: "AJ",
    content:
      "The AI project suggestions are spot-on! I've discovered new technologies and built projects I never would have thought of. My skills have grown tremendously.",
    rating: 5,
    streak: 78,
    projects: 54,
  },
]

const features = [
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Streak Tracking",
    description: "Build momentum with visual streak tracking that motivates you to code every single day.",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Achievement System",
    description: "Unlock 50+ achievements as you progress, from your first project to coding legend status.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "AI Project Ideas",
    description: "Never run out of inspiration with AI-generated project ideas tailored to your skill level.",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Progress Analytics",
    description: "Track your coding journey with detailed statistics and beautiful progress visualizations.",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Goal Setting",
    description: "Set and achieve coding goals with milestone tracking and progress indicators.",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Project Portfolio",
    description: "Build a comprehensive portfolio of your daily coding projects with descriptions and links.",
    color: "from-indigo-400 to-purple-400",
  },
]

const benefits = [
  "Build consistent coding habits that stick",
  "Stay motivated with gamification and achievements",
  "Never run out of project ideas with AI assistance",
  "Track your progress and celebrate milestones",
  "Join a community of dedicated developers",
  "Completely free - no hidden costs or subscriptions",
]

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Vibe tracking
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                <Gift className="w-3 h-3 mr-1" />
                100% Free
              </Badge>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Join developers building daily coding habits
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Coding Streak
              </span>
              <br />
              One Project at a Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your coding journey with daily habit tracking, AI-powered project ideas, and a gamified
              experience that makes consistent coding addictive. Completely free, forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-green-200 hover:bg-green-50 hover:border-green-300 text-green-600 px-8 py-4 text-lg font-medium"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Code Daily
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for developers who want to build consistent coding habits and grow
              their skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center text-white mb-4",
                      feature.color,
                    )}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Developers Choose{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Vibe tracking
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of developers who have transformed their coding habits and accelerated their growth with
                our proven system.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Building Habits Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">127 Days</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Projects</span>
                    <span className="font-semibold text-gray-900">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Achievements</span>
                    <span className="font-semibold text-gray-900">23/52</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Longest Streak</span>
                    <span className="font-semibold text-gray-900">127 days</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Achievement Unlocked!</span>
                  </div>
                  <span className="text-sm text-green-600">Centurion - 100 day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Developers Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Vibe tracking has helped developers build consistent coding habits and accelerate their growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Flame className="w-3 h-3" />
                      {testimonial.streak} day streak
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Code className="w-3 h-3" />
                      {testimonial.projects} projects
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Coding Journey?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building consistent coding habits and accelerating their growth. Start
            your streak today - it's completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-medium"
            >
              <Heart className="w-5 h-5 mr-2" />
              No Credit Card Required
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Vibe tracking</span>
            </div>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Vibe tracking. Made with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
