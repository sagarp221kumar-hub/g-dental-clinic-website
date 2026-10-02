import { SERVICES } from "@/lib/clinic";
import {
  Activity,
  AlignHorizontalDistributeCenter,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  activity: Activity,
  scissors: Scissors,
  align: AlignHorizontalDistributeCenter,
  smile: Smile,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="scroll-mt-20 border-y border-border bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Complete care for every smile
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A full range of treatments delivered with the same gentle, attentive
            approach.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Sparkles;
            return (
              <article
                key={service.title}
                data-ocid={`services.item.${index + 1}`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
