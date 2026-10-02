import { Button } from "@/components/ui/button";
import { CLINIC, WHATSAPP_HREF } from "@/lib/clinic";
import {
  CalendarCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => `hero-star-${i}`).map((id, i) => (
        <Star
          key={id}
          className={`size-4 ${
            i < count
              ? "fill-accent text-accent"
              : "fill-transparent text-border"
          }`}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      data-ocid="hero.section"
      className="relative overflow-hidden bg-gradient-hero"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Sparkles className="size-3.5" />
            Gentle Dental Care
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Giving Beautiful Smile
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {CLINIC.name} offers calm, modern dentistry with a personal touch —
            from routine cleanings to complete smile makeovers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              data-ocid="hero.book_now_button"
              className="rounded-full px-7 shadow-soft"
            >
              <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                Book Now on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-ocid="hero.call_button"
              className="rounded-full border-border bg-card/70 px-7"
            >
              <a href={CLINIC.phoneHref}>
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <Stars count={5} />
              <span className="text-sm font-medium text-foreground">
                4.9 rating · 150 reviews
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Sterilised, single-use instruments
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
            <img
              src="/assets/generated/hero-dental.dim_1024x1024.jpg"
              alt="A bright, welcoming dental treatment room at G Dental Clinic"
              className="h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
          <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft sm:flex">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
              <CalendarCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Same-day slots
              </p>
              <p className="text-xs text-muted-foreground">
                Book in under a minute
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
