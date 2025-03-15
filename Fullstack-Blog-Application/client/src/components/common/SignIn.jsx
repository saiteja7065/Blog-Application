import React from "react";
import { SignIn } from "@clerk/clerk-react";

function Signin() {
  return (
    <div className="flex justify-center items-center h-[90vh] bg-gradient-to-r from-blue-100 to-purple-200">
      <SignIn />
    </div>
  );
}

export default Signin;
