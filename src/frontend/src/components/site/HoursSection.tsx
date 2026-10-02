import { CLINIC, CLINIC_HOURS } from "@/lib/clinic";
import { Clock, MapPin, Phone } from "lucide-react";

export function HoursSection() {
  return (
    <section
      id="hours"
      data-ocid="hours.section"
      className="scroll-mt-20 border-y border-border bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Visit Us
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hours &amp; Location
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Drop by or book ahead — we're happy to help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-2.5">
              <Clock className="size-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Clinic Timings
              </h3>
            </div>
            <dl className="mt-5 divide-y divide-border">
              {CLINIC_HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <dt className="text-muted-foreground">{row.day}</dt>
                  <dd className="font-medium text-foreground">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-2.5">
                <MapPin className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Address
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {CLINIC.address}
              </p>
              <a
                href={CLINIC.phoneHref}
                data-ocid="hours.phone_link"
                className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone className="size-4 text-primary" />
                {CLINIC.phoneDisplay}
              </a>
            </div>

            <a
              href={CLINIC.mapHref}
              target="_blank"
              rel="noreferrer"
              data-ocid="hours.map_link"
              className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src="/assets/generated/clinic-map.dim_1024x640.jpg"
                alt="Map showing the location of G Dental Clinic in Sector 2, Parwanoo"
                className="h-56 w-full object-cover transition-smooth group-hover:scale-[1.02]"
                width={1024}
                height={640}
              />
              <span className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-primary">
                <MapPin className="size-4" />
                Open in Google Maps
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
