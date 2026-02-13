import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Signin() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  // Redirect to appropriate page based on user role
  React.useEffect(() => {
    if (isSignedIn) {
      const userRole = user?.publicMetadata?.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "author") {
        navigate("/author");
      } else {
        navigate("/");
      }
    }
  }, [isSignedIn, navigate, user]);

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
          path="/signin"
          routing="path"
          afterSignInUrl="/"
          afterSignUpUrl="/"
          redirectUrl="/"
        />
      </div>
    </div>
  );
}

export default Signin;