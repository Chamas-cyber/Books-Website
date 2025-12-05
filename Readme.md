Online Book Store is a web application for managing a personal or small-library book collection, built using React, Node.js, Express, and MongoDB.
It allows users to add, view, edit, delete books, and (optionally) log in to manage their own library.

🚀 Features
✅ User registration & login (with password hashing, if you implemented auth)

📚 Add, edit, delete, and view books (CRUD)

🔍 Basic navigation between pages using React Router

💬 Snackbar notifications for success and error messages

📱 Responsive layout for desktop, tablet, and mobile

🧼 Clean and simple UI for fast book management

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, React Router, Notistack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Tools: VS Code, Git, MongoDB Compass, Postman (for testing, not required to run)

🔐 Environment Variables
Create a .env file in your backend folder (e.g. /backend) based on .env.example and fill:

text
MONGODB_URI=mongodb://localhost:27017/bookstore
PORT=5000
# If you have auth:
JWT_SECRET=your_jwt_secret_here
Make sure MongoDB is running locally or use a cloud connection string.

📦 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/Chamas-cyber/Books-Website.git
cd Books-Website
2. Install backend dependencies
bash
cd backend
npm install
3. Install frontend dependencies
bash
cd ../frontend
npm install
4. Configure environment
In /backend, create .env (or copy from .env.example) and set MONGODB_URI, PORT, etc.

5. Run the application
In two terminals:

Terminal 1 – Backend

bash
cd backend
npm run dev   # or: npm start
Backend will run on http://localhost:5000.

Terminal 2 – Frontend

bash
cd frontend
npm run dev
Frontend will run on something like http://localhost:5173.

🎯 Usage
Open the app in your browser (frontend URL).

(If auth enabled) Register a new user and log in.

Go to the book list page to see all stored books.

Click “Add Book” to create a new book (title, author, publish year).

Use Edit to update a book and Delete to remove it.

Check that the layout works both on desktop and mobile (e.g. via browser dev tools).

✅ Manual Test Cases
User Authentication (if implemented)
Test Case 1: User can sign up with valid credentials

Go to registration page.

Enter valid name, email, password.

Click “Register”.

Expected: User is created and redirected to login.

Test Case 2: User cannot sign up with existing email

Go to registration page.

Enter an already registered email.

Click “Register”.

Expected: Error message like “Email already registered”.

Test Case 3: User can log in with valid credentials

Go to login page.

Enter valid email and password.

Click “Login”.

Expected: User is redirected to the book list/dashboard.

Test Case 4: User cannot access protected pages without login

Log out.

Manually open /books (or your protected route).

Expected: Redirected to login page.

Book Management (CRUD)
Test Case 1: User can add a book

Click “Add Book”.

Enter title, author, and publish year.

Click “Save”.

Expected: New book appears in the list, success snackbar shown.

Test Case 2: Validation prevents empty title

Click “Add Book”.

Leave title empty.

Click “Save”.

Expected: Error message shown, book not created.

Test Case 3: User can edit a book

Click “Edit” on an existing book.

Change the publish year.

Click “Save”.

Expected: Updated year appears in the list.

Test Case 4: User can delete a book

Click “Delete” on an existing book.

Confirm deletion.

Expected: Book is removed from list.

Responsive Design
Test Case 1: Layout on mobile

Open app in browser.

Use dev tools to set width to around 375px (e.g. iPhone view).

Expected:

Book cards/forms stack vertically.

Buttons and text are readable without horizontal scroll.