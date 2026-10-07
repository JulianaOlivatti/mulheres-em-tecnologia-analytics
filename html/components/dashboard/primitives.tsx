import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'navy' | 'sage' | 'peach'

const toneStyles: Record<Tone, { card: string; icon: string; wave: string }> = {
  navy: {
    card: 'bg-navy-soft',
    icon: 'bg-white/70 text-navy',
    wave: 'bg-navy/10',
  },
  sage: {
    card: 'bg-sage-soft',
    icon: 'bg-white/70 text-sage-deep',
    wave: 'bg-sage/40',
  },
  peach: {
    card: 'bg-peach-soft',
    icon: 'bg-white/70 text-peach-deep',
    wave: 'bg-peach/50',
  },
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  detail?: string
  tone: Tone
}) {
  const styles = toneStyles[tone]
  return (
    <div
      className={cn(
        'relative isolate flex items-center gap-4 overflow-hidden rounded-xl p-5 shadow-sm',
        styles.card,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-10 -right-8 -z-10 size-32 rounded-full blur-sm',
          styles.wave,
        )}
      />
      <span
        className={cn(
          'flex size-14 shrink-0 items-center justify-center rounded-full',
          styles.icon,
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold tracking-tight text-navy tabular-nums">{value}</p>
        {detail ? <p className="text-sm text-navy/80">{detail}</p> : null}
      </div>
    </div>
  )
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm',
        className,
      )}
    >
      <header>
        <h3 className="font-serif text-xl text-navy">{title}</h3>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export function HighlightStat({
  label,
  value,
  tone = 'sage',
}: {
  label: string
  value: string
  tone?: Tone
}) {
  return (
    <div className={cn('rounded-lg p-4 text-center', toneStyles[tone].card)}>
      <p className="text-sm text-muted-foreground text-balance">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-navy tabular-nums">{value}</p>
    </div>
  )
}
