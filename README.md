# Authentication App

A modern web authentication application built with Next.js featuring login, registration, and  verification.

## Features

- User login functionality
- User registration with account creation
- Email verification using OTP code
- Protected dashboard for authenticated users
- Session management with token storage
- Modern UI design using Tailwind CSS and shadcn 
## Technologies Used

- **Next.js 16.1.1** - React framework for frontend development
- **React 19.2.3** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **Sonner** - Toast notification library

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/AwadHimself/authentication-app>
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


**Note:** Make sure to update the `BASE_URL` in `lib/api.js` to point to your API endpoint before running the application.
