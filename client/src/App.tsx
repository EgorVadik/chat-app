import Home from '@/pages/Home'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '@/components/RequireAuth'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import AuthNotRequired from './components/AuthNotRequired'
import ChannelPage from './pages/ChannelPage'

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                }
            />
            <Route
                path='/channel/:channelId'
                element={
                    <RequireAuth>
                        <ChannelPage />
                    </RequireAuth>
                }
            />
            <Route
                path='/login'
                element={
                    <AuthNotRequired>
                        <LoginPage />
                    </AuthNotRequired>
                }
            />
            <Route
                path='/register'
                element={
                    <AuthNotRequired>
                        <RegisterPage />
                    </AuthNotRequired>
                }
            />
        </Routes>
    )
}

export default App
