'use client'

import { Filter, ChevronDown } from 'lucide-react'
import { FilterType } from '@/types'
import clsx from 'clsx'

interface TaskFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  taskCounts: {
    all: number
    completed: number
    pending: number
    overdue: number
    cancelled: number
  }
}

const filterOptions = [
  { id: 'all', label: 'All Tasks', count: 'all' },
  { id: 'completed', label: 'Completed Tasks', count: 'completed' },
  { id: 'pending', label: 'Pending Tasks', count: 'pending' },
  { id: 'overdue', label: 'Overdue Tasks', count: 'overdue' },
  { id: 'cancelled', label: 'Cancelled Tasks', count: 'cancelled' },
]

export default function TaskFilters({ activeFilter, onFilterChange, taskCounts }: TaskFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {filterOptions.map((option) => {
          const count = taskCounts[option.count as keyof typeof taskCounts]
          const isActive = activeFilter === option.id

          return (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id as FilterType)}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <span className={clsx(
                'px-2 py-1 rounded-full text-xs font-medium',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              )}>
                {count}
              </span>
            </button>
          )
        })}

        {/* Additional Filters */}
        <div className="flex items-center space-x-2 ml-auto">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">More Filters</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
