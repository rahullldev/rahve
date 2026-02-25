import express from "express"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import passport from "passport"
import "./config/passport.js"




const app = express()

app.use((req, res, next) => {
  console.log("BACKEND HIT:", req.method, req.url)
  next()
})
app.use(passport.initialize())

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

export default app
