import { UserLogin, UserSignup } from '@/validations/validations'
import { UseFormRegister } from 'react-hook-form'
import { MdEmail, MdLock } from 'react-icons/md'

type InputProps = {
    register: UseFormRegister<UserLogin | UserSignup>
    label: 'email' | 'password' | 'name'
    type: string
    placeholder: string
    error?: string
}

export default function Input({
    register,
    label,
    type,
    placeholder,
    error,
}: InputProps) {
    return (
        <div className='inline-block relative w-full'>
            {label === 'email' ? (
                <MdEmail className='absolute top-1/4 left-3 text-lighter-gray' />
            ) : (
                <MdLock className='absolute top-1/4 left-3 text-lighter-gray' />
            )}

            <input
                {...register(label)}
                type={type}
                placeholder={placeholder}
                className={`border rounded-lg w-full p-2 pl-10 mb-3 bg-search-bar text-light-gray outline-none ${
                    error ? 'border-red-500' : 'border-medium-gray'
                }`}
            />
        </div>
    )
}
