# Data Entry Software

A Node.js web application for managing user data with a MySQL database. Easily add, edit, delete, and search users through a simple web interface.

---

## Features

- **Add Users:** Create new users with username, email, and password.
- **Edit Username:** Update a user's username (requires password verification).
- **Delete Users:** Remove users from the database.
- **Search Users:** Find users by username or email.
- **User Count:** View the total number of users.
- **Responsive UI:** Built with EJS templates for dynamic rendering.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (via `mysql2`)
- **Templating:** EJS
- **Utilities:** Faker.js (random data), Method-Override (form PATCH/DELETE)

---

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure MySQL**
   - Create a database named `DB`.
   - Create a table named `user`:
     ```sql
     CREATE TABLE user (
       id VARCHAR(255) PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password VARCHAR(255) NOT NULL
     );
     ```
   - Update MySQL credentials in `index.js` if needed.

4. **Run the app**
   ```sh
   node index.js
   ```

5. **Access the app**
   - Open [http://localhost:8080/home](http://localhost:8080/home) in your browser.

---

## Project Structure

- `index.js` — Main server file
- `views/` — EJS templates
  - `home.ejs` — Home page (user count)
  - `showusers.ejs` — List/search users
  - `new.ejs` — Add user form
  - `edit.ejs` — Edit user form

---

## API Endpoints

- `GET /home` — Show user count
- `GET /users` — List all users
- `GET /users/new` — Form to add user
- `POST /users` — Add user
- `GET /users/search?search=...` — Search users
- `GET /users/:id/edit` — Edit user form
- `PATCH /users/:id` — Update username (with password check)
- `DELETE /users/:id` — Delete user

---

## License