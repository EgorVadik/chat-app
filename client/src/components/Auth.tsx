/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useForm } from 'react-hook-form'
import Input from './Input'
import {
    UserLogin,
    UserLoginSchema,
    UserSignup,
    UserSignupSchema,
} from '@/validations/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

type Props = {
    isLogin?: boolean
}
type AuthForm = UserLogin | UserSignup

export default function Auth({ isLogin = false }: Props) {
    const AuthSchema = isLogin ? UserLoginSchema : UserSignupSchema
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthForm>({
        resolver: zodResolver(AuthSchema),
    })
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data: AuthForm) => {
        setLoading(true)
        if (isLogin) {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
                    data,
                    {
                        withCredentials: true,
                    }
                )

                toast({
                    title: res.data.message,
                })

                navigate('/')
                window.location.reload()
            } catch (error) {
                if (error instanceof AxiosError) {
                    switch (error.response?.data.message) {
                        case 'Incorrect email.':
                            toast({
                                title: 'Invalid Email',
                                description: 'Please try again',
                            })
                            break

                        case 'Incorrect password.':
                            toast({
                                title: 'Invalid Password',
                                description: 'Please try again',
                            })
                            break

                        case 'Invalid Data Formats.':
                            toast({
                                title: 'Invalid Data Formats',
                                description: 'Please try again',
                            })
                            break

                        default:
                            toast({
                                title: 'Something went wrong',
                                description: 'Please try again later',
                            })
                            break
                    }
                }
            } finally {
                setLoading(false)
            }
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
                data
            )

            toast({
                title: 'Account created',
                description: 'Please login to continue',
            })
            navigate('/login')
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400:
                        toast({
                            title: 'Email already exists',
                            description: 'Please try another email',
                        })
                        break

                    default:
                        toast({
                            title: 'Something went wrong',
                            description: 'Please try again later',
                        })
                        break
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='border border-medium-gray rounded-3xl md:p-16 p-5 max-w-md text-dark-gray space-y-5 shadow-lg'
        >
            <div className='space-y-2 text-light-gray'>
                <p className='text-lg font-bold tracking-base '>
                    {!isLogin ? 'Register' : 'Login'}
                </p>
            </div>
            <div className='space-y-3'>
                {!isLogin && (
                    <Input
                        label='name'
                        placeholder='Name'
                        register={register}
                        type='text'
                        // @ts-ignore
                        error={errors.name?.message}
                    />
                )}

                <Input
                    label='email'
                    placeholder='Email'
                    register={register}
                    type='email'
                    error={errors.email?.message}
                />

                <Input
                    label='password'
                    placeholder='Password'
                    register={register}
                    type='password'
                    error={errors.password?.message}
                />
            </div>
            <button
                className='w-full bg-blue-btn rounded-lg text-white font-bold py-2'
                disabled={loading}
            >
                {loading
                    ? 'Loading...'
                    : !isLogin
                    ? 'Start coding now'
                    : 'Login'}
            </button>

            <div className='flex gap-1 items-center justify-center text-sm tracking-[-0.49px] text-light-gray'>
                {!isLogin ? 'Already a member?' : "Don't have an account yet?"}
                <Link
                    to={!isLogin ? '/login' : '/register'}
                    className='text-blue-400'
                >
                    {!isLogin ? 'Login' : 'Register'}
                </Link>
            </div>
        </form>
    )
}
