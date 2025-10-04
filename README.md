# Custom Google OAuth with Node.js

This project demonstrates how to implement a custom OAuth 2.0 authentication flow using Google in a Node.js backend, without using Passport.js or other high-level libraries.

## Features

- Custom Google OAuth 2.0 login flow
- JWT-based authentication
- User data stored in PostgreSQL
- Secure endpoints with token-based access

## How It Works

1. **Backend redirects to Google**  
   The `/auth/google` endpoint constructs a Google OAuth URL and redirects the user to Google's consent screen.

2. **Google redirects back with a code**  
   After user consent, Google redirects to `/auth/google/callback` with an authorization code.

3. **Backend exchanges code for tokens**  
   The backend exchanges the code for Google access and ID tokens, fetches the user's profile, and upserts the user in the database.

4. **JWT issued to the user**  
   The backend generates a JWT containing user info and sends it to the frontend.

5. **Frontend uses JWT for authenticated requests**  
   The JWT is sent in the `Authorization` header for protected API endpoints.

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/FatimaTariq0808/OAUTH
cd OAUTH/backend/nodeBackend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in `backend/nodeBackend`:

```
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
```

### 4. Set up your database

Make sure your `users` table has at least:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50),
    provider_id VARCHAR(255),
    display_name VARCHAR(255),
    email VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 5. Run the server

```sh
node index.js
```

## Endpoints

- `GET /auth/google`  
  Redirects to Google OAuth consent screen.

- `GET /auth/google/callback`  
  Handles Google callback, exchanges code for tokens, logs in/creates user, returns JWT.

- `GET /api/userInfo`  
  Returns user info (requires `Authorization: Bearer <token>` header).

- `GET /api/profile`  
  Public endpoint.

## Notes

- Make sure to register your OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/).
- The JWT payload includes user info for stateless authentication.
