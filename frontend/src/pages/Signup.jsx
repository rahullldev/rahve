import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Github } from "lucide-react"

export default function Signup() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error("Signup failed")
        }

        navigate("/ai")
    }

    const handleGoogleSignup = () => {
        window.location.href = "/api/auth/google"
    }

    const handleGithubSignup = () => {
        window.location.href = "/api/auth/github"
    }

    const handleTwitterSignup = () => {
        window.location.href = "/api/auth/twitter"
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-background px-4">

            {/* Top Left Brand */}
            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center gap-3 group"
            >
                {/* Logo */}
                <img
                    src="/logo.svg"
                    alt="Rahve logo"
                    className="h-7 w-7 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Brand Text */}
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-80">
                    Rahve
                </span>
            </Link>

            {/* Subtle Violet Glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] dark:bg-none" />

            <div className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-md p-8 shadow-lg space-y-6 transition">

                {/* Card Brand */}
                <div className="text-center space-y-3">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src="/logo.svg"
                            alt="Rahve logo"
                            className="h-10 w-10"
                        />
                    </div>

                    {/* Brand Name */}
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                        Rahve
                    </h1>

                    {/* Tagline */}
                    <p className="text-sm text-muted-foreground">
                        Create your intelligence account.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative text-center text-xs text-muted-foreground">
                    <span className="bg-card px-2">OR</span>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10" />
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">

                    <button
                        onClick={handleGoogleSignup}
                        className="flex items-center justify-center gap-2 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:ring-2 hover:ring-primary/30 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="h-4 w-4"
                        />
                        Continue with Google
                    </button>

                    <button
                        onClick={handleGithubSignup}
                        className="flex items-center justify-center gap-2 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:ring-2 hover:ring-primary/30 transition"
                    >
                        <Github className="h-4 w-4" />
                        Continue with GitHub
                    </button>

                    <button
                        onClick={handleTwitterSignup}
                        className="flex items-center justify-center gap-2 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:ring-2 hover:ring-primary/30 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                            className="h-4 w-4"
                        />
                        Continue with X (Twitter)
                    </button>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:underline transition"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}