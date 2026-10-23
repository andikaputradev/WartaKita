'use client'

import { useSyncExternalStore } from 'react'
import { formatAbsoluteDateWIB, formatRelativeTime, formatSimpleDateWIB } from '@/lib/time'

interface RelativeTimeProps {
  dateString: string
  className?: string
  preferRelative?: boolean
}

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 60000)
  return () => clearInterval(timer)
}

export function RelativeTime({
  dateString,
  className = '',
  preferRelative = true,
}: RelativeTimeProps) {
  const displayText = useSyncExternalStore(
    subscribe,
    () => (preferRelative ? formatRelativeTime(dateString) : formatSimpleDateWIB(dateString)),
    () => formatSimpleDateWIB(dateString),
  )
  const absoluteFull = formatAbsoluteDateWIB(dateString)

  return (
    <time
      dateTime={dateString}
      title={absoluteFull}
      className={className}
      suppressHydrationWarning
    >
      {displayText}
    </time>
  )
}
