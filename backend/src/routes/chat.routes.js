import express from "express"
// import * as controller from "../controllers/chat.controller.js"

// console.log("Controller object:", controller)
import {
  createChat,
  getChatMessages,
  sendMessage,
  getChats,
  submitContact
} from "../controllers/chat.controller.js"

import { authMiddleware } from "../utils.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", createChat)
router.get("/get", getChats)
router.get("/:chatId", getChatMessages)
router.post("/:chatId/message", sendMessage)
router.post("/contact",submitContact)

export default router
