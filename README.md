# Water Billing Web - Onboarding Platform

A professional web onboarding platform for the Water Billing System SaaS. This web application handles marketing, signup, email verification, subscription activation, and guides users to the desktop application.

## Overview

This is the **web entry point** for the Water Billing System. Users discover the product on the web, sign up, verify their email, activate a subscription, and then download the desktop app to manage their water utility operations.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & transitions |
| Lucide React | Icons |
| Zustand | Lightweight state management |

## Project Structure

```
water-billing-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Router configuration
│   ├── index.css             # Global styles + Tailwind
│   ├── lib/
│   │   ├── utils.ts          # Helper functions
│   │   └── api.ts            # API client (connects to Rust backend)
│   ├── store/
│   │   └── authStore.ts      # Zustand auth state management
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Site footer
│   │   ├── Layout.tsx        # Page layout wrapper
│   │   ├── AnimatedSection.tsx   # Scroll animation wrapper
│   │   ├── StepIndicator.tsx     # Multi-step progress indicator
│   │   ├── FeatureCard.tsx       # Feature display card
│   │   └── PricingCard.tsx       # Pricing plan card
│   └── pages/
│       ├── LandingPage.tsx           # Home / Hero page
│       ├── FeaturesPage.tsx          # Feature details
│       ├── PricingPage.tsx           # Subscription plans
│       ├── TermsPage.tsx             # Terms of Service
│       ├── PrivacyPage.tsx           # Privacy Policy
│       ├── SubscriptionPolicyPage.tsx # Subscription Policy
│       ├── SignupPage.tsx            # Registration (manual + Google)
│       ├── LoginPage.tsx             # Sign in
│       ├── VerifyEmailPage.tsx       # Email verification
│       ├── SubscriptionPage.tsx      # Plan selection & activation
│       ├── OnboardingSuccessPage.tsx # Post-signup success
│       └── DesktopGuidePage.tsx      # Desktop app instructions
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── .env
```

## Pages & Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing Page | No |
| `/features` | Features & Services | No |
| `/pricing` | Pricing Plans | No |
| `/terms` | Terms of Service | No |
| `/privacy` | Privacy Policy | No |
| `/subscription-policy` | Subscription Policy | No |
| `/signup` | Sign Up (manual + Google) | No |
| `/login` | Log In | No |
| `/verify-email` | Email Verification | No |
| `/subscription` | Choose Plan & Subscribe | Yes |
| `/onboarding` | Account Setup Success | Yes |
| `/desktop-guide` | Desktop App Guide | No |

## User Flow

```
[Visitor arrives]
    |
    v
[Landing Page] --> [Features] --> [Pricing]
    |                    |              |
    |                    v              v
    |               [Learn more]   [Choose plan]
    |                    |              |
    +--------------------+--------------+
                       |
                       v
                 [Signup Page]
                       |
          +------------+------------+
          |                         |
    [Manual signup]          [Google signup]
          |                         |
          v                         v
    [Account created]        [Account created]
          |                         |
          +------------+------------+
                       |
                       v
               [Onboarding Success]
                       |
                       v
               [Desktop App Guide]
                       |
                       v
            [Download Desktop App]
```

## Getting Started

### Prerequisites

- Node.js 18+
- The Rust backend API running

### Installation

```bash
cd water-billing-web

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Backend Integration

This web app connects to the Rust backend API at the URL specified in `VITE_API_BASE_URL`.

### Required Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | Authenticate user |
| `/auth/register` | POST | Manual signup |
| `/auth/google/register` | POST | Google signup |
| `/auth/verify-email` | GET | Verify email token |
| `/auth/resend-verification` | POST | Resend verification email |
| `/auth/me` | GET | Get current user |
| `/plans` | GET | List subscription plans |
| `/subscriptions` | POST | Create subscription |

## Signup Flow

### Manual Signup

1. User fills out signup form (company name, admin name, email, phone, password)
2. App sends `POST /auth/register`
3. On success, user is redirected to onboarding page
4. Email verification link is sent
5. User clicks link in email to verify

### Google Signup

1. User clicks "Continue with Google"
2. Google OAuth popup opens
3. After Google auth, if company info is missing, user fills it in
4. App sends `POST /auth/google/register`
5. On success, user is redirected to onboarding page

### Post-Signup

1. User sees account summary with company code
2. User can copy the company code (needed for desktop login)
3. User is guided to download the desktop app
4. Desktop app login uses: company code + username + password

## Desktop App Access Control

The desktop app should check these conditions on login:

1. **Company is active** - Not suspended or deleted
2. **Subscription is active** - Has active or trial subscription
3. **User is active** - User account not disabled

If subscription is not active, the desktop app should show a message directing the user to the web portal to activate their subscription.

## Customization

### Colors

Edit `tailwind.config.js` to customize the brand colors:

```js
colors: {
  brand: { /* your colors */ },
  water: { /* your colors */ },
}
```

### Plans

Edit the `plans` array in `PricingPage.tsx` and `SubscriptionPage.tsx` to match your actual subscription plans.

### Content

All page content is in the respective page components. Edit the text, features, and FAQ sections directly.

## License

MIT
