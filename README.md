# BlogSphere – A Scalable GCP-Deployed Blog Application

BlogSphere is a full-stack blogging platform where users can register, log in, view other users' posts, create their own blogs with images, comment on posts, and manage their content securely. The entire application is cloud-native, deployed on Google Cloud using App Engine and Cloud SQL for scale and reliability.

---

## ✨ Features

- User registration and secure login using JWT authentication
- View all public blog posts from other users
- Create personal blog posts with optional image uploads
- Upload images directly to GCP Cloud Storage
- Edit and delete your own blog posts
- Add comments to other users' posts
- Data stored in Google Cloud SQL (MySQL)
- Fully Dockerized frontend and backend apps
- Backend and frontend deployed independently to Google Cloud App Engine

---

## 🧰 Tech Stack

| Layer         | Technologies Used                                      |
|---------------|--------------------------------------------------------|
| **Frontend**  | React.js, Axios                                |
| **Backend**   | Spring Boot, JWT, REST APIs, Docker                    |
| **Database**  | Google Cloud SQL (MySQL)                               |
| **Cloud**     | Google Cloud App Engine, Cloud Storage, Cloud Console |
| **Other**     | GCP IAM, Cloud Build, DockerHub (for image hosting)   |
---

### 🔹 Frontend (React.js)
- Built using React.js
- Axios for API requests
- Routes: Login, Register, Home, Create Post, View Post, Edit Post
- Dockerized for GCP deployment

### 🔹 Backend (Spring Boot)
- RESTful API
- JWT-based authentication
- CRUD operations for posts and comments
- GCP Cloud Storage integration for image uploads
- Configured for Cloud SQL using JDBC

## 🏗️ Deployment (GCP)

- **Dockerized both frontend and backend** using multi-stage builds
- Uploaded Docker images to DockerHub
- Deployed each service independently on **Google Cloud App Engine**
- Used environment variables and IAM roles to securely access Cloud SQL and Cloud Storage
- Backend interacts directly with Cloud SQL using JDBC and GCP socket path
- Frontend is served as a stateless App Engine service connected to the backend via secure endpoints

---

## 🔗 Backend Repository

👉 [View BlogSphere Backend GitHub Repo](https://github.com/VaibhavShanbhag/BlogApp-Backend)

