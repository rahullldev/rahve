import { motion } from "framer-motion"

const prompts = [
  "Give me a quick healthy dinner recipe",
  "Write a Python function to reverse a linked list",
  "Summarize this article for me",
  "Explain quantum computing in simple terms",
  "Help me prepare for a system design interview",
  "Create a weekly workout plan",
]

export default function EmptyChat() {

  const handlePromptClick = (text) => {
    const event = new CustomEvent("fillPrompt", { detail: text })
    window.dispatchEvent(event)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent"
      >
        Welcome to Rahve
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-muted-foreground max-w-xl"
      >
        Disembodied intelligence at your command.  
        Start by asking a question or try one of these prompts.
      </motion.p>

      {/* Prompt Grid */}
      <div className="mt-10 grid gap-4 md:grid-cols-2 max-w-3xl w-full">

        {prompts.map((prompt, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePromptClick(prompt)}
            className="
              cursor-pointer
              rounded-2xl
              border
              bg-card
              p-5
              text-sm
              text-left
              shadow-sm
              transition
              hover:ring-2
              hover:ring-primary/40
              hover:bg-primary/5
            "
          >
            {prompt}
          </motion.div>
        ))}

      </div>
    </div>
  )
}