import Auth from '@/components/Auth'

export default function LoginPage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center md:p-24 p-5 bg-primary'>
            <Auth isLogin />
        </main>
    )
}
