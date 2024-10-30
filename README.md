# API Documentation - Users & Events

Este documento contiene la descripción de los endpoints disponibles en el backend de **Users** y **Events** para facilitar la integración con el frontend.

## Tabla de Endpoints

| **NAME**                 | **METHOD** | **ENDPOINT**                                    | **AUTH**       | **BODY**                                                                                                                                              | **CONTENT-TYPE**        | **RESPONSE**                                           |
|--------------------------|------------|------------------------------------------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|--------------------------------------------------------|
| **Get All Users**         | GET        | `/api/v1/users`                                | ❌ No          | N/A                                                                                                                                                    | `application/json`      | `[ { "id", "username", "email", "events" } ]`          |
| **Get User by ID**        | GET        | `/api/v1/users/:id`                            | ❌ No          | N/A                                                                                                                                                    | `application/json`      | `{ "id", "username", "email", "events" }`              |
| **Register User**         | POST       | `/api/v1/users/register`                       | ❌ No          | `{ "username", "email", "password" }`                                                                                                                   | `application/json`      | `{ "user": { "id", "username", "email" } }`            |
| **Login User**            | POST       | `/api/v1/users/login`                          | ❌ No          | `{ "usernameOrEmail", "password" }`                                                                                                                     | `application/json`      | `{ "token", "user": { "id", "username", "email" } }`   |
| **Update User**           | PUT        | `/api/v1/users/update/:id`                     | ✅ Yes         | `{ "username", "email", "password", "avatar" }`                                                                                                         | `application/json`      | `{ "id", "username", "email", "avatar" }`              |
| **Delete User**           | DELETE     | `/api/v1/users/delete/:id`                     | ✅ Yes         | N/A                                                                                                                                                    | `application/json`      | `{ "message": "Cuenta eliminada correctamente" }`      |
| **Get All Events**        | GET        | `/api/v1/events`                               | ❌ No          | N/A                                                                                                                                                    | `application/json`      | `[ { "id", "title", "location", "date", "organizer" } ]` |
| **Create Event**          | POST       | `/api/v1/events`                               | ✅ Yes         | `{ "title", "img", "description", "location", "date" }`                                                                                                 | `application/json`      | `{ "id", "title", "description", "location", "date" }` |
| **Attend Event**          | POST       | `/api/v1/events/attend/:eventId`               | ✅ Yes         | N/A                                                                                                                                                    | `application/json`      | `{ "message": "Registrado al evento exitosamente" }`   |
| **Remove Attendance**     | DELETE     | `/api/v1/events/attend/:eventId`               | ✅ Yes         | N/A                                                                                                                                                    | `application/json`      | `{ "message": "Asistencia eliminada exitosamente" }`   |
| **Get Attending Events**  | GET        | `/api/v1/events/attend`                        | ✅ Yes         | N/A                                                                                                                                                    | `application/json`      | `[ { "id", "title", "location", "description" } ]`     |
| **Delete Event**          | DELETE     | `/api/v1/events/:eventId`                      | ✅ Yes (Only Organizer) | N/A                                                                                                                                             | `application/json`      | `{ "message": "Evento eliminado" }`                    |
| **Get Event Attendees**   | GET        | `/api/v1/events/:eventId/attendees`            | ✅ Yes (Only Organizer) | N/A                                                                                                                                             | `application/json`      | `[ { "id", "username", "email" } ]`                    |

---

## Ejemplos de Requests y Responses

### **Registro de Usuario**
- **Endpoint:** `/api/v1/users/register`
- **Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
  }