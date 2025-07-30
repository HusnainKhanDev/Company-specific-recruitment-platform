import { HandleGoogleCallback, RedirectGoogleLoginPage } from "./Controllers/UserController.js";

export function GoogleAuthRoutes(app: any){

    app.get("/auth/google", RedirectGoogleLoginPage)

    app.get("/auth/google/callback", HandleGoogleCallback)

}

// 1️⃣ User clicks "Login with Google"
// Frontend hits: GET /auth/google

// 2️⃣ Backend redirects to Google login page
// Sends the user to: https://accounts.google.com/o/oauth2/v2/auth?...

// 3️⃣ User logs in with Google
// Google authenticates the user

// Then redirects them back to: /auth/google/callback?code=xyz123

// 4️⃣ Backend handles the callback Extracts code from query
//Sends code to Google’s token API
// Receives: access_token ✅
// id_token or refresh_token (optional)

// 5️⃣ Backend fetches user info
// Calls Google User Info API using access_token

// Gets user's:
// Email
// Name
// Picture
// Google ID (sub)

// 6️⃣ Backend creates or finds user
// Checks if user exists in DB by email or Google ID

// If not, creates new user

// 7️⃣ Backend generates JWT
// Creates your own token for the user

// 8️⃣ JWT is sent to frontend
// Sent as an httpOnly cookie (secure)


// 9️⃣ User is redirected to frontend dashboard


