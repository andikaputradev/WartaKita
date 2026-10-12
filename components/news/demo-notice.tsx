import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DemoNotice({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 border border-dashed border-primary/30 bg-secondary px-3 py-2 text-xs leading-relaxed text-muted-foreground',
        className,
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
      <span>
        {children ?? (
          <>
            <strong className="font-semibold text-foreground">Konten demo.</strong> Seluruh berita, nama, dan angka di
            situs ini fiktif dan dibuat untuk keperluan prototipe.
          </>
        )}
      </span>
    </p>
  )
}
