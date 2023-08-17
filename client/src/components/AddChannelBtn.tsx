import { BiPlus } from 'react-icons/bi'
import NewChannelModal from './NewChannelModal'

export default function AddChannelBtn() {
    return (
        <NewChannelModal>
            <div className='bg-dark-gray rounded-lg p-1'>
                <BiPlus className='text-lighter-gray' />
            </div>
        </NewChannelModal>
    )
}
