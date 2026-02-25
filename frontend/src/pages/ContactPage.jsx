import { useState } from "react"
import InfoLayout from "../layout/InfoLayout"
import { Button } from "@/components/ui/button"

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("/api/chat/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    setSuccess(true)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <InfoLayout title="Contact Us">

      {success && (
        <div className="text-green-500 font-medium">
          Message sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full rounded-xl border px-4 py-3 bg-background"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          className="w-full rounded-xl border px-4 py-3 bg-background"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={5}
          className="w-full rounded-xl border px-4 py-3 bg-background"
          required
        />

        <Button type="submit">
          Send Message
        </Button>

      </form>

    </InfoLayout>
  )
}