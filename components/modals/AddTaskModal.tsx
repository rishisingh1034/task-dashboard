'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Plus, Calendar, User, Tag, AlertCircle } from 'lucide-react'
import { Task } from '@/types'
import { cn } from '@/lib/utils'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, 'id' | 'createdDate' | 'notes' | 'events' | 'tickets'>) => void
}

const priorityOptions: Task['priority'][] = ['Low', 'Medium', 'High', 'Critical']
const statusOptions: Task['status'][] = ['Pending', 'In Progress']
const typeOptions = ['Audit', 'Support', 'General', 'Testing', 'QA', 'Health Impact', 'Maintenance']
const ownerOptions = ['Rishi', 'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Health Team', 'Analytics Team', 'Operations Team', 'QA Team']

export default function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerCode: '',
    taskId: '',
    title: '',
    description: '',
    priority: 'Medium' as Task['priority'],
    status: 'Pending' as Task['status'],
    type: 'General',
    owner: 'Rishi',
    dueDate: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    if (!formData.customerCode.trim()) {
      newErrors.customerCode = 'Customer code is required'
    }
    if (!formData.taskId.trim()) {
      newErrors.taskId = 'Task ID is required'
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onAddTask(formData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      customerName: '',
      customerCode: '',
      taskId: '',
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      type: 'General',
      owner: 'Rishi',
      dueDate: ''
    })
    setErrors({})
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl glass-modal p-8 text-left align-middle shadow-2xl transition-all border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Add New Task
                      </Dialog.Title>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Create a new task and assign it to a team member
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2.5 glass-button rounded-xl hover-lift transition-all duration-300 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Customer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className={cn(
                          'w-full px-4 py-3 glass-button rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300',
                          errors.customerName ? 'ring-2 ring-red-500/50' : ''
                        )}
                        placeholder="Enter customer name"
                      />
                      {errors.customerName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Customer Code *
                      </label>
                      <input
                        type="text"
                        value={formData.customerCode}
                        onChange={(e) => handleInputChange('customerCode', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.customerCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        placeholder="Enter customer code"
                      />
                      {errors.customerCode && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Task Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Task ID *
                      </label>
                      <input
                        type="text"
                        value={formData.taskId}
                        onChange={(e) => handleInputChange('taskId', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.taskId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        placeholder="TS-XXXX"
                      />
                      {errors.taskId && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.taskId}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Due Date *
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                      />
                      {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      placeholder="Enter task title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      placeholder="Enter task description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                    )}
                  </div>

                  {/* Task Properties */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {priorityOptions.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Tag className="w-4 h-4 inline mr-1" />
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {typeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Owner
                      </label>
                      <select
                        value={formData.owner}
                        onChange={(e) => handleInputChange('owner', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {ownerOptions.map((owner) => (
                          <option key={owner} value={owner}>
                            {owner}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
