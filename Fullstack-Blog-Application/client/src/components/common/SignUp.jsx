import React from 'react'
import { SignUp} from '@clerk/clerk-react'

function Signup() {
  return (
    <div className='flex justify-center items-center h-[90vh] bg-gradient-to-r from-blue-100 to-purple-200'>
      <SignUp/>
    </div>
  )
}

export default Signup