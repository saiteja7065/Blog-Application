import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function Signup() {
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  // Redirect to home if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate("/")
    }
  }, [isSignedIn, navigate])

  return (
    <div className='flex justify-center items-center h-[90vh] bg-gradient-to-r from-blue-100 to-purple-200'>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
          path="/signup"
          routing="path"
          afterSignInUrl="/"
          afterSignUpUrl="/"
          redirectUrl="/"
        />
      </div>
    </div>
  )
}

export default Signup