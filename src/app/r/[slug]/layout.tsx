import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import { format } from 'date-fns'
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'
const layout = async({children,params:{slug}}:{children:React.ReactNode,params:{slug:string} }) => {

    const session = await  getAuthSession()

    const subreddit = await db.subreddit.findFirst({
        where: {
            name: slug
        },include:{
            posts: {
                include: {
                    author: true,
                    votes: true,
                    subreddit: true,
                    comments: true
                },
                take: 5
            }
        }
    })

    

 const subscription = !session?.user ? undefined : await db.subscription.findFirst({
    where: {
        subreddit:{
            name: slug
        },
        user:{
            id: session.user.id
        }
    }
 })

 const isSubscribed = !!subscription 

 if(!subreddit) {
    return notFound()
 }


 const membercount = await db.subscription.count({
    where: {
        subreddit:{
            name: slug
        }
    }
 })
  return (
    <div className='sm:container max-w-7xl mx-auto h-full py-112'>
        <div>
            {/* button to take us back */}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-4 py-6'>
                <div className="flex flex-col col-span-2 space-y-6">
                    {children}
                </div>
                <div className='hidden md:block overflow-hidden h-fit rounded-lg boarder boarder-grey-300 oredr-first md:order-last'>
                    <div className="px-6 py-4">
                        <p className="font-semibold py-3">About r/ {subreddit.name}</p>
                    </div>
                    <dl className='divide-y divide-grey-100 px-6 py-4 text-sm leading-6 bg-white'>
                        <div className='flex justify-between gap-x-4 py-3'> 
                        <dt className='text-zinc-700'>Created</dt>
                        <dd className=' text-zinc-500'>
                            <time dateTime={subreddit.createdAt.toDateString()}>{format(subreddit.createdAt, 'MMMM d, yyyy')}</time>
                        </dd>
                        </div>
                        <div className='flex justify-between gap-x-4 py-3'>
                        <dt className='text-zinc-700'>Members</dt>
                        <dd className=' text-zinc-500'>
                            <div className='text-zinc-700'>{membercount}</div>
                        </dd>
                        </div>

                        {subreddit.creatorId=== session?.user.id && <div className='flex justify-between gap-x-4 py-3'>
                        <p className='text-zinc-700'>You Created This Community</p>
                        
                        </div>
                        }

                        {subreddit.creatorId!== session?.user.id && <div className='flex justify-between gap-x-4 py-3'>
                        
                        <><SubscribeLeaveToggle subredditId={subreddit.id} subredditName={slug} isSubscribe={isSubscribed}/></>
                        </div>
                        }
                    </dl>
                </div>
            </div>
        </div>
        </div>
  )
}

export default layout