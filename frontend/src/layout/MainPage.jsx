// import { motion, useMotionValue, useTransform } from "framer-motion"
// import { Link, useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Moon, Sun } from "lucide-react"
// import { useEffect } from "react"

// export default function MainPage() {
//   const navigate = useNavigate()


//   // useEffect(() => {
//   //   const savedTheme = localStorage.getItem("theme")

//   //   if (savedTheme === "light") {
//   //     document.documentElement.classList.remove("dark")
//   //   } else {
//   //     // Default = dark
//   //     document.documentElement.classList.add("dark")
//   //   }
//   // }, [])

//   // const toggleDark = () => {
//   //   document.documentElement.classList.toggle("dark")
//   // }
//   const toggleDark = () => {
//     const isDark = document.documentElement.classList.toggle("dark")

//     localStorage.setItem("theme", isDark ? "dark" : "light")
//   }


//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const rotateX = useTransform(mouseY, [-300, 300], [6, -6])
//   const rotateY = useTransform(mouseX, [-300, 300], [-6, 6])

//   const handleMouseMove = (e) => {
//     mouseX.set(e.clientX - window.innerWidth / 2)
//     mouseY.set(e.clientY - window.innerHeight / 2)
//   }

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen bg-background text-foreground transition-colors duration-500"
//     >
//       {/* NAVBAR */}
//       <header className="fixed top-0 left-0 w-full z-50 border-b bg-primary/5 dark:bg-background/70 backdrop-blur-md">
//         <div className="max-w-6xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="flex items-center gap-3 group"
//           >
//             {/* Logo Icon */}
//             <img
//               src="/logo.svg"
//               alt="Rahve logo"
//               className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
//             />

//             {/* Brand Name */}
//             <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-80">
//               Rahve
//             </span>
//           </Link>

//           {/* NAV LINKS */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
//             <Link to="/" className="hover:text-primary transition">
//               Home
//             </Link>
//             <Link to="/about" className="hover:text-primary transition">
//               About
//             </Link>
//             <Link to="/contact" className="hover:text-primary transition">
//               Contact
//             </Link>
//           </nav>

//           {/* ACTIONS */}
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleDark}
//               className="rounded-full"
//             >
//               <Moon className="h-4 w-4 dark:hidden" />
//               <Sun className="hidden h-4 w-4 dark:block" />
//             </Button>

//             <Button onClick={() => navigate("/ai")} className="hidden md:inline-flex">
//               Get Started
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="mx-auto max-w-6xl px-6 md:px-20 pt-40 pb-24 space-y-20">

//         {/* HERO */}
//         <motion.section
//           style={{ rotateX, rotateY }}
//           className="text-center space-y-6 [transform-style:preserve-3d]"
//         >
//           <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
//             Disembodied Intelligence.
//           </h1>

//           <p className="max-w-xl mx-auto text-lg text-muted-foreground">
//             Private AI chats, collaborative group discussions, and amplified
//             thinking — powered by Rahve.
//           </p>

//           <div className="flex justify-center gap-4 pt-4">
//             <Button size="lg" onClick={() => navigate("/ai")}>
//               Start Chatting
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               onClick={() => navigate("/learn-more")}
//             >
//               Learn More
//             </Button>
//           </div>
//         </motion.section>

//         {/* CARDS */}
//         <section className="grid gap-8 md:grid-cols-2">

//           <motion.div
//             whileHover={{ y: -6 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             onClick={() => navigate("/ai")}
//             className="cursor-pointer rounded-2xl border bg-primary/5 dark:bg-card p-8 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-primary/40 transition"
//           >
//             <h2 className="text-xl font-semibold mb-2">
//               One-to-One AI Chat
//             </h2>
//             <p className="text-muted-foreground mb-4">
//               Focused, private conversations for learning, coding,
//               brainstorming, or solving complex problems.
//             </p>
//             <span className="text-primary font-medium">
//               Start chatting →
//             </span>
//           </motion.div>

//           <motion.div
//             whileHover={{ y: -4 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="
//     relative
//     rounded-2xl
//     border
//     bg-primary/5
//     dark:bg-card
//     p-8
//     shadow-sm
//     opacity-80
//     cursor-not-allowed
//   "
//           >

//             {/* Coming Soon Badge */}
//             <div className="absolute top-4 right-4">
//               <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-chart-3/20 text-primary">
//                 Coming Soon
//               </span>
//             </div>

//             <h2 className="text-xl font-semibold mb-2">
//               Group Intelligence
//             </h2>

//             <p className="text-muted-foreground mb-4">
//               Collaborate with others while Rahve participates, answers
//               questions, and summarizes discussions.
//             </p>

