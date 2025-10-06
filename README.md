# Notes Manager

A simple web application to manage notes, built with Laravel (backend) and React (frontend). The app allows users to create, view, edit, and delete notes with a clean UI using shadcn/ui components.

---

## Features

- User authentication (login/logout)
- Notes management (CRUD: Create, Read, Update, Delete)
- Confirmation dialog before deleting a note
- Flash notifications for user actions
- Responsive card-based layout for notes
- Clean, minimal design with shadcn/ui components

---

## Tech Stack

- **Backend:** Laravel
- **Frontend:** React, TypeScript, Inertia.js, shadcn/ui
- **Database:** MySQL

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install backend dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Configure environment

Copy .env.example to .env and update your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=notes
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
```

Generate application key:

```bash
php artisan key:generate
```

### 5. Run database migrations

```bash
php artisan migrate
```

### 6. Start the project

Run the project:

```bash
composer run dev
```

The app should now be available at http://127.0.0.1:8000

---

## Notes on Implementation

Routing: Laravel routes with Inertia.js provide a seamless SPA experience.

Authentication: Leveraged default Laravel authentication.

Notes CRUD: Implemented using Inertia forms and Laravel controllers.

Dialog: Custom delete confirmation implemented using shadcn/ui Dialog component.

UI: Cards layout for notes using flexbox for multiple notes in a row.

### Assumptions:

Only authenticated users can manage notes.

Notes have title, description, created_at, and updated_at.

Default Laravel authentication.

## Future Improvements

Add pagination for notes.

Add unit and integration tests for backend and frontend.

Implement full two-factor authentication flow.

Add search and filter functionality for notes.

Containerize the application with Docker for easier deployment.