
"use client"

import { useNavigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useNae } from "react-router-dom"

export default function Dashboard({ currentUser, currentWorkspace, onLogout }) {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "🟢 Online"
      case "away":
        return "🟡 Away"
      case "busy":
        return "🔴 Busy"
      case "offline":
        return "⚫ Offline"
      default:
        return "⚫ Offline"
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }
  const handlellogout = () => {
    onLogout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">{currentWorkspace?.name || "Workspace"}</h1>
            </div>
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(currentUser.status)}`}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{getStatusText(currentUser.status)}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {currentUser?.name}!</h2>
          <p className="text-gray-600">Manage your workspace and collaborate with your team</p>
        </div>

        {/* Workspace Info */}
        {currentWorkspace && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">⚙️ Workspace Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold">{currentWorkspace.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{currentWorkspace.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg">{currentWorkspace.phonenumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/users")}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">👥 Team Members</h3>
            <p className="text-gray-600 mb-4">View and manage workspace members</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-blue-600">View Team</p>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Manage Users
              </button>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/channels")}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"># Channels</h3>
            <p className="text-gray-600 mb-4">Create and manage communication channels</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-purple-600">Manage Channels</p>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                View Channels
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Summary */}
        {currentUser && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(currentUser.status)}`}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{currentUser.name}</h4>
                <p className="text-gray-600">{currentUser.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-sm rounded-full">
                    {getStatusText(currentUser.status)}
                  </span>
                  <span className="text-sm text-gray-500">📞 {currentUser.phonenumber}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">📍 {currentUser.address}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
