import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { CLINIC, SERVICES, WHATSAPP_HREF } from "@/lib/clinic";

const submitMutate = vi.fn();

vi.mock("@/hooks/useQueries", () => ({
  useAppointments: () => ({ data: [], isLoading: false }),
  useSubmitAppointment: () => ({
    mutate: submitMutate,
    isPending: false,
    isError: false,
  }),
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  submitMutate.mockReset();
});

describe("clinic landing page", () => {
  it("renders every section with content on the default route", () => {
    renderApp();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /giving beautiful smile/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /dentistry that feels calm and personal/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /complete care for every smile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /loved by our patients/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /hours & location/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /book an appointment/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the clinic name, rating badge, and all six services", () => {
    renderApp();

    expect(screen.getAllByText(CLINIC.name).length).toBeGreaterThan(0);
    expect(screen.getByText(/4\.9 rating · 150 reviews/i)).toBeInTheDocument();

    for (const service of SERVICES) {
      expect(
        screen.getByRole("heading", { name: service.title }),
      ).toBeInTheDocument();
    }
  });

  it("links Book Now to WhatsApp with the clinic number and a prefilled message", () => {
    renderApp();

    const bookNow = screen.getByTestId("site.book_now_button");
    expect(bookNow).toHaveAttribute("href", WHATSAPP_HREF);
    expect(bookNow.getAttribute("href")).toContain("wa.me/919418018910");
    expect(bookNow.getAttribute("href")).toContain("text=");
  });

  it("triggers a tel: link from Call Now", () => {
    renderApp();

    const callNow = screen.getByRole("link", { name: /call now/i });
    expect(callNow).toHaveAttribute("href", "tel:+919418018910");
  });

  it("renders a dental image and a map image", () => {
    renderApp();

    expect(screen.getByAltText(/dental treatment room/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/map showing the location/i),
    ).toBeInTheDocument();
  });

  it("opens and closes the mobile menu and its links navigate to sections", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const mobileMenu = screen.getByTestId("site.mobile_menu");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobileMenu).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "#about");

    await user.click(
      within(mobileMenu).getByRole("link", { name: "Services" }),
    );
    expect(screen.queryByTestId("site.mobile_menu")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("submits a valid appointment and shows the success confirmation", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByLabelText(/full name/i), "Ananya Sharma");
    await user.type(screen.getByLabelText(/phone number/i), "9418018910");
    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-05");
    await user.type(screen.getByLabelText(/preferred time/i), "10:30");
    await user.type(screen.getByLabelText(/message/i), "Cleaning please");

    const submit = screen.getByRole("button", { name: /request appointment/i });
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(submitMutate).toHaveBeenCalledTimes(1);
    const [payload, options] = submitMutate.mock.calls[0];
    expect(payload).toMatchObject({
      name: "Ananya Sharma",
      phone: "9418018910",
      preferredDate: "2026-11-05",
      preferredTime: "10:30",
      message: "Cleaning please",
    });

    options.onSuccess();
    expect(
      await screen.findByTestId("contact.success_state"),
    ).toHaveTextContent(/appointment request has been received/i);
  });

  it("keeps the submit button disabled until required fields are filled", async () => {
    const user = userEvent.setup();
    renderApp();

    const submit = screen.getByRole("button", { name: /request appointment/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/full name/i), "Ananya");
    await user.type(screen.getByLabelText(/phone number/i), "9418018910");
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/preferred date/i), "2026-11-05");
    await user.type(screen.getByLabelText(/preferred time/i), "10:30");
    expect(submit).toBeEnabled();
  });
});
