# 📚 API Documentation - Users & Events 🎉

Este documento describe los endpoints disponibles en el backend para la gestión de Users y Events, facilitando la integración con el frontend. 🚀

## 📋 Tabla de Endpoints

### 👥 Users

| NAME | METHOD | ENDPOINT | AUTH | BODY | CONTENT-TYPE | RESPONSE |
|------|--------|----------|------|------|--------------|----------|
| **Get All Users** 👨‍👩‍👧‍👦 | GET | `/api/v1/users` | ❌ No | N/A | `application/json` | `[ { "id", "fullName", "username", "email", "events" } ]` |
| **Get User by ID** 🔍 | GET | /api/v1/users/:id | ❌ No | N/A | `application/json` | `{ "id", "fullName", "username", "email", "events" }` |
| **Register User** 📝 | POST | `/api/v1/users/register` | ❌ No | {` "fullName", "username", "email", "password", "confirmPassword" }` | `application/json` | `{ "message": "Usuario registrado exitosamente", "user": { "id", "fullName", "username", "email" } }` |
| **Login User** 🔐 | POST | `/api/v1/users/login` | ❌ No | {` "usernameOrEmail", "password" }` | `application/json` | `{ "token", "user": { "id", "fullName", "username", "email" } }` |
| **Update User** ✏️ | PUT | `/api/v1/users/update/:id` | ✅ Yes | {` "username", "email", "password" }` | `application/json` | `{ "id", "username", "email", "events" }` |
| **Delete User** 🗑️ | DELETE | `/api/v1/users/delete/:id` | ✅ Yes | N/A | `application/json` | `{ "message": "Cuenta eliminada correctamente" }` |

### 🎭 Events

| NAME | METHOD | ENDPOINT | AUTH | BODY | CONTENT-TYPE | RESPONSE |
|------|--------|----------|------|------|--------------|----------|
| **Get All Events** 📅 | GET | `/api/v1/events` | ❌ No | N/A | `application/json` | `[ { "id", "title", "location", "date", "organizer" } ]` |
| **Create Event** 🎊 | POST | `/api/v1/events` | ✅ Yes | `{ "title", "img", "description", "location", "date" }` | `application/json` | `{ "id", "title", "description", "location", "date", "organizer" }` |
| **Attend Event** 🙋‍♂️ | POST | `/api/v1/events/attend/:eventId` | ✅ Yes | N/A | `application/json` | `{ "message": "Registrado al evento exitosamente" }` |
| **Remove Attendance** 🚫 | DELETE | `/api/v1/events/attend/:eventId` | ✅ Yes | N/A | `application/json` | `{ "message": "Asistencia eliminada exitosamente" }` |
| **Get Attending Events** 📆 | GET | `/api/v1/events/attend` | ✅ Yes | N/A | `application/json` | `[ { "id", "title", "location", "description" } ]` |
| **Delete Event** 🗑️ | DELETE | `/api/v1/events/:eventId` | ✅ Yes (Only Organizer) | N/A | `application/json` | `{ "message": "Evento eliminado" }` |
| **Get Event Attendees** 👥 | GET | `/api/v1/events/:eventId/attendees` | ✅ Yes (Only Organizer) | N/A | `application/json` | `[ { "id", "username", "email" } ]` |

## 🌟 Ejemplos de Requests y Responses
### 📝 **Registro de Usuario**
- **Endpoint:** `/api/v1/users/register`
- **Body:**
```json
{
  "fullName": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```
  
  
- **Response:**
```json
  {
    "message": "Usuario registrado exitosamente",
    "user": {
      "id": "63bfc4e5b4b0a1234a5",
      "fullName": "Test User",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
```
  
### **🔐 Inicio de Sesión**
- **Endpoint:** `/api/v1/users/login`
- **Body:**
 ```json
  {
    "usernameOrEmail": "test@example.com",
    "password": "123456"
  }
  ```
  
- **Response:**

```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "63bfc4e5b4b0a1234a5",
      "fullName": "Test User",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
```
  
## **🎊 Creación de Evento**
- **Endpoint:** `/api/v1/events`
- **Body:**
```json
  {
    "title": "Concierto en Vivo",
    "img": "https://image.url",
    "description": "Un evento increíble",
    "location": "Auditorio Nacional",
    "date": "2024-12-10T20:00:00Z"
  }
```
  
- **Response:**
```json
{
    "id": "63bfd8e5b4b0a6789c",
    "title": "Concierto en Vivo",
    "description": "Un evento increíble",
    "location": "Auditorio Nacional",
    "date": "2024-12-10T20:00:00Z",
    "organizer": "63bfc4e5b4b0a1234a5"
  }
  ````