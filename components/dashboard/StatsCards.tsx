'use client'

import { Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react'
import { DashboardStats } from '@/types'
import { cn } from '@/lib/utils'

interface StatsCardsProps {
  stats: DashboardStats
}

const statCards = [
  {
    id: 'pending',
    title: 'Pending Tasks',
    icon: Clock,
    gradient: 'from-blue-500 to-blue-600',
    shadowColor: 'shadow-blue-500/25',
    hoverGlow: 'hover:shadow-blue-500/40'
  },
  {
    id: 'overdue',
    title: 'Overdue Tasks',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-red-600',
    shadowColor: 'shadow-red-500/25',
    hoverGlow: 'hover:shadow-red-500/40'
  },
  {
    id: 'dueToday',
    title: 'Due For Today',
    icon: Calendar,
    gradient: 'from-orange-500 to-orange-600',
    shadowColor: 'shadow-orange-500/25',
    hoverGlow: 'hover:shadow-orange-500/40'
  },
  {
    id: 'approachingBreach',
    title: 'Approaching Breach Tasks',
    icon: TrendingUp,
    gradient: 'from-green-500 to-green-600',
    shadowColor: 'shadow-green-500/25',
    hoverGlow: 'hover:shadow-green-500/40'
  }
]

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon
        const value = stats[card.id as keyof DashboardStats]

        return (
          <div
            key={card.id}
            className={cn(
              'glass-card rounded-2xl p-6 hover-lift cursor-pointer group transition-all duration-500',
              'animate-fade-in-up',
              `animate-delay-${index * 100}`,
              card.shadowColor,
              card.hoverGlow
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                  {value}
                </p>
                <div className="w-12 h-1 bg-gradient-to-r rounded-full transition-all duration-300 group-hover:w-16">
                  <div className={cn('h-full rounded-full bg-gradient-to-r', card.gradient)} />
                </div>
              </div>
              <div className={cn(
                'p-4 rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300',
                'group-hover:scale-110 group-hover:rotate-6',
                card.gradient
              )}>
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )
      })}
    </div>
  )
}
