'use client'

import { useState } from 'react'
import { Search, Bell, Settings, User, Sun, Moon, Grid3X3, Plus } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import NotificationModal from '@/components/modals/NotificationModal'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  onSearch: (query: string) => void
  onAddTask: () => void
}

export default function Header({ title, onSearch, onAddTask }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <header className="px-6 py-4 animate-fade-in-down">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 animate-fade-in animate-delay-200">
          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 px-4 py-2.5 btn-gradient text-white rounded-xl transition-all duration-300 hover-lift shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Add Task</span>
          </button>

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2.5 glass-button rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent w-48 lg:w-64 transition-all duration-300"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 glass-button rounded-xl hover-lift transition-all duration-300 group"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
            )}
          </button>

          {/* Grid Menu */}
          <button className="p-2.5 glass-button rounded-xl hover-lift transition-all duration-300 group">
            <Grid3X3 className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2.5 glass-button rounded-xl hover-lift transition-all duration-300 group"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 glass-button rounded-xl hover-lift transition-all duration-300 group">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 glass-button px-3 py-2 rounded-xl hover-lift transition-all duration-300 group cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-glow">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Rishi Singh
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </header>
  )
}
