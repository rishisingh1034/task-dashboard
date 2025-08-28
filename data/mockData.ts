import { Task, DashboardStats } from '@/types'

export const mockTasks: Task[] = [
  {
    id: '1',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6465',
    title: 'Test task',
    status: 'Cancelled',
    priority: 'Medium',
    type: 'Audit',
    description: 'This is a test task for testing purposes',
    dueDate: '2024-07-23',
    createdDate: '2024-07-20',
    owner: 'Rishi',
    notes: [
      {
        id: '1',
        content: 'Task assigned to team',
        author: 'Rishi',
        timestamp: '2024-07-23T12:20:00Z',
        type: 'note'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Task Created',
        description: 'Task was created and assigned',
        timestamp: '2024-07-20T10:00:00Z',
        type: 'created'
      }
    ],
    tickets: []
  },
  {
    id: '2',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6468',
    title: 'Test ticket for account care',
    status: 'Completed',
    priority: 'Low',
    type: 'Support',
    description: 'Account care support ticket for customer inquiry',
    dueDate: '2024-07-25',
    createdDate: '2024-07-22',
    owner: 'John Doe',
    notes: [
      {
        id: '2',
        content: 'Customer inquiry resolved successfully',
        author: 'John Doe',
        timestamp: '2024-07-25T14:30:00Z',
        type: 'update'
      }
    ],
    events: [
      {
        id: '2',
        title: 'Task Completed',
        description: 'Customer inquiry was resolved',
        timestamp: '2024-07-25T14:30:00Z',
        type: 'completed'
      }
    ],
    tickets: [
      {
        id: 'T-001',
        title: 'Account Access Issue',
        status: 'Resolved',
        priority: 'Medium',
        assignee: 'John Doe',
        createdDate: '2024-07-22'
      }
    ]
  },
  {
    id: '3',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6474',
    title: 'Hello',
    status: 'Completed',
    priority: 'High',
    type: 'General',
    description: 'General hello task for customer engagement',
    dueDate: '2024-07-24',
    createdDate: '2024-07-21',
    owner: 'Jane Smith',
    notes: [],
    events: [],
    tickets: []
  },
  {
    id: '4',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6475',
    title: 'Shadow testing',
    status: 'Pending',
    priority: 'High',
    type: 'Testing',
    description: 'Shadow testing for system validation',
    dueDate: '2024-08-01',
    createdDate: '2024-07-26',
    owner: 'Mike Johnson',
    notes: [
      {
        id: '3',
        content: 'Testing environment setup completed',
        author: 'Mike Johnson',
        timestamp: '2024-07-26T09:15:00Z',
        type: 'note'
      }
    ],
    events: [
      {
        id: '3',
        title: 'Testing Started',
        description: 'Shadow testing phase initiated',
        timestamp: '2024-07-26T09:00:00Z',
        type: 'created'
      }
    ],
    tickets: []
  },
  {
    id: '5',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6468',
    title: 'qa test',
    status: 'Pending',
    priority: 'Critical',
    type: 'QA',
    description: 'Quality assurance testing for product release',
    dueDate: '2024-07-30',
    createdDate: '2024-07-25',
    owner: 'Sarah Wilson',
    notes: [],
    events: [],
    tickets: []
  },
  {
    id: '6',
    customerName: 'Instances',
    customerCode: 'INSTANCES',
    taskId: 'TS-6405',
    title: 'Office Health Audit - Immediate Action Required',
    status: 'Pending',
    priority: 'High',
    type: 'Health Impact',
    description: 'Urgent office health audit requiring immediate attention and action',
    dueDate: '2024-07-28',
    createdDate: '2024-07-23',
    owner: 'Health Team',
    notes: [
      {
        id: '4',
        content: 'Initial assessment completed, critical issues identified',
        author: 'Health Team',
        timestamp: '2024-07-23T16:45:00Z',
        type: 'note'
      }
    ],
    events: [
      {
        id: '4',
        title: 'Audit Initiated',
        description: 'Office health audit process started',
        timestamp: '2024-07-23T08:00:00Z',
        type: 'created'
      }
    ],
    tickets: [
      {
        id: 'T-002',
        title: 'Air Quality Concern',
        status: 'Open',
        priority: 'High',
        assignee: 'Health Team',
        createdDate: '2024-07-23'
      }
    ]
  },
  {
    id: '7',
    customerName: 'Instances',
    customerCode: 'INSTANCES',
    taskId: 'TS-6406',
    title: 'Office Metric: DM Health',
    status: 'Pending',
    priority: 'High',
    type: 'Health Impact',
    description: 'Data management health metrics analysis and reporting',
    dueDate: '2024-08-02',
    createdDate: '2024-07-24',
    owner: 'Analytics Team',
    notes: [],
    events: [],
    tickets: []
  },
  {
    id: '8',
    customerName: 'Instances',
    customerCode: 'INSTANCES',
    taskId: 'TS-6407',
    title: 'Office Metric consumption > 80%',
    status: 'Pending',
    priority: 'High',
    type: 'Health Impact',
    description: 'Office metric consumption has exceeded 80% threshold requiring immediate attention',
    dueDate: '2024-07-29',
    createdDate: '2024-07-25',
    owner: 'Operations Team',
    notes: [
      {
        id: '5',
        content: 'Consumption spike detected, investigating root cause',
        author: 'Operations Team',
        timestamp: '2024-07-25T11:30:00Z',
        type: 'note'
      }
    ],
    events: [
      {
        id: '5',
        title: 'Alert Triggered',
        description: 'Consumption threshold exceeded',
        timestamp: '2024-07-25T11:00:00Z',
        type: 'created'
      }
    ],
    tickets: []
  },
  {
    id: '9',
    customerName: 'AVF',
    customerCode: 'VBN-5264',
    taskId: 'TS-6468',
    title: 'Testing component A',
    status: 'Overdue',
    priority: 'Medium',
    type: 'Testing',
    description: 'Component A testing phase for system integration',
    dueDate: '2024-07-20',
    createdDate: '2024-07-15',
    owner: 'QA Team',
    notes: [
      {
        id: '6',
        content: 'Testing delayed due to environment issues',
        author: 'QA Team',
        timestamp: '2024-07-21T10:00:00Z',
        type: 'update'
      }
    ],
    events: [
      {
        id: '6',
        title: 'Task Overdue',
        description: 'Task has passed its due date',
        timestamp: '2024-07-21T00:00:00Z',
        type: 'updated'
      }
    ],
    tickets: []
  }
]

export const mockStats: DashboardStats = {
  pending: 60,
  overdue: 56,
  dueToday: 0,
  approachingBreach: 1
}
