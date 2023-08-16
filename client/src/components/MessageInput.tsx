import { IoMdSend } from 'react-icons/io'

export default function MessageInput() {
    return (
        <form className='relative flex items-center justify-center py-6 lg:px-10 px-5'>
            <input
                type='text'
                className='w-full py-3 bg-search-bar rounded-lg px-4 text-light-gray outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200'
                placeholder='Type a message here'
            />
            <button
                type='submit'
                className='absolute lg:right-12 right-7 bg-blue-btn p-2 rounded-lg duration-200 hover:opacity-80'
            >
                <IoMdSend className='text-white text-xl' />
            </button>
        </form>
    )
}
