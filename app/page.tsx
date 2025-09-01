'use client'

import { useState, useMemo } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import StatsCards from '@/components/dashboard/StatsCards'
import EnhancedTaskFilters from '@/components/dashboard/EnhancedTaskFilters'
import TaskTable from '@/components/dashboard/TaskTable'
import EnhancedTaskModal from '@/components/dashboard/EnhancedTaskModal'
import AddTaskModal from '@/components/modals/AddTaskModal'
import { mockTasks, mockStats } from '@/data/mockData'
import { Task, FilterType, SortField, SortOrder } from '@/types'

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('my-task')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortField, setSortField] = useState<SortField>('customerName')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [advancedFilters, setAdvancedFilters] = useState<any>({})
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.customerName.toLowerCase().includes(query) ||
        task.taskId.toLowerCase().includes(query) ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.owner.toLowerCase().includes(query)
      )
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(task =>
        task.status.toLowerCase() === activeFilter.toLowerCase()
      )
    }

    if (advancedFilters.priority?.length > 0) {
      filtered = filtered.filter(task => advancedFilters.priority.includes(task.priority))
    }
    if (advancedFilters.owner?.length > 0) {
      filtered = filtered.filter(task => advancedFilters.owner.includes(task.owner))
    }
    if (advancedFilters.type?.length > 0) {
      filtered = filtered.filter(task => advancedFilters.type.includes(task.type))
    }
    if (advancedFilters.dateRange?.start) {
      filtered = filtered.filter(task => new Date(task.dueDate) >= new Date(advancedFilters.dateRange.start))
    }
    if (advancedFilters.dateRange?.end) {
      filtered = filtered.filter(task => new Date(task.dueDate) <= new Date(advancedFilters.dateRange.end))
    }

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [tasks, searchQuery, activeFilter, advancedFilters, sortField, sortOrder])

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      overdue: tasks.filter(t => t.status === 'Overdue').length,
      cancelled: tasks.filter(t => t.status === 'Cancelled').length,
    }
  }, [tasks])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleTaskSelect = (taskId: string, selected: boolean) => {
    if (selected) {
      setSelectedTasks(prev => [...prev, taskId])
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId))
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleAddTask = () => {
    setIsAddTaskModalOpen(true)
  }

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'createdDate' | 'notes' | 'events' | 'tickets'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
      notes: [],
      events: [{
        id: '1',
        title: 'Task Created',
        description: 'Task was created and assigned',
        timestamp: new Date().toISOString(),
        type: 'created'
      }],
      tickets: []
    }
    setTasks(prev => [...prev, task])
    setIsAddTaskModalOpen(false)
  }

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status } : task
    ))
  }

  const handlePriorityChange = (taskId: string, priority: Task['priority']) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, priority } : task
    ))
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const handleAdvancedFilter = (filters: any) => {
    setAdvancedFilters(filters)
  }

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case 'my-task':
        return 'AccountCare'
      case 'my-inbox':
        return 'My Inbox'
      case 'dashboard':
        return 'Dashboard'
      default:
        return 'Dashboard'
    }
  }

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block animate-slide-in-left">
        <Sidebar 
          activeItem={activeMenuItem} 
          onItemClick={setActiveMenuItem}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="glass-header">
          <Header
            title={getPageTitle()}
            onSearch={handleSearch}
            onAddTask={handleAddTask}
          />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeMenuItem === 'my-task' && (
              <>
                {/* Stats Cards */}
                <div className="animate-fade-in-up">
                  <StatsCards stats={mockStats} />
                </div>

                {/* Task Filters */}
                <div className="animate-fade-in-up animate-delay-100">
                  <EnhancedTaskFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    taskCounts={taskCounts}
                    onAdvancedFilter={handleAdvancedFilter}
                  />
                </div>

                {/* Task Table */}
                <div className="animate-fade-in-up animate-delay-200">
                  <TaskTable
                    tasks={filteredAndSortedTasks}
                    onTaskClick={handleTaskClick}
                    onTaskSelect={handleTaskSelect}
                    selectedTasks={selectedTasks}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onStatusChange={handleStatusChange}
                    onPriorityChange={handlePriorityChange}
                  />
                </div>
              </>
            )}

            {activeMenuItem === 'my-inbox' && (
              <div className="glass-card rounded-2xl p-8 flex items-center justify-center h-64 animate-fade-in">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  My Inbox - Coming Soon
                </p>
              </div>
            )}

            {activeMenuItem === 'dashboard' && (
              <div className="glass-card rounded-2xl p-8 flex items-center justify-center h-64 animate-fade-in">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Dashboard Analytics - Coming Soon
                </p>
              </div>
            )}

            {!['my-task', 'my-inbox', 'dashboard'].includes(activeMenuItem) && (
              <div className="glass-card rounded-2xl p-8 flex items-center justify-center h-64 animate-fade-in">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {activeMenuItem.charAt(0).toUpperCase() + activeMenuItem.slice(1).replace('-', ' ')} - Coming Soon
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Enhanced Task Modal */}
      <EnhancedTaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
        }}
        onUpdateTask={handleUpdateTask}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleCreateTask}
      />
    </div>
  )
}
