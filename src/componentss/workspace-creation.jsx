"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function WorkspaceCreation({ onWorkspaceCreate, currentUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: currentUser?.email || "",
    phonenumber: currentUser?.phonenumber || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onWorkspaceCreate(formData)
    navigate("/profile/create")
  }

  const handleBackk = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <button
            onClick={handleBackk}
            className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        </div>
        <div className="p-6 text-center border-b">
          <h1 className="text-2xl font-bold">Create Workspace</h1>
          <p className="text-gray-600 mt-2">Set up your team collaboration space</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700">
                Workspace Name
              </label>
              <input
                id="workspaceName"
                type="text"
                placeholder="e.g., Acme Corp Team"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="workspaceEmail" className="block text-sm font-medium text-gray-700">
                Workspace Email
              </label>
              <input
                id="workspaceEmail"
                type="email"
                placeholder="workspace@company.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="workspacePhone" className="block text-sm font-medium text-gray-700">
                Workspace Phone
              </label>
              <input
                id="workspacePhone"
                type="tel"
                placeholder="Workspace contact number"
                value={formData.phonenumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, phonenumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              Create Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
