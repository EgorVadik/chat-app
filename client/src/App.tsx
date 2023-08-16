import Home from '@/pages/Home'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '@/components/RequireAuth'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

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
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
    )
}

export default App
