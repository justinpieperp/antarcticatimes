import React, { Suspense } from 'react'
import Navigation from './components/navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { addCopyrightInfo } from './components/methods'

const Home = React.lazy(() => import('./pages/home'))
const Posts = React.lazy(() => import('./pages/posts'))
const About = React.lazy(() => import('./pages/about'))
const Login = React.lazy(() => import('./pages/login'))

function App () {
    const ErrorFallback = ({ error, resetErrorBoundary }) => {
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div style={{ fontSize: '100px' }}>Loading...</div>}>
                <div onCopy={addCopyrightInfo}>
                    <BrowserRouter >
                        < Navigation />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="home" element={<Home />} />
                            <Route path="posts" element={<Posts />} />
                            <Route path="about" element={<About />} />
                            <Route path="login" element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
