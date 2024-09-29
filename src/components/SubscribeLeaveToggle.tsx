'use client'
import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/UseCustomToast'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
    subredditId: string
    subredditName: string,
    isSubscribe: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({subredditId,subredditName,isSubscribe}) => {
    const router = useRouter()
    const {loginToast} = useCustomToast()
    const {mutate:subscribe,isLoading:isSubscribeLoading} = useMutation({
        mutationFn: async() => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }
            const {data} = await axios.post('/api/subreddit/subscribe', payload)
            return data as string
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                if(error.response?.status === 401) {
                    return loginToast()
                }
            }
            return toast({
                title: "There was an error",
                description: "Something went wrong ,could not subscribe",
                variant: "destructive"
            })
        },
        onSuccess: (data) => {
            startTransition(() => {
                router.refresh()
            })
            return toast({
                title: "Subscribed",
                description: `now you are Subscribed to r/${subredditName}`,
                variant: "default"
            })
        }
    })
    
    const {mutate:unsubscribe,isLoading:isUnsubscribeLoading} = useMutation({
        mutationFn: async() => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }
            const {data} = await axios.post('/api/subreddit/unsubscribe', payload)
            return data as string
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                if(error.response?.status === 401) {
                    return loginToast()
                }
            }
            return toast({
                title: "There was an error",
                description: "Something went wrong ,could not subscribe",
                variant: "destructive"
            })
        },
        onSuccess: (data) => {
            startTransition(() => {
                router.refresh()
            })
            return toast({
                title: "Subscribed",
                description: `now you  Unsubscribed to r/${subredditName}`,
                variant: "default"
            })
        }
    })
    
  return isSubscribe ? <Button isLoading={isUnsubscribeLoading} onClick={() => unsubscribe()} className='w-full mt-1 mb-4'>Leave Community</Button> : <Button isLoading={isSubscribeLoading} onClick={() => subscribe()} className='w-full mt-1 mb-4'>Join to post</Button> 
}

export default SubscribeLeaveToggle