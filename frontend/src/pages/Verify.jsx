import React from 'react'

const Verify = () => {
  return (
    <div className='relative w-full h-[760px] overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center bg-pink-100'>
            <div className='bg-white p-8 shadow-lg rounded-2xl w-full max-w-md text-center'>
                <h2 className='text-2xl font-bold mb-6 text-pink-600'>Verify Your Email</h2>
                <p className='mb-4'>A verification link has been sent to your email address. Please check your inbox and click on the link to verify your account.</p>
                <p className='mb-4'>If you did not receive the email, please check your spam folder or click the button below to resend the verification email.</p>
            </div>
        </div>
    </div>
  )
}

export default Verify