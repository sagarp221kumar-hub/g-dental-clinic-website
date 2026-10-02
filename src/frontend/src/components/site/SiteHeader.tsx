import { Button } from "@/components/ui/button";
import { NAV_LINKS, WHATSAPP_HREF } from "@/lib/clinic";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function ToothMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5.5c-1.6-1.4-3.4-2-5-1.4C4.6 4.9 3.6 7.4 4.2 10c.5 2.2 1.3 3.6 1.7 5.6.3 1.5.4 3.4 1.6 3.4 1.3 0 1.4-2.2 1.9-3.7.3-1 .9-1.6 2.6-1.6s2.3.6 2.6 1.6c.5 1.5.6 3.7 1.9 3.7 1.2 0 1.3-1.9 1.6-3.4.4-2 1.2-3.4 1.7-5.6.6-2.6-.4-5.1-2.8-5.9-1.6-.6-3.4 0-5 1.4Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ocid="site.header"
      className={`sticky top-0 z-50 border-b transition-smooth ${
        scrolled
          ? "border-border bg-card/90 shadow-header backdrop-blur"
          : "border-transparent bg-background/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          data-ocid="site.logo_link"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
            <ToothMark className="size-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            G Dental Clinic
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`site.nav.${link.label.toLowerCase()}_link`}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            data-ocid="site.book_now_button"
            className="hidden rounded-full px-5 shadow-soft sm:inline-flex"
          >
            <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Book Now
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-ocid="site.menu_toggle"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          data-ocid="site.mobile_menu"
          className="border-t border-border bg-card md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`site.mobile_nav.${link.label.toLowerCase()}_link`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-smooth hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              data-ocid="site.mobile_book_now_button"
              className="mt-2 rounded-full"
            >
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Book Now on WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
