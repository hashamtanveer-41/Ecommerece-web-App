# Full-Stack E-commerce

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

## ScreenShots:
# Home
<img width="1366" height="688" alt="image" src="https://github.com/user-attachments/assets/02a5be31-3600-452e-b890-d907941349d9" />
# Contact Section
<img width="1366" height="641" alt="image" src="https://github.com/user-attachments/assets/7481ea74-6a2b-4fee-a183-37725e8bba09" />
# Products Section
<img width="1366" height="678" alt="image" src="https://github.com/user-attachments/assets/1f349c44-acc8-40ae-a0dc-ae6f275065f6" />
# Login Page
<img width="1360" height="686" alt="image" src="https://github.com/user-attachments/assets/90dd1fe5-8895-4b20-9ce9-2e84b3778ab8" />
# Admin Panel
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/ace2bc27-144a-41f9-8080-3c29a8daf1ac" />
# Checkout Page
<img width="1366" height="634" alt="image" src="https://github.com/user-attachments/assets/02f2c30e-8f43-4ecb-b461-d80580779ee3" />
