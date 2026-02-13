# Fullstack-BlogApplication-Astra.io

# Astra.io - Modern Full Stack Blog Platform

A modern, feature-rich blogging platform built with React, Node.js, and MongoDB. Features a beautiful UI with dark/light mode support, role-based authentication (Author, User, Admin), and a category-based article management system.

![Astra.io Banner](https://iili.io/3dYEAL7.png)

## ✨ Features

- 🌓 Dark/Light Mode Toggle
- 🔐 Secure Authentication with Clerk
- 📝 Article Creation & Management
- 🎨 Modern UI with Material Tailwind, Mantine & MUI
- 📱 Fully Responsive Design
- 🏷️ Category-based Article Organization
- 💬 Comment System
- 👤 Role-based Access (Author / User / Admin)
- 📊 Author & Admin Dashboards
- ✨ Smooth Animations with Framer Motion & React Spring

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS 4
- Material Tailwind
- Mantine UI
- MUI (Material UI)
- Framer Motion & React Spring
- React Router DOM v7
- React Hook Form
- Clerk Authentication
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Clerk Express SDK
- Express Async Handler

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- A [Clerk](https://clerk.com) account for authentication keys

### Steps

1. Clone the repository:
\`\`\`bash
git clone https://github.com/saiteja7065/Blog-Application.git
cd Fullstack-BlogApplication
\`\`\`

2. Install dependencies for both frontend and backend:
\`\`\`bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
\`\`\`

3. Set up environment variables:

Create a \`.env\` file in the **server** directory:
\`\`\`env
PORT=3000
DBURL=mongodb://127.0.0.1:27017/blogapp
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
\`\`\`

Create a \`.env\` file in the **client** directory:
\`\`\`env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
\`\`\`

## 📋 Dependencies

### Frontend
\`\`\`json
{
    "@clerk/clerk-react": "^5.24.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.2.0",
    "@mantine/core": "^7.17.1",
    "@material-tailwind/react": "^2.1.10",
    "@mui/material": "^6.4.6",
    "@react-spring/web": "^9.7.5",
    "@tailwindcss/vite": "^4.0.9",
    "axios": "^1.8.1",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-router-dom": "^7.2.0",
    "tailwindcss": "^4.0.9"
}
\`\`\`

### Backend
\`\`\`json
{
    "@clerk/express": "^1.3.50",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-async-handler": "^1.2.0",
    "mongoose": "^8.11.0",
    "nodemon": "^3.1.9"
}
\`\`\`

## 🚀 Running the Application

1. Start the backend server:
\`\`\`bash
cd server
node server.js
# or with auto-reload:
npx nodemon server.js
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd client
npm run dev
\`\`\`

3. Open your browser at \`http://localhost:5173\`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](./LICENSE) licensed.

## 👨‍💻 Author

**Saiteja Garlapati**
- GitHub: [@saiteja7065](https://github.com/saiteja7065)
- LinkedIn: [Saiteja Garlapati](https://www.linkedin.com/in/saitejagarlapati)

## 🙏 Acknowledgments

- Material Tailwind, Mantine & MUI for UI components
- Clerk for the authentication system
- All contributors who helped improve this project