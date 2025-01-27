import { FC } from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

interface SignInProps {
  
}

const SignIn: FC<SignInProps> = () => {
  return(
    <div className='container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]'>
        <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className='text-2xl font-semibold tracking-tight'>Welcome to Breadit</h1>
            <p className='text-sm max-w-xs mx-auto text-zinc-700'>
                By Continung you agree to our User Agreement and Privacy Policy
            </p>

            {/* Sign In Form */}
            <UserAuthForm />

            <p className="px-8 text-center text-sm text-zinc-700" >
                New to Bredit ?{' '}
                <Link href={'/sign-up'} className="hover:text-zinc-900 text-sm hover:underline-offset-4 hover:underline">
                Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default SignIn