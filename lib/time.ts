export function formatAbsoluteDateWIB(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date) + ' WIB'
  } catch {
    return dateString
  }
}

export function formatSimpleDateWIB(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}

export function formatRelativeTime(dateString: string, baseDate: Date = new Date()): string {
  try {
    const target = new Date(dateString).getTime()
    const now = baseDate.getTime()
    const diffSec = Math.round((target - now) / 1000)
    const absDiffSec = Math.abs(diffSec)

    const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' })

    if (absDiffSec < 60) {
      return 'baru saja'
    }

    const diffMin = Math.round(diffSec / 60)
    if (Math.abs(diffMin) < 60) {
      return rtf.format(diffMin, 'minute')
    }

    const diffHours = Math.round(diffMin / 60)
    if (Math.abs(diffHours) < 24) {
      return rtf.format(diffHours, 'hour')
    }

    const diffDays = Math.round(diffHours / 24)
    if (Math.abs(diffDays) < 7) {
      return rtf.format(diffDays, 'day')
    }

    return formatSimpleDateWIB(dateString)
  } catch {
    return dateString
  }
}
