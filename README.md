 
# Authentication System

A simple authentication flow based on email verification (OTP), sessions, and token-based access.

## Flow Overview

1. **Register** – User signs up with unique username ,email and password.
2. **Verify Email (OTP)** – An OTP is sent to the user's email. User submits it to verify their account.
3. **Session Generation** – Once verified, a session is created for the user.
4. **Refresh Token** – A refresh token is generated and stored in an **HTTP-only cookie**.
5. **Access Token** – An access token is generated (short-lived) using the refresh token.
6. **Login** – User can now log in using their verified credentials, with access/refresh tokens managing authenticated requests.

## Steps in Detail

### 1. Register
- Endpoint: `POST /api/auth/register`
- Body: `{ “username”:”user”,"email": "user@example.com", "password": "yourpassword" }`
- Creates a new user record (unverified) and triggers OTP generation.

### 2. Verify Email (OTP)
- Endpoint: `POST /api/auth/verify-otp`
- Body: `{ "email": "user@example.com", "otp": "123456" }`
- OTP is validated against the one sent to the user's email 
- On success, user's `isVerified` status is set to `true`.

### 3. Session Generation
- After successful verification, a session is created for the user (stored in DB )

### 4. Refresh Token
- A refresh token is generated and stored in a secure, **HTTP-only cookie**.
- Used later to generate new access tokens without requiring the user to log in again.

### 5. Access Token
- Generated using the refresh token.
- Short-lived (e.g., 15 minutes) and used to authenticate API requests.
- Sent in the `Authorization` header: `Bearer <access_token>`.

### 6. Login
- Endpoint: `POST /api/auth/login`
- Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- Validates credentials, checks if email is verified, then issues refresh + access tokens.

## Token Summary

| Token | Storage | Lifetime | Purpose |
|-------|---------|----------|---------|
| Refresh Token | HTTP-only Cookie | Long (e.g., 7 days) | Used to generate new access tokens |
| Access Token | Client memory / Authorization header | Short (e.g., 15 min) | Used to authenticate requests |

