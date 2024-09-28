
import React ,{FC} from 'react'

import CloseModal from '../../../components/CloseModal'
import SignUp from '../../../components/SignUp'
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
                <SignUp/>
            </div>
        </div>
    </div>

  )
}

export default page