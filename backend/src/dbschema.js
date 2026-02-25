import mongoose from "mongoose"
const MONGO_URI="mongodb+srv://sahchandani123:NZr22fRXzQTvehG4@cluster0.fczzbg9.mongodb.net/?appName=Cluster0"

await mongoose.connect(MONGO_URI)


const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    //   index: true, // important for performance
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
  },
  { timestamps: true }
)

export const Chat = mongoose.model("Chat", chatSchema)


const msgschema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
    required: true
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  content: {
    type: String,
    required: true
  },

  // 🔥 NEW FIELD FOR VECTOR
  embedding: {
    type: [Number],
    default: undefined   // important: avoid empty arrays
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Message = mongoose.model("message", msgschema)




const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true, // allows multiple null emails
      lowercase: true,
      trim: true,
    },

    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },

    passwordHash: {
      type: String,
    },

    providers: {
      google: {
        id: { type: String },
      },
      github: {
        id: { type: String },
      },
      twitter: {
        id: { type: String },
      }
    },

    authMethods: {
      local: { type: Boolean, default: false },
      google: { type: Boolean, default: false },
      github: { type: Boolean, default: false },
      twitter: { type: Boolean, default: false },
    }
  },
  { timestamps: true }
)


export const User = mongoose.model("User", userSchema)




const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshTokenHash: {
      type: String,
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

export const Session = mongoose.model("Session", sessionSchema)

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true })

export const Contact= mongoose.model("Contact", contactSchema)
