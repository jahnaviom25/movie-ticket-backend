
Movie Ticket Booking Backend API

This is a secure and scalable backend API for a Movie Ticket Booking Web Application built using Node.js, Express.js, and MySQL. It supports user authentication, role-based access control, movie and theatre management (admin-only), and booking functionality for users.

---

Features

- User registration & login with JWT authentication
-  Role-based access control (`admin` / `user`)
-  CRUD operations for:
  - Movies (admin only)
  - Theatres (admin only)
  - Bookings (user only)
- Middleware for authentication & authorization
- MySQL database integration
- `.sql` script to create all required tables
- RESTful API structure

---

Technologies Used

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- Bcrypt (for password hashing)
- dotenv
- nodemon

---

Project Structure

```
movie-ticket-backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── movie.controller.js
│   ├── theatre.controller.js
│   ├── booking.controller.js
│   └── user.controller.js
│
├── routes/
│   ├── auth.routes.js
│   ├── movie.routes.js
│   ├── theatre.routes.js
│   ├── booking.routes.js
│   └── user.routes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── db.js
│
├── .env
├── app.js
├── package.json
├── schema.sql
└── README.md
```

---

Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/jahnaviom25/movie-ticket-backend.git
cd movie-ticket-backend
```

2. Install Dependencies

```bash
npm install
```

3. Create `.env` File

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=token12345
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Jahnavi@123
DB_NAME=movie_ticket_db
```

> Replace with your actual MySQL credentials.

---

4. Import Database Schema

Use MySQL Workbench or CLI to import `schema.sql` into your database:

```bash
mysql -u root -p movie_ticket_db < schema.sql
```

---

5. Run the Server

```bash
npm start
```

The server will run at: `http://localhost:3000`

---

API Endpoints

Auth (Public)

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/api/register`  | Register new user  |
| POST   | `/api/login`     | Login & get token  |

---

Protected Routes (Require JWT)

Role: Admin

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | `/api/movies`      | Create movie        |
| GET    | `/api/movies`      | Get all movies      |
| PUT    | `/api/movies/:id`  | Update movie        |
| DELETE | `/api/movies/:id`  | Delete movie        |
| POST   | `/api/theatres`    | Create theatre      |
| GET    | `/api/theatres`    | Get all theatres    |
| PUT    | `/api/theatres/:id`| Update theatre      |
| DELETE | `/api/theatres/:id`| Delete theatre      |
| GET    | `/api/users`       | List all users      |

---
Role: User

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/bookings`       | Create a booking        |
| GET    | `/api/bookings`       | Get user bookings       |
| PUT    | `/api/bookings/:id`   | Update a booking        |
| DELETE | `/api/bookings/:id`   | Delete a booking        |

---

Authentication & Authorization

- All protected routes require a JWT token in the request headers:
```
Authorization: Bearer <your_token>
```
- Middleware ensures users only access allowed routes based on their role.

---

Sample Users

Admin
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

User
```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

---
Testing with Postman

1. Register or login to get a JWT token.
2. Include the token in all protected API requests.
3. Test CRUD operations for movies, theatres, and bookings based on your role.

---

License

This project is licensed under the [MIT License](LICENSE).

---

Author

Jahnavi O M 
GitHub: [@jahnaviom25](https://github.com/jahnaviom25)

---

> For any queries or issues, feel free to raise an issue in the repository or contact me directly.
