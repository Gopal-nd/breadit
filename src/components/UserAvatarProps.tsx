import { FC } from 'react'
import {User} from 'next-auth'
import {Avatar, AvatarFallback} from './ui/avatar'
import React from 'react'
import Image from 'next/image'
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'
interface UserAvatarPropsProps extends AvatarProps{
  user : Pick<User,'name'|'image'>
}

const UserAvatarProps: FC<UserAvatarPropsProps> = ({user,...props}) => {
  return(

      <Avatar {...props}>
   {user.image ? (
    <div className='relative aspect-square h-full w-full'>
        <Image src={user.image} fill referrerPolicy='no-referrer' alt='profile picture'/>
    </div>
   ):(
    <AvatarFallback>
        <span className='sr-only'>{user?.name}</span>
        <Icons.user className='h-4 w-4' />
        </AvatarFallback>
   )}
  </Avatar>
)
}

export default UserAvatarProps