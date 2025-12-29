1. User Management and Authentication
This is a REST API built using NestJS, MongoDB and JWT Authentication that supports user registration, login, role-based authorization (admin & user), profile management, searching, pagination, soft & hard delete functionality with proper validation, middleware and interceptors.

2. Create .env file
MONGO_URI=mongodb://127.0.0.1:27017/user-management
JWT_SECRET=Kaushal

3. Run Project (Auto Reload)
npm start / npm run dev

5. API Endpoints
@token = <JWT_TOKEN>
@userId = <userId>

### Register User
POST http://localhost:3000/auth/register
Content-Type: application/json
{
  "name": "Kaushal",
  "email": "kaushal@gmail.com",
  "password": "123456"
}

### Login User
POST http://localhost:3000/auth/login
Content-Type: application/json
{
  "email": "kaushal@gmail.com",
  "password": "123456"
}

### Get User Profile
GET http://localhost:3000/users/profile
Authorization: Bearer <JWT_TOKEN>

### Update User Profile
PUT http://localhost:3000/users/profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "name": "Kaushal Updated",
  "password": "newpass123"
}

### Get All Users (Admin Only)
GET http://localhost:3000/users
Authorization: Bearer <JWT_TOKEN>

### Search By Name
GET http://localhost:3000/users/search/name?name=ka
Authorization: Bearer <JWT_TOKEN>

### Search By Email
GET http://localhost:3000/users/search/email?email=gmail
Authorization: Bearer <JWT_TOKEN>

### Pagination
GET http://localhost:3000/users/paginate?page=1
Authorization: Bearer {{token}}

### Soft Delete User
DELETE http://localhost:3000/users/<userId>
Authorization: Bearer <JWT_TOKEN>

### Hard Delete User
DELETE http://localhost:3000/users/hard/<userId>
Authorization: Bearer <JWT_TOKEN>


6. Folder Structure
user-management/
├── dist/
├── node_modules/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── roles.decorator.ts
│   │
│   ├── common/
│   │   ├── logger.middleware.ts
│   │   └── response.interceptor.ts
│   │
│   ├── users/
│   │   ├── current-user.decorator.ts
│   │   ├── user.schema.ts
│   │   ├── users.controller.spec.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.spec.ts
│   │   └── users.service.ts
│   │
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
├── .env
├── demo.http
├── package-lock.json
├── package.json
├── README.md



