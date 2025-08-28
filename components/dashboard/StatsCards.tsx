'use client'

import { Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react'
import { DashboardStats } from '@/types'

interface StatsCardsProps {
  stats: DashboardStats
}

const statCards = [
  {
    id: 'pending',
    title: 'Pending Tasks',
    icon: Clock,
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 'overdue',
    title: 'Overdue Tasks',
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800'
  },
  {
    id: 'dueToday',
    title: 'Due For Today',
    icon: Calendar,
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  {
    id: 'approachingBreach',
    title: 'Approaching Breach Tasks',
    icon: TrendingUp,
    color: 'green',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800'
  }
]

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((card) => {
        const Icon = card.icon
        const value = stats[card.id as keyof DashboardStats]
        
        return (
          <div
            key={card.id}
            className={`${card.bgColor} ${card.borderColor} border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
