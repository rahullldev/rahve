


import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import GitHubStrategy from "passport-github2"
import TwitterStrategy from "passport-twitter"
import { User } from "../dbschema.js"

// Helper to extract verified email safely
// function extractVerifiedEmail(profile) {
//   if (!profile.emails || profile.emails.length === 0) {
//     return null
//   }

//   const verified = profile.emails.find(e => e.verified === true)
//   return verified ? verified.value : null
// }

function extractEmail(providerName, profile) {

  // 1️⃣ If provider returned emails array, use it
  if (profile.emails && profile.emails.length > 0) {
    return profile.emails[0].value || null
  }

  // 2️⃣ Google specific fallback (rare)
  if (providerName === "google") {
    const verified = profile.emails?.find(e => e.verified === true)
    return verified?.value || null
  }

  // 3️⃣ GitHub fallback (if _json.email exists)
  if (providerName === "github") {
    if (profile._json?.email) {
      return profile._json.email
    }
  }

  // 4️⃣ Twitter fallback (if provided)
  if (providerName === "twitter") {
    if (profile.emails && profile.emails.length > 0) {
      return profile.emails[0].value
    }
  }

  return null
}

// Reusable OAuth handler
// async function handleOAuthLogin(providerName, providerId, profile, done) {
//   try {
//     console.log(providerName, providerId, profile)
//     // 1️⃣ Match by provider ID
//     let user = await User.findOne({
//       [`providers.${providerName}.id`]: providerId
//     })

//     if (user) return done(null, user)

//     // 2️⃣ Try verified email (if exists)
//     const email = extractVerifiedEmail(profile)

//     if (email) {
//       user = await User.findOne({ email })

//       if (user) {
//         user.providers[providerName] = { id: providerId }
//         user.authMethods[providerName] = true
//         await user.save()
//         return done(null, user)
//       }
//     }
//     console.log("creating user")

//     // 3️⃣ Create new user
//     user = await User.create({
//       email: email || null,
//       username: profile.displayName || profile.username || `user_${providerId}`,
//       providers: {
//         [providerName]: { id: providerId }
//       },
//       authMethods: {
//         [providerName]: true
//       }
//     })
//     console.log(`user created with email - ${email},username-${profile.displayName || profile.username || `user_${providerId}`},provider-${providerName},providerid-${providerId}`)

//     return done(null, user)

//   } catch (err) {
//     return done(err, null)
//   }
// }


async function handleOAuthLogin(providerName, providerId, profile, done) {
  try {

    console.log(providerName, providerId)

    // 1️⃣ Find user by provider ID
    let user = await User.findOne({
      [`providers.${providerName}.id`]: providerId
    })

    if (user) return done(null, user)

    // 2️⃣ Try matching by email (if available)
    const email = extractEmail(providerName, profile)

    if (email) {
      user = await User.findOne({ email })

      if (user) {
        // Link provider to existing user
        user.providers[providerName] = { id: providerId }
        user.authMethods[providerName] = true
        await user.save()
        return done(null, user)
      }
    }

    // 3️⃣ Create new user
    user = await User.create({
      email: email || null,
      username:
        profile.displayName ||
        profile.username ||
        profile._json?.name ||
        `user_${providerId}`,
      providers: {
        [providerName]: { id: providerId }
      },
      authMethods: {
        [providerName]: true
      }
    })

    console.log(
      `User created → provider: ${providerName}, id: ${providerId}, email: ${email}`
    )

    return done(null, user)

  } catch (err) {
    return done(err, null)
  }
}

//
// 🔹 GOOGLE
//
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin("google", profile.id, profile, done)
  }
))

//
// 🔹 GITHUB
//
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback",
    scope: ["user:email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin("github", profile.id, profile, done)
  }
))

//
// 🔹 TWITTER
//
passport.use(new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "/api/auth/twitter/callback",
    includeEmail: true
  },
  async (token, tokenSecret, profile, done) => {
    await handleOAuthLogin("twitter", profile.id, profile, done)
  }
))
