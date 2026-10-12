import { Logo } from './logo'
import { HeaderNav } from './header-nav'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

export function SiteHeader() {
  const today = dateFormatter.format(new Date())

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:py-5">
        <Logo />
        <div className="hidden text-right text-xs text-muted-foreground md:block">
          <p className="font-medium capitalize text-foreground">{today}</p>
          <p>Edisi Indonesia · Prototipe demo</p>
        </div>
      </div>
      <HeaderNav />
    </header>
  )
}