//             <span className="text-muted-foreground font-medium">
//               Explore groups →
//             </span>

//           </motion.div>

//         </section>

//         {/* FOOTER */}
//         <footer className="border-t pt-8 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
//           <span>© 2026 Rahve AI</span>

//           <div className="flex gap-6">

//             <Link
//               to="/about"
//               className="hover:text-primary transition"
//             >
//               About
//             </Link>

//             <Link
//               to="/contact"
//               className="hover:text-primary transition"
//             >
//               Contact
//             </Link>

//             <Link
//               to="/privacy"
//               className="hover:text-primary transition"
//             >
//               Privacy
//             </Link>



//           </div>
//         </footer>

//       </main>
//     </div>
//   )
// }










import { motion, useMotionValue, useTransform } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import {
  Moon,
  Sun,
  Shield,
  Zap,
  Brain,
  Github,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react"

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
      <main className="mx-auto max-w-7xl px-6 md:px-20 pt-40 pb-24 space-y-32">

  {/* HERO */}
  <motion.section
    style={{ rotateX, rotateY }}
    className="text-center space-y-8 [transform-style:preserve-3d]"
  >
    <Badge
      variant="secondary"
      className="px-4 py-1 text-sm"
    >
      ✨ Powered by Modern AI Models
    </Badge>

    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
      Think Faster
      <span className="block bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
        With AI
      </span>
    </h1>

    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
      Private conversations, intelligent assistance,
      and collaborative AI experiences built for
      students, developers, researchers and professionals.
    </p>

    <div className="flex justify-center gap-4 pt-4">
      <Button
        size="lg"
        onClick={() => navigate("/ai")}
      >
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

  {/* STATS */}
  <section className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {[
      ["10K+", "Messages Processed"],
      ["99.9%", "Availability"],
      ["500+", "Users"],
      ["24/7", "AI Assistance"],
    ].map(([value, label]) => (
      <Card
        key={label}
        className="bg-primary/5"
      >
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold">
            {value}
          </h3>

          <p className="text-sm text-muted-foreground">
            {label}
          </p>
        </CardContent>
      </Card>
    ))}
  </section>

  {/* FEATURES */}
  <section className="space-y-10">

    <div className="text-center">
      <h2 className="text-4xl font-bold">
        AI Experiences
      </h2>

      <p className="mt-3 text-muted-foreground">
        Built for conversations, collaboration and knowledge.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">

      <motion.div
        whileHover={{ y: -6 }}
        transition={{
          type: "spring",
          stiffness: 200
        }}
        onClick={() => navigate("/ai")}
      >
        <Card className="cursor-pointer hover:border-primary hover:shadow-xl transition-all duration-300">

          <CardContent className="p-8">

            <h2 className="text-2xl font-semibold mb-3">
              One-to-One AI Chat
            </h2>

            <p className="text-muted-foreground mb-6">
              Focused, private conversations for
              learning, coding, brainstorming,
              writing and solving complex problems.
            </p>

            <span className="text-primary font-medium">
              Start chatting →
            </span>

          </CardContent>

        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -6 }}
        transition={{
          type: "spring",
          stiffness: 200
        }}
      >
        <Card className="opacity-90">

          <CardContent className="p-8 relative">

            <Badge
              className="absolute top-5 right-5"
            >
              Coming Soon
            </Badge>

            <h2 className="text-2xl font-semibold mb-3">
              Group Intelligence
            </h2>

            <p className="text-muted-foreground mb-6">
              Collaborate with others while Rahve
              participates, answers questions,
              summarizes discussions and keeps
              everyone aligned.
            </p>

            <span className="text-muted-foreground font-medium">
              Explore groups →
            </span>

          </CardContent>

        </Card>
      </motion.div>

    </div>

  </section>

  {/* WHY RAHVE */}
  <section className="space-y-12">

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        Why Rahve
      </h2>

      <p className="mt-3 text-muted-foreground">
        Designed for modern AI interactions.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <Card>
        <CardContent className="p-8">

          <Shield className="h-10 w-10 mb-4 text-primary" />

          <h3 className="font-semibold text-lg mb-2">
            Privacy First
          </h3>

          <p className="text-muted-foreground">
            Your conversations remain yours with
            secure authentication and protected access.
          </p>

        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-8">

          <Zap className="h-10 w-10 mb-4 text-primary" />

          <h3 className="font-semibold text-lg mb-2">
            Fast Responses
          </h3>

          <p className="text-muted-foreground">
            Optimized backend architecture delivers
            quick and reliable AI responses.
          </p>

        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-8">

          <Brain className="h-10 w-10 mb-4 text-primary" />

          <h3 className="font-semibold text-lg mb-2">
            Built For Thinking
          </h3>

          <p className="text-muted-foreground">
            Learn, code, research and brainstorm
            using an AI companion built to amplify ideas.
          </p>

        </CardContent>
      </Card>

    </div>

  </section>

  <Separator />
  {/* ENGINEERING HIGHLIGHTS */}
  <section className="space-y-12">

    <div className="text-center">
      <h2 className="text-4xl font-bold">
        Built Like A Real Product
      </h2>

      <p className="mt-3 text-muted-foreground">
        Modern technologies powering Rahve AI.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {[
        "JWT Authentication",
        "Google OAuth Integration",
        "GitHub OAuth Integration",
        "MongoDB Database",
        "REST API Architecture",
        "Protected Routes",
        "Session Persistence",
        "Responsive Design",
        "Cloud Deployment",
      ].map((item) => (
        <Card
          key={item}
          className="hover:border-primary transition-all"
        >
          <CardContent className="p-5">
            <span className="font-medium">
              ✓ {item}
            </span>
          </CardContent>
        </Card>
      ))}

    </div>

  </section>

  <Separator />

  {/* PRICING */}
  <section className="space-y-12">

    <div className="text-center">
      <h2 className="text-4xl font-bold">
        Simple Pricing
      </h2>

      <p className="mt-3 text-muted-foreground">
        Start free and upgrade when you need more.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">

      {/* FREE */}

      <Card>

        <CardContent className="p-8">

          <h3 className="text-2xl font-bold mb-2">
            Free
          </h3>

          <p className="text-muted-foreground mb-6">
            Perfect for getting started.
          </p>

          <div className="text-5xl font-bold mb-8">
            $0
            <span className="text-lg text-muted-foreground">
              /month
            </span>
          </div>

          <div className="space-y-3 mb-8">

            <div>✓ AI Conversations</div>
            <div>✓ Conversation History</div>
            <div>✓ Community Support</div>
            <div>✓ Cross Device Access</div>

          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

        </CardContent>

      </Card>

      {/* PRO */}

      <Card className="border-primary relative">

        <Badge
          className="absolute top-4 right-4"
        >
          Most Popular
        </Badge>

        <CardContent className="p-8">

          <h3 className="text-2xl font-bold mb-2">
            Pro
          </h3>

          <p className="text-muted-foreground mb-6">
            Built for power users.
          </p>

          <div className="text-5xl font-bold mb-8">
            $9
            <span className="text-lg text-muted-foreground">
              /month
            </span>
          </div>

          <div className="space-y-3 mb-8">

            <div>✓ Unlimited Messages</div>
            <div>✓ Priority Responses</div>
            <div>✓ Advanced Models</div>
            <div>✓ Early Feature Access</div>
            <div>✓ Premium Support</div>

          </div>

          <Button
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Upgrade To Pro
          </Button>

        </CardContent>

      </Card>

    </div>

  </section>

  <Separator />

  {/* ROADMAP */}

  <section className="space-y-12">

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        Product Roadmap
      </h2>

      <p className="mt-3 text-muted-foreground">
        Building the future of collaborative AI.
      </p>

    </div>

    <div className="grid md:grid-cols-2 gap-8">

      <Card>

        <CardContent className="p-8">

          <h3 className="text-xl font-bold mb-6">
            Available Today
          </h3>

          <div className="space-y-4">

            <div>✓ AI Conversations</div>
            <div>✓ Chat History</div>
            <div>✓ OAuth Authentication</div>
            <div>✓ Responsive Experience</div>
            <div>✓ Dark Mode</div>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardContent className="p-8">

          <h3 className="text-xl font-bold mb-6">
            Coming Soon
          </h3>

          <div className="space-y-4">

            <div>□ Voice Conversations</div>
            <div>□ Group Intelligence</div>
            <div>□ File Upload Support</div>
            <div>□ Team Workspaces</div>
            <div>□ AI Agents</div>

          </div>

        </CardContent>

      </Card>

    </div>

  </section>

  <Separator />

  {/* FAQ */}

  <section
    id="faq"
    className="space-y-12"
  >

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        Frequently Asked Questions
      </h2>

      <p className="mt-3 text-muted-foreground">
        Everything you need to know about Rahve.
      </p>

    </div>

    <Accordion
      type="single"
      collapsible
      className="max-w-3xl mx-auto"
    >

      <AccordionItem value="item-1">

        <AccordionTrigger>
          Is Rahve AI free?
        </AccordionTrigger>

        <AccordionContent>
          Yes. Rahve AI provides a free tier
          allowing users to experience AI-powered
          conversations at no cost.
        </AccordionContent>

      </AccordionItem>

      <AccordionItem value="item-2">

        <AccordionTrigger>
          Do I need an account?
        </AccordionTrigger>

        <AccordionContent>
          Yes. Creating an account allows you
          to save conversations and access
          personalized features.
        </AccordionContent>

      </AccordionItem>

      <AccordionItem value="item-3">

        <AccordionTrigger>
          Which AI models power Rahve?
        </AccordionTrigger>

        <AccordionContent>
          Rahve integrates modern large language
          models to provide intelligent responses
          and conversational assistance.
        </AccordionContent>

      </AccordionItem>

      <AccordionItem value="item-4">

        <AccordionTrigger>
          Is my data secure?
        </AccordionTrigger>

        <AccordionContent>
          Security is a priority. Authentication,
          protected routes and secure storage
          practices help safeguard user data.
        </AccordionContent>

      </AccordionItem>

      <AccordionItem value="item-5">

        <AccordionTrigger>
          Can I use Rahve on mobile?
        </AccordionTrigger>

        <AccordionContent>
          Yes. Rahve is fully responsive and works
          across desktops, tablets and mobile devices.
        </AccordionContent>

      </AccordionItem>

    </Accordion>

  </section>

  <Separator />
{/* FINAL CTA */}

