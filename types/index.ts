export interface Task {
  id: string
  customerName: string
  customerCode: string
  taskId: string
  title: string
  status: 'Pending' | 'In Progress' | 'Overdue' | 'Completed' | 'Cancelled'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  type: string
  description: string
  dueDate: string
  createdDate: string
  owner: string
  notes?: Note[]
  events?: Event[]
  tickets?: Ticket[]
}

export interface Note {
  id: string
  content: string
  author: string
  timestamp: string
  type: 'note' | 'update'
}

export interface Event {
  id: string
  title: string
  description: string
  timestamp: string
  type: 'created' | 'updated' | 'completed' | 'cancelled'
}

export interface Ticket {
  id: string
  title: string
  status: string
  priority: string
  assignee: string
  createdDate: string
}

export interface DashboardStats {
  pending: number
  overdue: number
  dueToday: number
  approachingBreach: number
}

export type FilterType = 'all' | 'pending' | 'overdue' | 'completed' | 'cancelled'
export type SortField = 'customerName' | 'taskId' | 'title' | 'status' | 'priority' | 'dueDate'
export type SortOrder = 'asc' | 'desc'
