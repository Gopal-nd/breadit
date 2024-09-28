import { FC } from 'react'

interface pageProps {
  params :{
    slug: string
  }
}

const page: FC<pageProps> = ({params}) => {
    const {slug} = params
  return <div>{slug}</div>
}

export default page