import { AboutSection } from "@/components/site/AboutSection";
import { ContactSection } from "@/components/site/ContactSection";
import { HeroSection } from "@/components/site/HeroSection";
import { HoursSection } from "@/components/site/HoursSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { ServicesSection } from "@/components/site/ServicesSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <HoursSection />
      <ContactSection />
    </>
  );
}
