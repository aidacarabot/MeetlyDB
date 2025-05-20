# Meetly - Event Management Platform 🎉

## 🌐 Web
[https://project-meetly-app.vercel.app/](https://project-meetly-app.vercel.app/)

## 📖 Description
Meetly is a full-stack event management platform that allows users to easily create, manage, and join events. It features user authentication, event creation and management, and an intuitive interface for seamless interaction.

The project is built with JavaScript, Node.js, Express, and MongoDB, providing a robust backend and dynamic frontend.

## 🔗 GitHub Repositories
- Frontend: [https://github.com/aidacarabot/MeetlyFront](https://github.com/aidacarabot/MeetlyFront)
- Backend: [https://github.com/aidacarabot/MeetlyDB](https://github.com/aidacarabot/MeetlyDB)

## 🛠️ Technologies Used
- Frontend: JavaScript, React (assumed from structure, please confirm if React)
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Hosting: Possibly MongoDB Atlas

## 🚀 Main Features
- User registration, login, and update with secure JWT authentication.
- Event creation, viewing, editing, and deletion.
- Users can register to attend events and remove their attendance.
- Only event organizers can delete events or view the list of attendees.
- View events a user is attending.
- RESTful API with clearly defined endpoints for users and events.

## 📋 Backend API - Main Endpoints

### Users
| Action                   | Method | Endpoint                   | Auth Required | Description                             |
|--------------------------|--------|----------------------------|---------------|---------------------------------------|
| Get all users            | GET    | `/api/v1/users`             | No            | List all users                        |
| Get user by ID           | GET    | `/api/v1/users/:id`         | No            | Get user details                     |
| Register user            | POST   | `/api/v1/users/register`    | No            | Register a new user                  |
| Login                   | POST   | `/api/v1/users/login`       | No            | Login and get JWT token              |
| Update user             | PUT    | `/api/v1/users/update/:id`  | Yes           | Update user data                    |
| Delete user             | DELETE | `/api/v1/users/delete/:id`  | Yes           | Delete user account                  |

### Events
| Action                  | Method | Endpoint                    | Auth Required           | Description                         |
|-------------------------|--------|-----------------------------|-------------------------|-----------------------------------|
| Get all events          | GET    | `/api/v1/events`             | No                      | List all events                   |
| Create new event        | POST   | `/api/v1/events`             | Yes                     | Create a new event                |
| Attend event            | POST   | `/api/v1/events/attend/:eventId` | Yes                 | Register attendance to event     |
| Remove attendance       | DELETE | `/api/v1/events/attend/:eventId` | Yes                 | Cancel attendance                |
| Get attended events     | GET    | `/api/v1/events/attend`      | Yes                     | Get events the user is attending  |
| Delete event            | DELETE | `/api/v1/events/:eventId`    | Yes (Organizer only)     | Delete event (only organizer)    |
| Get event attendees     | GET    | `/api/v1/events/:eventId/attendees` | Yes (Organizer only) | List event attendees             |

## 💻 Usage Examples

### User Registration
```json
POST /api/v1/users/register
{
  "fullName": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### User Login
```json
POST /api/v1/users/login
{
  "usernameOrEmail": "test@example.com",
  "password": "123456"
}
```

### Create Event
```json
POST /api/v1/events
{
  "title": "Live Concert",
  "img": "https://image.url",
  "description": "An amazing event",
  "location": "National Auditorium",
  "date": "2024-12-10T20:00:00Z"
}
```

## 🔒 Security
- Uses JWT to protect private routes.
- Token validation for restricted access.
