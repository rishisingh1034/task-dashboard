'use client'

import { useState } from 'react'
import { 
  CheckSquare, 
  Inbox, 
  BarChart3, 
  CreditCard, 
  FileText, 
  Users, 
  Heart, 
  UserCheck, 
  Ticket,
  Eye,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import clsx from 'clsx'

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

const menuItems = [
  { id: 'my-task', label: 'My Task', icon: CheckSquare, active: true },
  { id: 'my-inbox', label: 'My Inbox', icon: Inbox },
  { id: 'insight360', label: 'Insight360', icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'contract', label: 'Contract', icon: FileText },
  { id: 'opportunity', label: 'Opportunity', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'nps', label: 'NPS', icon: UserCheck },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
]

const bottomItems = [
  { id: 'views', label: 'Views', icon: Eye, hasDropdown: true },
  { id: 'help', label: 'Help', icon: HelpCircle },
]

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">DEXKOR</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={clsx(
              'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
              activeItem === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
        {bottomItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.hasDropdown) {
                  toggleExpanded(item.id)
                } else {
                  onItemClick(item.id)
                }
              }}
              className={clsx(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors',
                activeItem === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasDropdown && (
                <ChevronDown 
                  className={clsx(
                    'w-4 h-4 transition-transform',
                    expandedItems.includes(item.id) && 'rotate-180'
                  )} 
                />
              )}
            </button>
            {item.hasDropdown && expandedItems.includes(item.id) && (
              <div className="ml-8 mt-1 space-y-1">
                <button className="w-full text-left px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Filter's Week
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
