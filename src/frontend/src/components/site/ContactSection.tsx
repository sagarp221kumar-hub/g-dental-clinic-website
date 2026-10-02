import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitAppointment } from "@/hooks/useQueries";
import { CLINIC, WHATSAPP_HREF } from "@/lib/clinic";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitAppointment();

  const update = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = { ...form };
    setForm(EMPTY_FORM);
    setSubmitted(false);
    mutation.mutate(draft, {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        setForm((current) =>
          current.name === "" && current.phone === "" ? draft : current,
        );
      },
    });
  };

  const canSubmit =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.preferredDate.trim() !== "" &&
    form.preferredTime.trim() !== "";

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="scroll-mt-20 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Book an appointment
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Send us a request and our team will confirm your slot shortly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            data-ocid="contact.form"
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="appointment-name">Full name</Label>
                <Input
                  id="appointment-name"
                  data-ocid="contact.name_input"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-phone">Phone number</Label>
                <Input
                  id="appointment-phone"
                  data-ocid="contact.phone_input"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="Your phone number"
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Preferred date</Label>
                <Input
                  id="appointment-date"
                  data-ocid="contact.date_input"
                  type="date"
                  value={form.preferredDate}
                  onChange={(event) =>
                    update("preferredDate", event.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-time">Preferred time</Label>
                <Input
                  id="appointment-time"
                  data-ocid="contact.time_input"
                  type="time"
                  value={form.preferredTime}
                  onChange={(event) =>
                    update("preferredTime", event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="appointment-message">Message (optional)</Label>
              <Textarea
                id="appointment-message"
                data-ocid="contact.message_textarea"
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder="Tell us briefly what you need help with"
                rows={4}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                type="submit"
                size="lg"
                data-ocid="contact.submit_button"
                disabled={mutation.isPending || !canSubmit}
                className="rounded-full px-7 shadow-soft"
              >
                {mutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {mutation.isPending ? "Sending…" : "Request Appointment"}
              </Button>
              <p className="text-xs text-muted-foreground">
                We'll confirm by phone or WhatsApp.
              </p>
            </div>

            {submitted ? (
              <output
                data-ocid="contact.success_state"
                className="mt-5 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-foreground"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                <p>
                  Thank you! Your appointment request has been received. Our
                  team will reach out shortly to confirm.
                </p>
              </output>
            ) : null}

            {mutation.isError ? (
              <div
                data-ocid="contact.error_state"
                role="alert"
                className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"
              >
                Something went wrong while sending your request. Please try
                again or call us directly.
              </div>
            ) : null}
          </form>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Contact details
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a
                    href={CLINIC.phoneHref}
                    data-ocid="contact.phone_link"
                    className="text-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    {CLINIC.address}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a
                    href={`mailto:${CLINIC.email}`}
                    data-ocid="contact.email_link"
                    className="text-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CLINIC.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-gradient-primary p-6 text-primary-foreground shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-semibold">
                Prefer WhatsApp?
              </h3>
              <p className="mt-2 text-sm leading-relaxed opacity-90">
                Message us directly and we'll confirm your appointment right
                away.
              </p>
              <Button
                asChild
                size="lg"
                data-ocid="contact.whatsapp_button"
                className="mt-5 rounded-full bg-card px-7 text-primary hover:bg-card/90"
              >
                <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
