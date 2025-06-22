"use client"
"use client"
"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
// import SignupPage from "./componentss/SignupPage"
// import LoginPage from "./componentss/LoginPage"
// import WorkspaceCreation from "./componentss/WorkspaceCreation"
// import ProfileCreation from "./componentss/ProfileCreation"
// import WorkspaceUsers from "./componentss/WorkspaceUsers"
// import ChannelCreation from "./componentss/ChannelCreation"
// import Dashboard from "./componentss/Dashboard"
import SignupPage from "./componentss/signup-page"
import LoginPage from "./componentss/login-page"
import WorkspaceCreation from "./componentss/workspace-creation"
import ProfileCreation from "./componentss/profile-creation"
import WorkspaceUsers from "./componentss/workspace-users"
import ChannelCreation from "./componentss/channel-creation"
import Dashboard from "./componentss/dashboard"
import { useNavigate } from "react-router-dom"


export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentWorkspace, setCurrentWorkspace] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [users, setUsers] = useState([])
  const [workspaces, setWorkspaces] = useState([])
  const [profiles, setProfiles] = useState([])
  const [channels, setChannels] = useState([])

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    const savedWorkspace = localStorage.getItem("currentWorkspace")
    const savedUsers = localStorage.getItem("users")
    const savedWorkspaces = localStorage.getItem("workspaces")
    const savedProfiles = localStorage.getItem("profiles")
    const savedChannels = localStorage.getItem("channels")

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedWorkspace) setCurrentWorkspace(JSON.parse(savedWorkspace))
    if (savedUsers) setUsers(JSON.parse(savedUsers))
    if (savedWorkspaces) setWorkspaces(JSON.parse(savedWorkspaces))
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles))
    if (savedChannels) setChannels(JSON.parse(savedChannels))
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }, [currentUser])
  useEffect(() => {
    if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }, [currentUser])
  useEffect(() => {
    if (currentWorkspace) localStorage.setItem("currentWorkspace", JSON.stringify(currentWorkspace))
  }, [currentWorkspace])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem("workspaces", JSON.stringify(workspaces))
  }, [workspaces])

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels))
  }, [channels])

  const handleSignup = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
    }
    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)
  }

  const handleLogin = (email, password) => {
    // Mock login - in real app, verify credentials
    const user = users.find((u) => u.email === email)
    if (user) {
      setCurrentUser(user)
      const userWorkspace = workspaces.find((w) => w.email === email)
      if (userWorkspace) {
        setCurrentWorkspace(userWorkspace)
      }
      return true
    }
    return false
  }

  const handleWorkspaceCreation = (workspaceData) => {
    const newWorkspace = {
      id: Date.now(),
      ...workspaceData,
    }
    setWorkspaces((prev) => [...prev, newWorkspace])
    setCurrentWorkspace(newWorkspace)
  }

  const handleProfileCreation = (profileData) => {
    if (!currentUser) return

    const newProfile = {
      id: Date.now(),
      user_id: currentUser.id,
      ...profileData,
    }
    setProfiles((prev) => [...prev, newProfile])
    setCurrentProfile(newProfile)
  }

  const handleChannelCreation = (channelData) => {
    if (!currentUser) return

    const newChannel = {
      id: Date.now(),
      creator_id: currentUser.id,
      ...channelData,
    }
    setChannels((prev) => [...prev, newChannel])
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentWorkspace(null)
    setCurrentProfile(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentWorkspace")
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />
  }

  // Public Route Component (redirect to dashboard if already logged in)
  const PublicRoute = ({ children }) => {
    return !currentUser ? children : <Navigate to="/dashboard" replace />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage onSignup={handleSignup} />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage onLogin={handleLogin} />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/workspace/create"
            element={
              <ProtectedRoute>
                <WorkspaceCreation onWorkspaceCreate={handleWorkspaceCreation} currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/create"
            element={
              <ProtectedRoute>
                <ProfileCreation onProfileCreate={handleProfileCreation} currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard currentUser={currentUser} currentWorkspace={currentWorkspace} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <WorkspaceUsers users={users} profiles={profiles} currentWorkspace={currentWorkspace} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/channels"
            element={
              <ProtectedRoute>
                <ChannelCreation channels={channels} onChannelCreate={handleChannelCreation} />
              </ProtectedRoute>
            }
          />

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
