import { BiSearch } from 'react-icons/bi'

export default function SearchChannel() {
    return (
        <div className='relative'>
            <input
                type='text'
                className='bg-search-bar w-full rounded-lg py-3 px-2 pl-10 text-light-gray focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-medium-gray font-medium'
                placeholder='Search'
            />
            <BiSearch className='absolute top-3 left-2 text-2xl' />
        </div>
    )
}
