import MiniCreatePost from '@/components/MiniCreatePost'
import PostFeed from '@/components/PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import React from 'react'
interface pageProps {
  params :{
    slug: string
  }
}

const page = async({params}:pageProps) => {
    const {slug} = params
    const session = await getAuthSession()

    const subreddit = await db.subreddit.findFirst({
        where: {
            name: slug
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    subreddit: true,
                    comments: true

                },
            take: INFINITE_SCROLL_PAGINATION_RESULTS
            }
        }
    })

    if(!subreddit) {
        return  notFound()
    }
  return <>
    <h1 className='font-bold text-3xl md:text-4xl h-14'>r/{subreddit.name}</h1>
    <MiniCreatePost session={session}/>
    <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
  </>
}

export default page