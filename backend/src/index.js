// import express from "express"
// import {Chat,Message,Session,User} from "./dbschema.js"
// import askai from "./services/gemini.js"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// import crypto from "crypto"
// import {hashToken,authMiddleware } from "./utils.js"



// const app = express()
// const port = 3000
// app.use((req, res, next) => {
//   console.log("BACKEND HIT:", req.method, req.url)
//   next()
// })

// app.use(express.json())

// app.use("/api/chat",authMiddleware)


// app.get("/",(req,res)=>{
//     res.send ("hey")
// })

// app.post("/api/chat", async (req,res)=>{
//     const userId=req.user._id
//     const chat = await Chat.create({userId})
//     res.json({chatId:chat._id})
// })
// app.get("/api/chat/:chatId",async(req,res)=>{
//     // console.log("inside get chatmsg")
//     // const chatId=req.params.chatId
//     // console.log(chatId)
//     // const messages=await Message.find({chatId}).sort({createdAt:1})
//     // const history=messages.map(item=>({key:item._id,role: item.role,content:item.content}))
//     // res.json(history)

//     // const { chatId } = req.params

//   // 1️⃣ Check if chat belongs to user
//   const { chatId } = req.params
//   const chat = await Chat.findOne({
//     _id: chatId,
//     userId: req.user._id
//   })

//   if (!chat) {
//     return res.status(404).json({ error: "Chat not found" })
//   }

//   // 2️⃣ Only then fetch messages
//   const messages = await Message.find({ chatId })
//     .sort({ createdAt: 1 })

//   const history = messages.map(item => ({
//     key: item._id,
//     role: item.role,
//     content: item.content
//   }))

//   res.json(history)
// })

// app.post("/api/chat/:chatId/message",async (req,res)=>{
//     // console.log("entered aimsg")
//     // const {chatId}= req.params
//     // console.log(chatId)
//     // const {content}= req.body
//     // console.log(content)

//   const { chatId } = req.params
//   const { content } = req.body

//   if (!content) {
//     return res.status(400).json({ error: "message content required" })
//   }

//   // 1️⃣ Verify ownership
//   const chat = await Chat.findOne({
//     _id: chatId,
//     userId: req.user._id
//   })

//   if (!chat) {
//     return res.status(404).json({ error: "Chat not found" })
//   }

//     if (!content){
//         return res.status(400).json({error:"message content required"})
//     }
    
//     const messages = await Message.find({chatId}).sort({createdAt:1})
//     const history=messages.map(item=>({role: item.role === "assistant"?"model":"user",parts:[{text:item.content}]}))
//     console.log(history)

//     await Message.create({
//         chatId,
//         role:"user",
//         content

//     })
//     console.log("user msg saved ")
//     const aiResponse= await askai(history,content)
//     console.log(aiResponse)
//     // const reply = aiResponse.choices[0].message.content
//     await Message.create({
//         chatId,
//         role:"assistant",
//         content:aiResponse
//     })
//     console.log("assitant msg saved")
//     res.json({aiResponse})



    


// })

// app.post("/ai",(req,res)=>{
//     console.log(req.body)
//     const airesponse= askai(JSON.stringify(req.body.content))
//     res.send(airesponse)
// })




// app.post("/api/login", async (req, res) => {
//   const { identifier, password } = req.body

//   const user = await db.users.findOne({
//     $or: [{ email: identifier }, { username: identifier }]
//   })

//   if (!user) {
//     return res.status(404).json({ error: "ACCOUNT_NOT_FOUND" })
//   }

//   if (!user.password_hash) {
//     return res.status(400).json({ error: "USE_GOOGLE_LOGIN" })
//   }

//   const valid = await bcrypt.compare(password, user.password_hash)
//   if (!valid) {
//     return res.status(401).json({ error: "INVALID_PASSWORD" })
//   }

//   // 🔐 Create tokens
//   const accessToken = jwt.sign(
//     { userId: user.id },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   )

//   const refreshToken = crypto.randomBytes(40).toString("hex")

//   await db.sessions.insert({
//     user_id: user.id,
//     refresh_token_hash: hash(refreshToken),
//     expires_at: addDays(30)
//   })

//   // 🍪 Set cookies
//   res.cookie("access_token", accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     maxAge: 15 * 60 * 1000
//   })

//   res.cookie("refresh_token", refreshToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     maxAge: 30 * 24 * 60 * 60 * 1000
//   })

//   res.json({
//     user: {
//       id: user.id,
//       username: user.username,
//       email: user.email
//     }
//   })
// })

// app.get("/api/me", async (req, res) => {
//   const token = req.cookies.access_token

//   if (!token) {
//     return res.status(401).json({ error: "UNAUTHENTICATED" })
//   }

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET)

//     const user = await db.users.findById(payload.userId)

//     if (!user) {
//       return res.status(401).json({ error: "INVALID_SESSION" })
//     }

//     res.json({
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email
//       }
//     })
//   } catch {
//     return res.status(401).json({ error: "TOKEN_EXPIRED" })
//   }
// })
// app.post("/api/refresh", async (req, res) => {
//   const refreshToken = req.cookies.refresh_token
//   if (!refreshToken) return res.sendStatus(401)

//   const session = await db.sessions.findOne({
//     refresh_token_hash: hash(refreshToken)
//   })

//   if (!session || session.expires_at < Date.now()) {
//     return res.sendStatus(401)
//   }

//   const newAccessToken = jwt.sign(
//     { userId: session.user_id },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   )

//   res.cookie("access_token", newAccessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     maxAge: 15 * 60 * 1000
//   })

//   res.sendStatus(200)
// })



// app.post("/api/login", async (req, res) => {
//   const { identifier, password } = req.body

//   const user = await User.findOne({
//     $or: [{ email: identifier }, { username: identifier }],
//   })

//   if (!user || !user.passwordHash) {
//     return res.status(401).json({ error: "INVALID_CREDENTIALS" })
//   }

//   const valid = await bcrypt.compare(password, user.passwordHash)
//   if (!valid) {
//     return res.status(401).json({ error: "INVALID_CREDENTIALS" })
//   }

//   // 🔐 Access token (short-lived)
//   const accessToken = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   )

//   // 🔁 Refresh token (long-lived)
//   const refreshToken = crypto.randomBytes(40).toString("hex")

//   await Session.create({
//     userId: user._id,
//     refreshTokenHash: hashToken(refreshToken),
//     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//   })

//   res
//     .cookie("access_token", accessToken, {
//       ...cookieOptions,
//       maxAge: 15 * 60 * 1000,
//     })
//     .cookie("refresh_token", refreshToken, {
//       ...cookieOptions,
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     })
//     .json({
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     })
// })

// app.get("/api/me", authMiddleware, (req, res) => {
//   res.json({
//     user: {
//       id: req.user._id,
//       username: req.user.username,
//       email: req.user.email,
//     }
//   })
// })



// app.post("/api/logout", async (req, res) => {
//   const refreshToken = req.cookies.refresh_token

//   if (refreshToken) {
//     await db.sessions.delete({
//       refresh_token_hash: hash(refreshToken)
//     })
//   }

//   res.clearCookie("access_token")
//   res.clearCookie("refresh_token")

//   res.sendStatus(200)
// })





// app.listen(port,()=>{
//     console.log(`listening on port ${port} `)
// })