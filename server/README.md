# Chat App

A simple chat application with user authentication and basic user management.

## Features

- User registration
- User login
- Update user profile (email, password, name)
- Delete user account
- Secure authentication

## API Endpoints

### Authentication

#### `POST /auth/login`

Login a user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response Body:**

```json
{
  "token": "token"
}
```

### User Creation

### `POST /user/register`

**Request Body:**

```json
{
  "name": "test name",
  "email": "test@gmail.com",
  "password": "qwerty"
}
```

**Response Body:**

```json
{
  "status": "sucess",
  "message": "user created",
  "user": {
    "id": "userID",
    "email": "test@gmail.com"
  }
}
```

### `PATCH /user`

**Request Headers:**

```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

**Response Body:**

```json
{
  "status": "success",
  "message": "User updated",
  "data": {
    "name": "Ranjan Thapa Chhetri",
    "email": "ranjanthapa12432@gmail.com"
  }
}
```

### `DELETE /user`

**Request Headers:**

```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Response Body:**

```json
{
  "status": "success",
  "message": "User account deleted successfully"
}
```

