'use client'
import { Session } from 'next-auth'
import { FC } from 'react'
import UserAvatarProps from './UserAvatarProps'
import { Input } from './ui/input'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/Button'
import { ImageIcon, Link2 } from 'lucide-react'

interface MiniCreatePostProps {
  session: Session| null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({session}) => {
    const router = useRouter()
    const pathname  = usePathname()
  return (
    <li className='overflow-hidden rounded-md list-none bg-white shadow-sm'>
        <div className="h-full px-6 py-4 flex justify-between gap-6">
            <div className="relative">
                <UserAvatarProps user={{
                    name: session?.user?.name || null,
                    image: session?.user?.image || null
                }}/>
                < span className='absolute right-0 bottom-0 rounded-full w-3 h-3 bg-green-500  outline outline-2 outline-white'/>
            </div>
            <Input
            readOnly
            placeholder='Create post'
            onClick={()=>router.push(pathname+'/submit')} />

            <Button
            onClick={()=>router.push(pathname+'/submit')}
            variant={'ghost'}
            >
                <ImageIcon className='text-zinc-500' />
            </Button>

            <Button
            onClick={()=>router.push(pathname+'/submit')}
            variant={'ghost'}
            >
                <Link2 className='text-zinc-500' />
            </Button>


        </div>
    </li>
  )
}

export default MiniCreatePost