import { REVIEWS } from "@/lib/clinic";
import { Star } from "lucide-react";

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => `review-star-${i}`).map((id, i) => (
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

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      data-ocid="reviews.section"
      className="scroll-mt-20 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Patient Reviews
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Loved by our patients
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-soft">
            <Stars count={5} />
            <span className="text-sm font-semibold text-foreground">
              4.9 out of 5
            </span>
            <span className="text-sm text-muted-foreground">· 150 reviews</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <figure
              key={review.name}
              data-ocid={`reviews.item.${index + 1}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Stars count={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.treatment}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
