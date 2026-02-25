import { motion, useMotionValue, useTransform } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export default function MainPage() {
  const navigate = useNavigate()


  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme")

  //   if (savedTheme === "light") {
  //     document.documentElement.classList.remove("dark")
  //   } else {
  //     // Default = dark
  //     document.documentElement.classList.add("dark")
  //   }
  // }, [])

  // const toggleDark = () => {
  //   document.documentElement.classList.toggle("dark")
  // }
  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark")

    localStorage.setItem("theme", isDark ? "dark" : "light")
  }


  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6])
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6])

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-background text-foreground transition-colors duration-500"
    >
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 border-b bg-primary/5 dark:bg-background/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            {/* Logo Icon */}
            <img
              src="/logo.svg"
              alt="Rahve logo"
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Brand Name */}
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-80">
              Rahve
            </span>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full"
            >
              <Moon className="h-4 w-4 dark:hidden" />
              <Sun className="hidden h-4 w-4 dark:block" />
            </Button>

            <Button onClick={() => navigate("/ai")} className="hidden md:inline-flex">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-6 md:px-20 pt-40 pb-24 space-y-20">

        {/* HERO */}
        <motion.section
          style={{ rotateX, rotateY }}
          className="text-center space-y-6 [transform-style:preserve-3d]"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Disembodied Intelligence.
          </h1>

          <p className="max-w-xl mx-auto text-lg text-muted-foreground">
            Private AI chats, collaborative group discussions, and amplified
            thinking — powered by Rahve.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => navigate("/ai")}>
              Start Chatting
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/learn-more")}
            >
              Learn More
            </Button>
          </div>
        </motion.section>

        {/* CARDS */}
        <section className="grid gap-8 md:grid-cols-2">

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/ai")}
            className="cursor-pointer rounded-2xl border bg-primary/5 dark:bg-card p-8 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-primary/40 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              One-to-One AI Chat
            </h2>
            <p className="text-muted-foreground mb-4">
              Focused, private conversations for learning, coding,
              brainstorming, or solving complex problems.
            </p>
            <span className="text-primary font-medium">
              Start chatting →
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="
    relative
    rounded-2xl
    border
    bg-primary/5
    dark:bg-card
    p-8
    shadow-sm
    opacity-80
    cursor-not-allowed
  "
          >

            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-chart-3/20 text-primary">
                Coming Soon
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Group Intelligence
            </h2>

            <p className="text-muted-foreground mb-4">
              Collaborate with others while Rahve participates, answers
              questions, and summarizes discussions.
            </p>

            <span className="text-muted-foreground font-medium">
              Explore groups →
            </span>

          </motion.div>

        </section>

        {/* FOOTER */}
        <footer className="border-t pt-8 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
          <span>© 2026 Rahve AI</span>

          <div className="flex gap-6">

            <Link
              to="/about"
              className="hover:text-primary transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-primary transition"
            >
              Contact
            </Link>

            <Link
              to="/privacy"
              className="hover:text-primary transition"
            >
              Privacy
            </Link>



          </div>
        </footer>

      </main>
    </div>
  )
}