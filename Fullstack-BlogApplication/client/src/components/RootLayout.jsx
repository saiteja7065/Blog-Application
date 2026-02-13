import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeContext } from "../contexts/ColorContext";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function RootLayout() {
  const { isNightMode, toggleTheme } = React.useContext(ThemeContext);
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

    
    <div className={`min-h-screen flex flex-col ${isNightMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      <Header />
      <div style={{ minHeight: "90vh" }} className={`flex-grow ${isNightMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  
    </ClerkProvider>
  );
}

export default RootLayout;
