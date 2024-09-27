'use client'
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import {signIn} from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { Icon } from 'lucide-react'
import { Icons } from './Icons'


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserAuthForm: FC<UserAuthFormProps> = ({className,...props}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const loginWithGoogle = async() => {
        setIsLoading(true)
        new Promise(() => {
            setTimeout(() => {
                console.log("hi")
            }, 2000)
        })
        try {
            throw new Error()
            await signIn("google")
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error logging in with Google",
                variant: "destructive",
            })
            //tose notification
        }finally{
            setIsLoading(false)
        }

    }

  return (
            <div className={cn("flex items-center justify-center gap-2",className)}{...props}>
                <Button size={"sm"} isLoading={isLoading} onClick={loginWithGoogle} className='w-full' >
                    <Icons.google className='mr-2 h-4 w-4' /> Google
                    </Button>
            </div>
  )
}

export default UserAuthForm