# Cinemix (React + Vite + Firebase)
1. `npm install`
2. `cp .env.example .env` and paste your Firebase web keys (without keys the app runs in local mode).
3. Firebase Console: enable Authentication > Email/Password, create Firestore, paste `firestore.rules` in Rules.
4. `npm run dev` opens http://localhost:3000
Collections: `bookings`, `reviews`, `profiles/{uid}` (name, phone, lang, fav). Demo user always saves on the device only.
