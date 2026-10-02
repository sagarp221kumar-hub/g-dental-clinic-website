export const CLINIC = {
  name: "G Dental Clinic",
  tagline: "Giving Beautiful Smile",
  phoneDisplay: "094180 18910",
  phoneHref: "tel:+919418018910",
  whatsappNumber: "919418018910",
  email: "hello@gdentalclinic.in",
  address: "Hotel Park Inn, Sector 2, Parwanoo, Himachal Pradesh 173220",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Hotel+Park+Inn+Sector+2+Parwanoo+Himachal+Pradesh+173220",
} as const;

export const WHATSAPP_MESSAGE =
  "Hi G Dental Clinic, I'd like to book an appointment.";

export const WHATSAPP_HREF = `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    title: "Teeth Cleaning",
    description:
      "Gentle scaling and polishing that removes plaque and keeps gums healthy.",
    icon: "sparkles",
  },
  {
    title: "Fillings",
    description:
      "Tooth-coloured composite fillings that restore decayed teeth naturally.",
    icon: "shield",
  },
  {
    title: "Root Canals",
    description:
      "Comfortable, single-visit root canal therapy that saves your natural tooth.",
    icon: "activity",
  },
  {
    title: "Extraction",
    description:
      "Safe, painless extractions with careful aftercare guidance for quick healing.",
    icon: "scissors",
  },
  {
    title: "Braces",
    description:
      "Metal and clear aligner options to straighten teeth at any age.",
    icon: "align",
  },
  {
    title: "Dentures",
    description:
      "Custom partial and complete dentures for a confident, natural smile.",
    icon: "smile",
  },
] as const;

export const REVIEWS = [
  {
    name: "Ananya Sharma",
    treatment: "Root Canal",
    rating: 5,
    quote:
      "I was terrified of root canals, but the team made it completely painless. The clinic is spotless and calm.",
  },
  {
    name: "Rahul Mehta",
    treatment: "Teeth Cleaning",
    rating: 5,
    quote:
      "Best dental experience I've had. They explained every step and my teeth have never felt cleaner.",
  },
  {
    name: "Priya Nair",
    treatment: "Braces",
    rating: 5,
    quote:
      "My daughter's braces journey has been smooth from day one. Friendly staff and very reasonable pricing.",
  },
  {
    name: "Vikram Singh",
    treatment: "Dental Filling",
    rating: 5,
    quote:
      "Walked in with a chipped tooth and walked out smiling. Quick, gentle, and genuinely caring.",
  },
] as const;

export const CLINIC_HOURS = [
  { day: "Morning", hours: "10:00 am – 1:00 pm" },
  { day: "Evening", hours: "4:00 pm onwards" },
] as const;

export const TRUST_HIGHLIGHTS = [
  { label: "Years of care", value: "12+" },
  { label: "Happy patients", value: "8,000+" },
  { label: "Average rating", value: "4.9" },
] as const;
