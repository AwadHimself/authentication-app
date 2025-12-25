# Authentication App

A modern web authentication application built with Next.js featuring login, registration, and email verification.

## Features

- User login functionality
- User registration with account creation
- Email verification using OTP code
- Protected dashboard for authenticated users
- Session management with token storage
- Modern UI design using Tailwind CSS and Radix UI

## Technologies Used

- **Next.js 16.1.1** - React framework for frontend development
- **React 19.2.3** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible UI component library
- **Sonner** - Toast notification library
- **Lucide React** - Icon library

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd authentication-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Running the Application

### Development Mode

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
authentication-app/
├── app/                    # Next.js pages
│   ├── actions/           # Server Actions
│   │   └── auth.js        # Authentication actions
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── verify/            # Email verification page
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── api.js             # API functions
│   └── utils.js           # Utility functions
├── public/                # Static files
└── package.json           # Dependencies
```

## Pages

### Home Page (`/`)
- Automatic redirect: If user is logged in, redirects to `/dashboard`, otherwise to `/login`

### Login Page (`/login`)
- Login page for existing users
- Requires: email and password

### Signup Page (`/signup`)
- New account registration page
- Requires: name, email, password, password confirmation, mobile number, and country code

### Email Verification Page (`/verify`)
- Email verification page using OTP code
- Requires: verification code (OTP) and authentication token

### Dashboard Page (`/dashboard`)
- Protected page for authenticated users
- Requires login to access

## API

The application connects to an external API for authentication:

**Base URL:** `https://tinytales.trendline.marketing/api`

### Endpoints

#### 1. Register
```
POST /auth/register
Body: FormData
  - name
  - email
  - mobile
  - password
  - password_confirmation
  - mobile_country_code
```

#### 2. Login
```
POST /auth/login
Body: FormData
  - email
  - password
```

#### 3. Verify Email
```
POST /auth/verify-email
Headers:
  - Authorization: Bearer {token}
Body: FormData
  - code
```

#### 4. Get User Data
```
GET /auth/user-data
Headers:
  - Authorization: Bearer {token}
```

#### 5. Logout
```
POST /auth/logout
Headers:
  - Authorization: Bearer {token}
```

## Session Management

Authentication token is stored in `localStorage`:

- `getToken()` - Get the token
- `setToken(token)` - Save the token
- `removeToken()` - Remove the token

## Components

- `LoginForm` - Login form component
- `SignupForm` - Signup form component
- `VerifyForm` - Email verification form component

## Configuration

### Changing API URL

Modify the `BASE_URL` in `lib/api.js`:

```javascript
const BASE_URL = "your-api-url";
```

## Development

### Adding New Features

1. Add Server Actions in `app/actions/`
2. Add API functions in `lib/api.js`
3. Create components in `components/`
4. Add pages in `app/`

## Deployment

The easiest way to deploy a Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project in Vercel
3. It will be deployed automatically

## License

This project is private.

## Support

For help and support, please open an issue in the repository.

---

**Note:** Make sure to update the `BASE_URL` in `lib/api.js` to point to your API endpoint before running the application.
