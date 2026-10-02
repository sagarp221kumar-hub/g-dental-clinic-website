import { CLINIC, TRUST_HIGHLIGHTS } from "@/lib/clinic";
import {
  Clock,
  HeartHandshake,
  ShieldCheck,
  Smile,
  Sparkles,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Painless Treatment",
    description: "Gentle techniques and modern anaesthesia for a calm visit.",
  },
  {
    icon: Sparkles,
    title: "Modern Equipment",
    description: "Digital imaging for precise, comfortable treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Courteous Staff",
    description: "A warm, unhurried team that explains every step.",
  },
  {
    icon: Clock,
    title: "On Time",
    description: "Appointments that respect your schedule.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="scroll-mt-20 bg-background"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About the Clinic
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dentistry that feels calm and personal
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {CLINIC.name} is a fully equipped dental clinic offering painless
            treatments in a reassuring, unhurried setting. We pair modern
            technology with a warm approach so every patient understands their
            care and feels in control.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Led by Dr. Surbhi Sewhney, our team treats families across the
            neighbourhood — from a child's first check-up to complete smile
            restorations.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/12 font-display text-lg font-semibold text-primary">
              SS
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Dr. Surbhi Sewhney
              </p>
              <p className="text-sm text-muted-foreground">
                Lead Dental Surgeon · BDS, MDS
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Over a decade of experience in painless restorative and family
                dentistry.
              </p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {TRUST_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                data-ocid={`about.stat.${item.label
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-display text-2xl font-semibold text-primary">
                  {item.value}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.title}
              data-ocid={`about.highlight.${index + 1}`}
              className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${
                index % 2 === 1 ? "sm:mt-8" : ""
              }`}
            >
              <item.icon className="size-6 text-primary" />
              <p className="mt-3 font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
