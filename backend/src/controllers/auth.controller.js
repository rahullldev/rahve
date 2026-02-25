import { User, Session } from "../dbschema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { hashToken ,cookieOptions} from "../utils.js"

export const login = async (req, res) => {
  const { identifier, password } = req.body

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  })
  if (!user) {
    return res.status(404).json({ error: "ACCOUNT_NOT_FOUND" })
  }

  if (!user.passwordHash) {
    return res.status(400).json({ error: "USE_GOOGLE_LOGIN" })
  }

//   if (!user || !user.passwordHash) {
//     return res.status(401).json({ error: "INVALID_CREDENTIALS" })
//   }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" })
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )

  const refreshToken = crypto.randomBytes(40).toString("hex")

  await Session.create({
    userId: user._id,
    refreshTokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  res
    .cookie("access_token", accessToken, { ...cookieOptions,
      maxAge: 15 * 60 * 1000, })
    .cookie("refresh_token", refreshToken, { ...cookieOptions,
      maxAge: 15 * 60 * 1000,})
    .json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
}

export const getMe = (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    }
  })
}

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refresh_token

  if (refreshToken) {
    await Session.deleteOne({
      refreshTokenHash: hashToken(refreshToken)
    })
  }

  res.clearCookie("access_token")
  res.clearCookie("refresh_token")

  res.sendStatus(200)
}


export const oauthCallback = async (req, res) => {

  const user = req.user

  // 🔐 Access token
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )
  console.log(accessToken)

  // 🔁 Refresh token
  const refreshToken = crypto.randomBytes(40).toString("hex")

  await Session.create({
    userId: user._id,
    refreshTokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    .redirect("/ai")
}

// export const  = async (req, res) => {
//   const user = req.user

//   const accessToken = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   )

//   const refreshToken = crypto.randomBytes(40).toString("hex")

//   await Session.create({
//     userId: user._id,
//     refreshTokenHash: hashToken(refreshToken),
//     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//   })

//   res
//     .cookie("access_token", accessToken, { httpOnly: true })
//     .cookie("refresh_token", refreshToken, { httpOnly: true })
//     .redirect("http://localhost:5173/ai")
// }
