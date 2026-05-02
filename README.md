# Full-Stack E-commerce Suite

Production-ready full-stack e-commerce platform featuring secure payments, automated email notifications, and cloud-based media management. Built for scalability with modern frontend and backend stacks, cloud integrations, and containerized delivery.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Redux Toolkit, Tailwind CSS 4, Material UI, Vite |
| Backend | Spring Boot 3, Spring Security (JWT), Hibernate, PostgreSQL/MySQL |
| Cloud Services | Stripe, Brevo, Cloudinary |
| DevOps | Docker (backend image), Render, Netlify |

## Project Structure

```
Ecommerece-web-App/
  backend/   # Spring Boot API
  frontend/  # React storefront
```

## Key Workflow

User browses products -> React UI calls Spring Boot APIs -> Stripe processes payment -> backend confirms order -> Brevo sends email notifications -> Cloudinary serves product images.

## Quick Start

See the dedicated setup guides in each subproject:

- Backend setup: `backend/README.md`
- Frontend setup: `frontend/README.md`

## Live Links

- Frontend (Netlify): https://ecom-webapp-hasham.netlify.app/
- Backend API (Render): https://ecommerce-backend-latest-r7xb.onrender.com

## Notes

- Environment variables are managed per service; see `backend/README.md` and `frontend/README.md` for details.
- The backend is containerized and can be published to Docker Hub for deployment.

