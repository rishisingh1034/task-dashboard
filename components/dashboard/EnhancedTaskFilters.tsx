'use client'

import { useState, Fragment } from 'react'
import { Filter, ChevronDown, Calendar, User, Tag, X } from 'lucide-react'
import { Menu, Transition } from '@headlessui/react'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterType } from '@/types'
import clsx from 'clsx'

interface EnhancedTaskFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  taskCounts: {
    all: number
    completed: number
    pending: number
    overdue: number
    cancelled: number
  }
  onAdvancedFilter: (filters: AdvancedFilters) => void
}

interface AdvancedFilters {
  priority?: string[]
  owner?: string[]
  dateRange?: {
    start: string
    end: string
  }
  type?: string[]
}

const filterOptions = [
  { id: 'all', label: 'All Tasks', count: 'all' },
  { id: 'completed', label: 'Completed Tasks', count: 'completed' },
  { id: 'pending', label: 'Pending Tasks', count: 'pending' },
  { id: 'overdue', label: 'Overdue Tasks', count: 'overdue' },
  { id: 'cancelled', label: 'Cancelled Tasks', count: 'cancelled' },
]

const priorityOptions = ['Low', 'Medium', 'High', 'Critical']
const ownerOptions = ['Rishi', 'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Health Team', 'Analytics Team', 'Operations Team', 'QA Team']
const typeOptions = ['Audit', 'Support', 'General', 'Testing', 'QA', 'Health Impact']

export default function EnhancedTaskFilters({
  activeFilter,
  onFilterChange,
  taskCounts,
  onAdvancedFilter
}: EnhancedTaskFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({})

  const handleAdvancedFilterChange = (key: keyof AdvancedFilters, value: any) => {
    const newFilters = { ...advancedFilters, [key]: value }
    setAdvancedFilters(newFilters)
    onAdvancedFilter(newFilters)
  }

  const clearAdvancedFilters = () => {
    setAdvancedFilters({})
    onAdvancedFilter({})
  }

  const hasActiveAdvancedFilters = Object.values(advancedFilters).some(filter =>
    Array.isArray(filter) ? filter.length > 0 : filter !== undefined
  )

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      {/* Basic Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
        {filterOptions.map((option) => {
          const count = taskCounts[option.count as keyof typeof taskCounts]
          const isActive = activeFilter === option.id

          return (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id as FilterType)}
              className={clsx(
                'flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm',
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

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={clsx(
            'flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors',
            showAdvancedFilters || hasActiveAdvancedFilters
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          <Filter className="w-4 h-4" />
          {hasActiveAdvancedFilters && (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
          <ChevronDown className={clsx(
            'w-4 h-4 transition-transform',
            showAdvancedFilters && 'rotate-180'
          )} />
        </button>

        {hasActiveAdvancedFilters && (
          <button
            onClick={clearAdvancedFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <Menu as="div" className="relative">
                <Menu.Button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    {advancedFilters.priority?.length
                      ? `${advancedFilters.priority.length} selected`
                      : 'Any Priority'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4" />
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
                  <Menu.Items className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    <div className="p-2">
                      {priorityOptions.map((priority) => (
                        <Menu.Item key={priority}>
                          <label className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                            <Checkbox
                              checked={advancedFilters.priority?.includes(priority) || false}
                              onCheckedChange={(checked) => {
                                const current = advancedFilters.priority || []
                                const updated = checked
                                  ? [...current, priority]
                                  : current.filter(p => p !== priority)
                                handleAdvancedFilterChange('priority', updated)
                              }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{priority}</span>
                          </label>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Owner Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Owner
              </label>
              <Menu as="div" className="relative">
                <Menu.Button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    {advancedFilters.owner?.length
                      ? `${advancedFilters.owner.length} selected`
                      : 'Any Owner'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4" />
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
                  <Menu.Items className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    <div className="p-2">
                      {ownerOptions.map((owner) => (
                        <Menu.Item key={owner}>
                          <label className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                            <Checkbox
                              checked={advancedFilters.owner?.includes(owner) || false}
                              onCheckedChange={(checked) => {
                                const current = advancedFilters.owner || []
                                const updated = checked
                                  ? [...current, owner]
                                  : current.filter(o => o !== owner)
                                handleAdvancedFilterChange('owner', updated)
                              }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{owner}</span>
                          </label>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Type
              </label>
              <Menu as="div" className="relative">
                <Menu.Button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    {advancedFilters.type?.length
                      ? `${advancedFilters.type.length} selected`
                      : 'Any Type'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4" />
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
                  <Menu.Items className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    <div className="p-2">
                      {typeOptions.map((type) => (
                        <Menu.Item key={type}>
                          <label className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                            <Checkbox
                              checked={advancedFilters.type?.includes(type) || false}
                              onCheckedChange={(checked) => {
                                const current = advancedFilters.type || []
                                const updated = checked
                                  ? [...current, type]
                                  : current.filter(t => t !== type)
                                handleAdvancedFilterChange('type', updated)
                              }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                          </label>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Due Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={advancedFilters.dateRange?.start || ''}
                  onChange={(e) => {
                    const current = advancedFilters.dateRange || {}
                    handleAdvancedFilterChange('dateRange', { ...current, start: e.target.value })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={advancedFilters.dateRange?.end || ''}
                  onChange={(e) => {
                    const current = advancedFilters.dateRange || {}
                    handleAdvancedFilterChange('dateRange', { ...current, end: e.target.value })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
