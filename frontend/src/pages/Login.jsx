import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/auth-context"
import { Github, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Login() {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const identifier = watch("identifier")

    const onSubmit = async (data) => {
        setServerError("")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok) {
                setServerError(result.message || "Login failed")
                return
            }

            setUser(result.user)
            navigate("/ai")
        } catch (err) {
            setServerError("Something went wrong. Please try again.")
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "/api/auth/google"
    }

    const handleGithubLogin = () => {
        window.location.href = "/api/auth/github"
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-background px-4">

            {/* Brand */}
            <Link to="/" className="absolute top-6 left-6 flex items-center gap-3 group">
                <img src="/logo.svg" alt="Rahve logo" className="h-7 w-7 group-hover:scale-105 transition" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                    Rahve
                </span>
            </Link>

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] dark:bg-none" />

            <div className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-md p-8 shadow-lg space-y-6">

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center">
                        <img src="/logo.svg" alt="Rahve logo" className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                </div>

                {/* OAuth */}
                <div className="space-y-3">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:ring-2 hover:ring-primary/30 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="h-4 w-4"
                        />
                        Continue with Google
                    </button>

                    <button
                        onClick={handleGithubLogin}
                        className="flex items-center justify-center gap-2 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:ring-2 hover:ring-primary/30 transition"
                    >
                        <Github className="h-4 w-4" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="relative text-center text-xs text-muted-foreground">
                    <span className="bg-card px-2">OR</span>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10" />
                </div>

                {/* Server Error Display */}
                <AnimatePresence>
                    {serverError && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
                        >
                            <AlertCircle className="h-4 w-4" />
                            {serverError}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email stays visible */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
                            {...register("identifier", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                        {errors.identifier && (
                            <p className="text-xs text-destructive">
                                {errors.identifier.message}
                            </p>
                        )}
                    </div>

                    {/* Next button */}
                    {step === 1 && (
                        <button
                            type="button"
                            disabled={!identifier}
                            onClick={() => setStep(2)}
                            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    )}

                    {/* Password appears below email */}
                    <AnimatePresence>
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-destructive">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="font-medium text-primary hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    )
}