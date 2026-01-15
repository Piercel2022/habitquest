import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
// ... other imports

export default function Router() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />

      {/* Protected routes */}
      <Route
        path="/onboarding"
        element={
          <SignedIn>
            <Onboarding />
          </SignedIn>
        }
      />
      
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />

      {/* Redirect to home if not signed in */}
      <Route
        path="*"
        element={
          <SignedOut>
            <Navigate to="/" replace />
          </SignedOut>
        }
      />
    </Routes>
  )
}