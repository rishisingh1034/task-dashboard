'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Bell, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react'
import clsx from 'clsx'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Task Overdue',
    message: 'Task TS-6465 is now overdue and requires immediate attention.',
    type: 'error',
    timestamp: '2024-07-28T10:30:00Z',
    read: false
  },
  {
    id: '2',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: Office Health Audit.',
    type: 'info',
    timestamp: '2024-07-28T09:15:00Z',
    read: false
  },
  {
    id: '3',
    title: 'Task Completed',
    message: 'Task TS-6468 has been successfully completed.',
    type: 'success',
    timestamp: '2024-07-28T08:45:00Z',
    read: true
  },
  {
    id: '4',
    title: 'Approaching Deadline',
    message: 'Task TS-6407 is due in 2 hours.',
    type: 'warning',
    timestamp: '2024-07-28T07:30:00Z',
    read: true
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.',
    type: 'info',
    timestamp: '2024-07-27T16:00:00Z',
    read: true
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    case 'error':
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    default:
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const getNotificationBg = (type: string, read: boolean) => {
  const baseClasses = read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'
  return clsx(baseClasses, 'border-l-4', {
    'border-green-500': type === 'success',
    'border-yellow-500': type === 'warning',
    'border-red-500': type === 'error',
    'border-blue-500': type === 'info'
  })
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </Dialog.Title>
                      {unreadCount > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={clsx(
                            'p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
                            getNotificationBg(notification.type, notification.read)
                          )}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={clsx(
                                  'text-sm font-medium',
                                  notification.read 
                                    ? 'text-gray-700 dark:text-gray-300' 
                                    : 'text-gray-900 dark:text-white'
                                )}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {mockNotifications.length > 0 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Mark all as read
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        View all
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
