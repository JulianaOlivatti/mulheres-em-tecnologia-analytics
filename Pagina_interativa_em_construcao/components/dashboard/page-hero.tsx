import Image from 'next/image'

export type HeroContent = {
  title: string
  subtitle: string
  tagline: [string, string]
  image: string
  imageAlt: string
}

export function PageHero({ title, subtitle, tagline, image, imageAlt }: HeroContent) {
  return (
    <section className="relative isolate grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[1fr_minmax(0,22rem)]">
      <span
        aria-hidden="true"
        className="absolute -top-24 right-1/3 -z-10 size-72 rounded-full bg-sage/25 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-28 left-1/4 -z-10 size-64 rounded-full bg-peach/30 blur-2xl"
      />
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/70">
            People Analytics
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-[1.05] text-navy text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mt-1 font-serif text-2xl italic text-navy/80 md:text-3xl">{subtitle}</p>
        </div>
        <div className="border-l-2 border-sage pl-5">
          <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-navy">
            {tagline[0]}
            <br />
            {tagline[1]}
          </p>
          <span aria-hidden="true" className="mt-3 block h-0.5 w-12 rounded bg-peach-deep" />
        </div>
      </div>
      <div className="relative hidden min-h-56 md:block">
        <Image src={image} alt={imageAlt} fill priority sizes="22rem" className="object-cover" />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent"
        />
      </div>
    </section>
  )
}
