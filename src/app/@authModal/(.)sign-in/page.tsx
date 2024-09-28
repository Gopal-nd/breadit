
import React ,{FC} from 'react'
import SignIn from "../../../components/SignIn"
import CloseModal from '../../../components/CloseModal'
interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
        <div className="container flex h-full max-w-lg items-center mx-auto">
            <div className='relative h-fit py-20 px-2 rounded-lg bg-white w-full'>
                <div className="absolute top-4 right-4">
                    <CloseModal/>
                </div>
                <SignIn/>
            </div>
        </div>
    </div>

  )
}

export default page