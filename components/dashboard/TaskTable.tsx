'use client'

import { useState, Fragment } from 'react'
import { MoreVertical, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { Menu, Transition } from '@headlessui/react'
import { Checkbox } from '@/components/ui/checkbox'
import { Task, SortField, SortOrder } from '@/types'
import clsx from 'clsx'

interface TaskTableProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onTaskSelect: (taskId: string, selected: boolean) => void
  selectedTasks: string[]
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
  onStatusChange: (taskId: string, status: Task['status']) => void
  onPriorityChange: (taskId: string, priority: Task['priority']) => void
}

const statusOptions: Task['status'][] = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Overdue']
const priorityOptions: Task['priority'][] = ['Low', 'Medium', 'High', 'Critical']

const statusColors = {
  'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Overdue': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
  'Cancelled': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800'
}

const priorityColors = {
  'Low': 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800',
  'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800'
}

const columns = [
  { key: 'customerName' as SortField, label: 'Customer Name', sortable: true },
  { key: 'customerCode' as SortField, label: 'Customer Code', sortable: false },
  { key: 'taskId' as SortField, label: 'Task ID', sortable: true },
  { key: 'title' as SortField, label: 'Title', sortable: true },
  { key: 'status' as SortField, label: 'Status', sortable: true },
  { key: 'priority' as SortField, label: 'Priority', sortable: true },
  { key: 'type', label: 'Type', sortable: false },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'action', label: 'Action', sortable: false }
]

// Status Dropdown Component
const StatusDropdown = ({ 
  currentStatus, 
  onStatusChange, 
  taskId 
}: { 
  currentStatus: Task['status']
  onStatusChange: (taskId: string, status: Task['status']) => void
  taskId: string 
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className={clsx(
      'inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-all border min-w-[100px] justify-center',
      statusColors[currentStatus]
    )}>
      {currentStatus}
      <ChevronDown className="w-3 h-3 ml-1" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {statusOptions.map((status) => (
            <Menu.Item key={status}>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onStatusChange(taskId, status)
                  }}
                  className={clsx(
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                  )}
                >
                  {currentStatus === status && <Check className="w-4 h-4 mr-2" />}
                  <span className={currentStatus !== status ? 'ml-6' : ''}>{status}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
)

// Priority Dropdown Component
const PriorityDropdown = ({ 
  currentPriority, 
  onPriorityChange, 
  taskId 
}: { 
  currentPriority: Task['priority']
  onPriorityChange: (taskId: string, priority: Task['priority']) => void
  taskId: string 
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className={clsx(
      'inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-all border min-w-[80px] justify-center',
      priorityColors[currentPriority]
    )}>
      {currentPriority}
      <ChevronDown className="w-3 h-3 ml-1" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute z-10 mt-2 w-24 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {priorityOptions.map((priority) => (
            <Menu.Item key={priority}>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onPriorityChange(taskId, priority)
                  }}
                  className={clsx(
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                  )}
                >
                  {currentPriority === priority && <Check className="w-4 h-4 mr-2" />}
                  <span className={currentPriority !== priority ? 'ml-6' : ''}>{priority}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
)

export default function TaskTable({
  tasks,
  onTaskClick,
  onTaskSelect,
  selectedTasks,
  sortField,
  sortOrder,
  onSort,
  onStatusChange,
  onPriorityChange
}: TaskTableProps) {
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    tasks.forEach(task => {
      onTaskSelect(task.id, newSelectAll)
    })
  }

  const handleTaskSelect = (taskId: string, selected: boolean) => {
    onTaskSelect(taskId, selected)
    if (!selected) {
      setSelectAll(false)
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => onSort(column.key as SortField)}
                      className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <span>{column.label}</span>
                      <SortIcon field={column.key as SortField} />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => {
                        handleTaskSelect(task.id, checked as boolean)
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {task.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {task.customerCode}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {task.taskId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {task.title}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <StatusDropdown
                    currentStatus={task.status}
                    onStatusChange={onStatusChange}
                    taskId={task.id}
                  />
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <PriorityDropdown
                    currentPriority={task.priority}
                    onPriorityChange={onPriorityChange}
                    taskId={task.id}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {task.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  {task.description}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
