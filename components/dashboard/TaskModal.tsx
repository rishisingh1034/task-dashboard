'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react'
import { X, Calendar, User, Clock, AlertCircle, Maximize2, Minimize2 } from 'lucide-react'
import { Task } from '@/types'
import clsx from 'clsx'

interface TaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

const statusColors = {
  'Pending': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Overdue': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Cancelled': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const priorityColors = {
  'Low': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
}

export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!task) return null

  const tabs = [
    { name: 'Description', count: null },
    { name: 'Notes', count: task.notes?.length || 0 },
    { name: 'Events', count: task.events?.length || 0 },
    { name: 'Tickets', count: task.tickets?.length || 0 },
  ]

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={clsx(
                'w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all',
                isExpanded ? 'max-w-6xl' : 'max-w-4xl'
              )}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                    <div>
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                        {task.taskId}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Task name: {task.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {isExpanded ? (
                        <Minimize2 className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Task Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Owner</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {task.owner}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Priority</p>
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      priorityColors[task.priority]
                    )}>
                      {task.priority}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      statusColors[task.status]
                    )}>
                      {task.status}
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-800 dark:hover:text-gray-200'
                          )
                        }
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>{tab.name}</span>
                          {tab.count !== null && (
                            <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              {tab.count}
                            </span>
                          )}
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {/* Description Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-900 p-3">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {task.description}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Customer Details</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Customer Name:</span>
                              <span className="ml-2 text-gray-900 dark:text-white">{task.customerName}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Customer Code:</span>
                              <span className="ml-2 text-gray-900 dark:text-white">{task.customerCode}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* Notes Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-900 p-3">
                      <div className="space-y-4">
                        {task.notes && task.notes.length > 0 ? (
                          task.notes.map((note) => (
                            <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {note.author}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(note.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {note.content}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                            No notes available
                          </p>
                        )}
                      </div>
                    </Tab.Panel>

                    {/* Events Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-900 p-3">
                      <div className="space-y-4">
                        {task.events && task.events.length > 0 ? (
                          task.events.map((event) => (
                            <div key={event.id} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {event.title}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                            No events available
                          </p>
                        )}
                      </div>
                    </Tab.Panel>

                    {/* Tickets Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-900 p-3">
                      <div className="space-y-4">
                        {task.tickets && task.tickets.length > 0 ? (
                          task.tickets.map((ticket) => (
                            <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {ticket.title}
                                </h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {ticket.id}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{ticket.status}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{ticket.priority}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Assignee:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{ticket.assignee}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                            No tickets available
                          </p>
                        )}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
