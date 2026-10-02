import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Home } from "@/pages/Home";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Home />
      </main>
      <SiteFooter />
    </div>
  );
}
