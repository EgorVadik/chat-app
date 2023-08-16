import { BiPlus } from 'react-icons/bi'
import NewChannelModal from './NewChannelModal'

export default function AddChannelBtn() {
    return (
        <NewChannelModal>
            <button className='bg-dark-gray rounded-lg p-1'>
                <BiPlus className='text-lighter-gray' />
            </button>
        </NewChannelModal>
    )
}
