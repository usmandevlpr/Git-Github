"use client"

import { useNavigate } from "react-router-dom"

export default function WorkspaceUsers({ users, profiles, currentWorkspace }) {
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

  const getUserProfile = (userId) => {
    return profiles.find((profile) => profile.user_id === userId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Workspace Members</h1>
        </div>

        {currentWorkspace && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">👥 {currentWorkspace.name}</h2>
            <p className="text-gray-600">
              {users.length} member{users.length !== 1 ? "s" : ""} in this workspace
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => {
            const profile = getUserProfile(user.id)
            return (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {getStatusText(user.status)}
                    </span>
                  </div>
                </div>

                {profile && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-600 line-clamp-2">{profile.bio}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Age: {profile.age}</span>
                      <div className="flex items-center gap-1">
                        📍 <span className="truncate">{profile.location}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">📞 {user.phonenumber}</p>
                </div>
              </div>
            )
          })}
        </div>

        {users.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">No members yet</h3>
            <p className="text-gray-600">Invite team members to join your workspace</p>
          </div>
        )}
      </div>
    </div>
  )
}