<section className="text-center py-10">

  <Badge
    variant="secondary"
    className="mb-6"
  >
    Join The Future Of AI
  </Badge>

  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    Start Thinking
    <span className="block bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
      With Rahve Today
    </span>
  </h2>

  <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
    Explore intelligent conversations,
    boost productivity and collaborate
    with next-generation AI experiences.
  </p>

  <div className="flex justify-center gap-4">

    <Button
      size="lg"
      onClick={() => navigate("/ai")}
    >
      Get Started
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>

    <Button
      variant="outline"
      size="lg"
      onClick={() => navigate("/about")}
    >
      Learn More
    </Button>

  </div>

</section>

<Separator />

{/* FOOTER */}

<footer className="pt-10 pb-8">

  <div className="grid md:grid-cols-4 gap-10">

    {/* BRAND */}

    <div>

      <div className="flex items-center gap-3 mb-4">

        <img
          src="/logo.svg"
          alt="Rahve"
          className="h-8 w-8"
        />

        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
          Rahve
        </span>

      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Disembodied Intelligence.
        Modern AI conversations designed
        for learning, productivity and
        collaboration.
      </p>

    </div>

    {/* PRODUCT */}

    <div>

      <h4 className="font-semibold mb-4">
        Product
      </h4>

      <div className="space-y-3 text-sm">

        <button
          onClick={() =>
            document
              .getElementById("features")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="block text-muted-foreground hover:text-primary transition"
        >
          Features
        </button>

        <button
          onClick={() =>
            document
              .getElementById("pricing")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="block text-muted-foreground hover:text-primary transition"
        >
          Pricing
        </button>

        <button
          onClick={() =>
            document
              .getElementById("faq")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="block text-muted-foreground hover:text-primary transition"
        >
          FAQ
        </button>

      </div>

    </div>

    {/* RESOURCES */}

    <div>

      <h4 className="font-semibold mb-4">
        Resources
      </h4>

      <div className="space-y-3 text-sm">

        <Link
          to="/about"
          className="block text-muted-foreground hover:text-primary transition"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="block text-muted-foreground hover:text-primary transition"
        >
          Contact
        </Link>

        <Link
          to="/privacy"
          className="block text-muted-foreground hover:text-primary transition"
        >
          Privacy
        </Link>

      </div>

    </div>

    {/* SOCIAL */}

    <div>

      <h4 className="font-semibold mb-4">
        Connect
      </h4>

      <div className="space-y-4">

        <a
          href="#"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>

        <a
          href="#"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </a>

        <a
          href="#"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
        >
          <Mail className="h-4 w-4" />
          Contact
        </a>

      </div>

    </div>

  </div>

  <Separator className="my-8" />

  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">

    <span>
      © 2026 Rahve AI. All rights reserved.
    </span>

    <div className="flex gap-6">

      <Link
        to="/privacy"
        className="hover:text-primary transition"
      >
        Privacy Policy
      </Link>

      <Link
        to="/terms"
        className="hover:text-primary transition"
      >
        Terms
      </Link>

    </div>

  </div>

</footer>

</main>
</div>
  )
}