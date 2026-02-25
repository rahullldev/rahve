import express from "express"
import passport from "passport"
import {
  login,
  logout,
  getMe,
  oauthCallback 
} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

// Normal auth
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authMiddleware, getMe)


// GOOGLE
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
)

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  oauthCallback
)

// GITHUB
router.get("/github",
  passport.authenticate("github", { session: false })
)

router.get("/github/callback",
  passport.authenticate("github", { session: false }),
  oauthCallback
)

// TWITTER
// router.get("/twitter",
//   passport.authenticate("twitter", { session: false })
// )

// router.get("/twitter/callback",
//   passport.authenticate("twitter", { session: false }),
//   oauthCallback
// )

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "users.read", "email"],
    session: false
  })
)

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",//see this cz it might be relative to base url
    session: false
  }),
  oauthCallback
)

export default router
