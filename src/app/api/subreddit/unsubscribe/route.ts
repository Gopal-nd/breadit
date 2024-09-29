import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export const POST = async(req:Request,res:Response) => {
    const body = await req.json()

    try {
        const Session = await getAuthSession()
        if(!Session?.user) {  
            return new Response("Unauthorized", { status: 401 });
        }

        const {subredditId} = SubredditSubscriptionValidator.parse(body)

        const subscriptionExist = await db.subscription.findFirst({
            where: {
                subredditId:subredditId,
                userId: Session.user.id
            }
        })

        if(!subscriptionExist) {
            return new Response("You've not been subscribed to this subreddit, yet.", { status: 400 });
        }

        // const subreddit = await db.subreddit.findFirst({
        //     where: {
        //         id: subredditId,creatorId: Session.user.id
        //     }
        // })

        // if(!subreddit) {
        //     return new Response("Creator  cannot unsubscribe", { status: 400 });
        // }

        await db.subscription.delete({
            where: {
                userId_subredditId: {
                    subredditId:subredditId,
                    userId: Session.user.id
                }
            }
        })
        return new Response("Unubscribed", { status: 200 });
    } catch (error) {
        
        if(error){
            if(error instanceof z.ZodError) {
                return new Response("Invalid request", { status: 422 });
            }
            return new Response("Could not create a subscription", { status: 500 });
        }
        
    }
}