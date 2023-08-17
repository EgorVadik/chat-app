import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Loading from './components/Loading.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <React.Suspense fallback={<Loading />}>
                <App />
                <Toaster />
            </React.Suspense>
        </BrowserRouter>
    </React.StrictMode>
)
