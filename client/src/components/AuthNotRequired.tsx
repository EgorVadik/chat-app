import { userAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { Navigate } from 'react-router-dom'

export default function AuthNotRequired({
    children,
}: {
    children: React.ReactNode
}) {
    const [user] = useAtom(userAtom)

    if (user) {
        return <Navigate to='/' replace />
    }

    return children
}
