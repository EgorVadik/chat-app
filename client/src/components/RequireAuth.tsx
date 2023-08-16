import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({
    children,
}: {
    children: React.ReactNode
}) {
    // const auth = useAuth();
    const location = useLocation()
    const auth = { user: null }

    if (!auth.user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children
}
