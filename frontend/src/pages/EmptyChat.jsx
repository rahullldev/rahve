import { motion } from "framer-motion"

const prompts = [
  "Healthy dinner recipe",
  "Reverse a linked list (Python)",
  "Summarize an article",
  "Explain quantum computing",
  "System design interview prep",
  "Weekly workout plan",
]

export default function EmptyChat() {

  const handlePromptClick = (text) => {
    const event = new CustomEvent("fillPrompt", { detail: text })
    window.dispatchEvent(event)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4 py-10 md:py-0">

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent"
      >
        Welcome to Rahve
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl"
      >
        Disembodied intelligence at your command.  
        Start with a question or try one of these.
      </motion.p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-3 max-w-3xl w-full">

        {prompts.map((prompt, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePromptClick(prompt)}
            className="
              cursor-pointer
              rounded-xl
              border
              bg-card
              p-3
              text-xs md:text-sm
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