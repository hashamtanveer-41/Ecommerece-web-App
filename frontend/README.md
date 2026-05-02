# E-commerce React Frontend

Modern, responsive e-commerce storefront built with React 19, featuring a rich UI stack, Redux-powered state management, and a secure Stripe checkout flow. Designed for fast browsing, smooth cart interactions, and data-rich admin dashboards.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)
![React%20Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=fff)
![Redux%20Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=fff)
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=fff)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=fff)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=fff)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify&logoColor=fff)

## Core Features
- Responsive product browsing with category filtering and carousels.
- Dynamic cart management via Redux Toolkit and React-Redux.
- Secure Stripe checkout flow with hosted elements and payment confirmation.
- Admin dashboards with MUI X Data Grid for data-rich tables.
- Toast notifications, loaders, and skeletons for smooth UX.

## Tech Stack
- Core: React 19, React Router DOM 7, Vite.
- State: Redux Toolkit, React-Redux.
- Styling: Tailwind CSS 4 + Emotion (styled components), React-Icons.
- UI: Material UI 7, MUI X Data Grid, Headless UI.
- Forms & API: React Hook Form, Axios.
- Payments: Stripe (React Stripe JS).
- UX: React Hot Toast, React Loader Spinner, Swiper.
- Deployment: Netlify.

## Advanced UI Implementation
Tailwind CSS 4 powers utility-first layouts and responsive design, while Emotion handles complex component styling and dynamic theming. This hybrid approach balances speed of iteration with fine-grained UI control in advanced components and admin dashboards.

## Folder Structure
A logical structure for a Redux-based React app:
```
src/
  api/              # Axios instances and API helpers
  assets/           # Images and static assets
  components/       # Reusable UI components
  components/admin/ # Admin-specific UI and pages
  hooks/            # Custom hooks and filters
  store/            # Redux store, reducers, actions
  utils/            # Shared utilities and helpers
  App.jsx           # App shell and routes
  main.jsx          # Application entry
```

## Environment Setup
Create a `.env` file in the project root and define the required variables.

Vite requires the `VITE_` prefix for exposed variables. If you are migrating from CRA, map `REACT_APP_*` to `VITE_*`.

Required:
- `VITE_STRIPE_PUBLISHABLE_KEY` (equivalent to `REACT_APP_STRIPE_PUBLISHABLE_KEY`)
- `VITE_BACK_END_URL` (equivalent to `REACT_APP_API_URL`)
- `VITE_FRONTEND_URL` (optional, for redirects or callbacks)

Example:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_BACK_END_URL=https://your-api-domain.com
VITE_FRONTEND_URL=https://your-frontend-domain.com
```

## Scripts
Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Deployment (Netlify)
1. Build the app with `npm run build`.
2. Deploy the `dist/` directory to Netlify.
3. Ensure redirect rules are set for React Router (SPA routing).

Netlify redirect rule example (already in `public/_redirects`):
```
/*  /index.html  200
```

## Notes
- Keep API URLs HTTPS in production to avoid Mixed Content errors.
- Ensure your backend allows CORS from the Netlify domain.
