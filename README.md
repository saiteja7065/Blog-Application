# Fullstack-BlogApplication-Astra.io

# Astra.io - Modern Full Stack Blog Platform

A modern, feature-rich blogging platform built with React, Node.js, and MongoDB. Features a beautiful UI with dark/light mode support, user authentication, and a rich text editor for blog creation.

![Astra.io Banner](https://iili.io/3dYEAL7.png)

## ✨ Features

- 🌓 Dark/Light Mode Toggle
- 🔐 Secure Authentication with Clerk
- 📝 Rich Text Editor for Blog Posts
- 🎨 Modern UI with Material Tailwind
- 📱 Fully Responsive Design
- 🔍 Search Functionality
- 🏷️ Category-based Blog Organization
- 💬 Comment System
- 👤 User Profiles
- 📊 Author Dashboard

## 🛠️ Tech Stack

### Frontend
- React.js
- Material Tailwind
- TailwindCSS
- React Router DOM
- Clerk Authentication
- React Query
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Shashank6717/Fullstack-BlogApplication-Astra.io.git
cd Fullstack-BlogApplication-Astra.io
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

Create a \`.env\` file in the server directory:
\`\`\`env
DBURL=your_mongodb_uri
PORT=3000
\`\`\`

Create a \`.env\` file in the client directory:
\`\`\`env
VITE_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_APP_CLERK_SECRET_KEY=your_clerk_secret_key
\`\`\`

## 📋 Required Packages

### Frontend Dependencies
\`\`\`json
{
    "@clerk/clerk-react": "^4.0.0",
    "@material-tailwind/react": "^2.0.0",
    "@tanstack/react-query": "^4.0.0",
    "axios": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-hot-toast": "^2.0.0",
    "react-icons": "^4.0.0",
    "react-quill": "^2.0.0",
    "react-router-dom": "^6.0.0",
    "tailwindcss": "^3.0.0"
}
\`\`\`

### Backend Dependencies
\`\`\`json
{
    "express": "^4.0.0",
    "mongoose": "^7.0.0",
    "cors": "^2.0.0",
    "dotenv": "^16.0.0",
    "multer": "^1.0.0"
}
\`\`\`

## 🚀 Running the Application

1. Start the backend server:
\`\`\`bash
cd server
node server.js
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd client
npm run dev
\`\`\`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

## 📝 License

This project is [MIT](./LICENSE) licensed.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Shashank6717](https://github.com/Shashank6717)
- LinkedIn: [Shashank Dornala](www.linkedin.com/in/shashank-dornala-24108b348)

## 🙏 Acknowledgments

- Material Tailwind for the beautiful UI components
- Clerk for the authentication system
- All contributors who helped improve this project