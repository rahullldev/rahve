import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function InfoLayout({ title, children }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-20 space-y-10">

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          {children}
        </div>

      </div>
    </div>
  )
}