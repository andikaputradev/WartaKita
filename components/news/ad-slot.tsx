import { isAdsEnabled } from '@/lib/site'

interface AdSlotProps {
  className?: string
  width?: number
  height?: number
  label?: string
}

export function AdSlot({
  className = '',
  width = 300,
  height = 250,
  label = 'Ruang Iklan',
}: AdSlotProps) {
  if (!isAdsEnabled) {
    return null
  }

  return (
    <aside
      aria-label={label}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`mx-auto flex flex-col items-center justify-center border border-dashed border-border bg-muted/30 text-center ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="mt-1 text-xs text-muted-foreground">
        {width} x {height}
      </span>
    </aside>
  )
}
