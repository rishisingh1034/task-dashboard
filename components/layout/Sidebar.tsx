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
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
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

export default function Sidebar({
  activeItem,
  onItemClick,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const SidebarItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const content = (
      <button
        onClick={() => onItemClick(item.id)}
        className={cn(
          'w-full flex items-center rounded-xl text-left transition-all duration-300 group relative overflow-hidden border-none',
          'hover-lift glass-button',
          isCollapsed ? 'justify-center px-3 py-3' : 'space-x-3 px-3 py-3',
          isActive
            ? 'bg-navy-800 text-white shadow-lg'
            : 'text-black dark:text-white/80 hover:text-black dark:hover:text-white'
        )}
      >
        <div className={cn(
          'flex-shrink-0 p-2 rounded-lg transition-all duration-300',
          isActive
            ? 'bg-white/20 shadow-lg'
            : 'bg-white/5 group-hover:bg-white/10',
          isCollapsed && 'mx-auto'
        )}>
          <item.icon className={cn(
            'w-5 h-5 transition-colors duration-300',
            isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-300'
          )} />
        </div>
        {!isCollapsed && (
          <span className="text-sm font-medium truncate animate-fade-in">
            {item.label}
          </span>
        )}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl" />
        )}
      </button>
    )

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="glass-dropdown">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }

  return (
    <div className={cn(
      'glass-sidebar flex flex-col h-full transition-all duration-500 ease-in-out animate-slide-in-left relative',
      isCollapsed ? 'w-20' : 'w-48'
    )}>
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div className={cn(
            'flex items-center space-x-3 transition-all duration-300',
            isCollapsed && 'justify-center'
          )}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-glow border border-white/20">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  DEXKOR
                </h1>
                <p className="text-xs text-gray-400 dark:text-gray-500">CRM System</p>
              </div>
            )}
          </div>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={cn(
                'p-2 rounded-lg glass-button hover-lift transition-all duration-300',
                'text-gray-400 dark:text-gray-300 hover:text-indigo-400',
                isCollapsed && 'mt-2'
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'animate-fade-in-up',
              `animate-delay-${Math.min(index * 100, 500)}`
            )}
          >
            <SidebarItem
              item={item}
              isActive={activeItem === item.id}
            />
          </div>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-white/20 dark:border-white/10 space-y-2">
        {bottomItems.map((item) => {
          const isActive = activeItem === item.id
          const isExpanded = expandedItems.includes(item.id)

          return (
            <div key={item.id} className="animate-fade-in-up animate-delay-500">
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleExpanded(item.id)
                  } else {
                    onItemClick(item.id)
                  }
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-300 group',
                  'hover-lift glass-button',
                  isActive
                    ? 'bg-navy-800 text-white'
                    : 'text-gray-300 dark:text-white/80 hover:text-white dark:hover:text-white'
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'flex-shrink-0 p-2 rounded-lg transition-all duration-300',
                    isActive
                      ? 'bg-white/20 shadow-lg'
                      : 'bg-white/5 group-hover:bg-white/10'
                  )}>
                    <item.icon className={cn(
                      'w-5 h-5 transition-colors duration-300',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-300'
                    )} />
                  </div>
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </div>
                {item.hasDropdown && !isCollapsed && (
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-all duration-300',
                      isExpanded && 'rotate-180',
                      isActive ? 'text-white' : 'text-gray-400'
                    )}
                  />
                )}
              </button>
              {item.hasDropdown && isExpanded && !isCollapsed && (
                <div className="ml-8 mt-2 space-y-1 animate-fade-in-down">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-400 dark:text-gray-400 hover:text-indigo-300 dark:hover:text-indigo-300 rounded-lg hover:bg-white/10 transition-all duration-200">
                    Filter's Week
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
