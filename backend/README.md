# E-Commerce Backend API

Scalable, production-grade Spring Boot backend for an e-commerce platform. Built with a clean, layered architecture, it delivers secure authentication, robust catalog and cart flows, and reliable order processing, ready for cloud deployment.

![Java](https://img.shields.io/badge/Java-17+-007396?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6.x-6DB33F?logo=springsecurity&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployment-46E3B7?logo=render&logoColor=white)

## Key Features
- Secure authentication and authorization with Spring Security + JWT.
- Product, category, and inventory management with role-based access.
- Cart and checkout logic with order placement flows.
- Cloudinary-powered image storage and delivery.
- Email notifications via Brevo (welcome emails, order confirmations).
- Production-ready database support (PostgreSQL or MySQL).

## Architecture Overview
This service follows a layered architecture: controller (API), service (business logic), repository (data access), and model/payload layers. It is designed for maintainability and production scalability.

## Prerequisites
- Java 17+
- Maven 3.9+
- Docker (optional for containerized runs)
- PostgreSQL or MySQL (local or managed)

## Environment Variables
Create a `.env` file (or use your deployment environment) with the following values:

| Variable | Description | Example |
|---|---|---|
| `DATASOURCE_URL` | JDBC connection string | `jdbc:postgresql://localhost:5432/Ecom-WebApp` |
| `DATASOURCE_USER` | Database username | `postgres` |
| `DATASOURCE_PASSWORD` | Database password | `your_password` |
| `JWT_SECRET` | Secret for signing JWTs | `change_me` |
| `JWT_EXPIRATION_MS` | JWT expiry in ms | `300000000` |
| `JWT_COOKIE_NAME` | JWT cookie name | `springBootEcom` |
| `SECURITY_USERNAME` | Spring Security basic user | `user` |
| `SECURITY_PASSWORD` | Spring Security basic password | `change_me` |
| `CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUD_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `your_api_secret` |
| `CLOUDINARY_URL` | Optional Cloudinary URL | `cloudinary://...` |
| `SPRING_MAIL_USERNAME` | Brevo SMTP username | `your_smtp_username` |
| `SPRING_MAIL_PASSWORD` | Brevo SMTP password | `your_smtp_password` |
| `BREVO_API_KEY` | Brevo API key | `your_brevo_api_key` |
| `FRONTEND_URL` | Frontend base URL | `http://localhost:5173/` |
| `IMAGE_BASE_URL` | Image base URL | `http://localhost:8080/images` |
| `PROJECT_IMAGE` | Local image folder path | `images/` |
| `STRIPE_SECRET_KEY` | Stripe secret key (if enabled) | `sk_test_...` |

## Installation & Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hashamtanveer-41/Ecommerece-web-App
   cd backend
   ```
2. Create a `.env` file and fill in environment variables.
3. Build the application:
   ```bash
   mvn clean package
   ```
4. Run the app locally:
   ```bash
   mvn spring-boot:run
   ```
5. The API will be available at `http://localhost:8080`.

## Docker Usage
Pull and run the official image from Docker Hub:

```bash
docker pull https://hub.docker.com/r/hasham41/ecommerce-backend/tags
```

```bash
docker run --env-file .env -p 8080:8080 https://hub.docker.com/r/hasham41/ecommerce-backend:latest
```

Or run with Docker Compose (PostgreSQL + backend):

```bash
docker compose up --build
```

## API Documentation (Examples)
- `POST /api/auth/signin` — user login
- `POST /api/auth/signup` — user registration
- `GET /api/public/products` — list products
- `GET /api/public/categories/{categoryId}/products` — list products by category
- `POST /api/cart/create` — create or update cart
- `POST /api/order/users/payments/{paymentMethod}` — place order

## Deployment Details (Render)
This service is deployed on Render. A typical workflow:
- Connect the GitHub repo or Docker image.
- Set environment variables from the table above.
- Provision a managed PostgreSQL database (or use external MySQL/Postgres).
- Render builds from the provided `Dockerfile` and exposes port `8080`.

## Notes
- Database migrations are handled via Hibernate `ddl-auto=update` for local development. For production, consider a migration tool like Flyway or Liquibase.
- Ensure secrets are stored in Render environment settings, not in version control.

