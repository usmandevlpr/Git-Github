"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ChannelCreation({ channels, onChannelCreate }) {
  const navigate = useNavigate()
  const [channelName, setChannelName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (channelName.trim()) {
      onChannelCreate({ name: channelName.trim() })
      setChannelName("")
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Channels</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2"># Create New Channel</h2>
              <button
                onClick={() => setIsCreating(!isCreating)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCreating
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isCreating ? "Cancel" : "+ New Channel"}
              </button>
            </div>
            {isCreating && (
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">
                      Channel Name
                    </label>
                    <input
                      id="channelName"
                      type="text"
                      placeholder="e.g., general, random, development"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Channel names should be lowercase and can contain letters, numbers, and hyphens.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Create Channel
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Existing Channels</h2>
            </div>
            <div className="p-6">
              {channels.length > 0 ? (
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-500">#</span>
                      <span className="font-medium">{channel.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">Created by User #{channel.creator_id}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">#</div>
                  <h3 className="text-lg font-semibold mb-2">No channels yet</h3>
                  <p className="text-gray-600 mb-4">Create your first channel to start collaborating with your team</p>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    + Create First Channel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
