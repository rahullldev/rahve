import crypto from "crypto"
import jwt from "jsonwebtoken"
import { Session, User } from "./dbschema.js"

export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex")
}


export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
}



export async function authMiddleware(req, res, next) {
    const accessToken = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token

    try {
        // 1️⃣ Try verifying access token
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)

        const user = await User.findById(payload.userId)
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }

        req.user = user
        return next()
    } catch (err) {
        // 2️⃣ Access token invalid or expired → try refresh
        if (!refreshToken) {
            return res.status(401).json({ error: "UNAUTHENTICATED" })
        }
        //consider the case when user will delete both session and jwt from cookie so now u have two refreshtoken 

        const session = await Session.findOne({
            refreshTokenHash: hashToken(refreshToken),
            expiresAt: { $gt: new Date() },
        })

        if (!session) {
            return res.status(401).json({ error: "SESSION_EXPIRED" })
        }

        // 3️⃣ Issue new access token
        const newAccessToken = jwt.sign(
            { userId: session.userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.cookie("access_token", newAccessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        })

        const user = await User.findById(session.userId)
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }

        req.user = user
        return next()
    }
}
