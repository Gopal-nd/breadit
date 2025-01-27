import React from "react";
import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { getAuthSession } from '@/lib/auth'
import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export default  async function Home() {
  const session = await getAuthSession()
  
  return <>

  <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">


    {/* Feed */}
      {/* @ts-expect-error server component */}
    {session ? <CustomFeed /> : <GeneralFeed  />}

    {/* subreddit infon */}

    <div className="overflow-hidden h-fit rounded-lg border boreder-grey-300 order-first md:order-last">
    <div className="bg-emerald-100 px-6 py-4">
      <p className="font-semibold py-3 flex items-center gap-1.5">
        <HomeIcon className="w-4 h-4" />
        Home
      </p>
    </div>

    <div className="my-3 divide-y divide-grey-100 px-6 py-4 text-sm leading-6">
      <div className="flex justify-between gap-x-4 py-3 ">
        <p className="text-zinc-500">
          Your Personal Breadit HomePage some here to chec in with your favorite communities and topics.
        </p>
      </div>
      <Link href={"/r/create"} className={buttonVariants({
        className: "w-full mt-4 mb-6",
      })}>
        Create Community
      </Link>
    </div>

    </div>
  </div>
  </>
}
