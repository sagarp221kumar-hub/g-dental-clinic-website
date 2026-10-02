import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Appointment } from "@/backend";
import { useAppointments, useSubmitAppointment } from "@/hooks/useQueries";

const listAppointments = vi.fn<() => Promise<Appointment[]>>();
const submitAppointment =
  vi.fn<
    (
      name: string,
      phone: string,
      preferredDate: string,
      preferredTime: string,
      message: string,
    ) => Promise<Appointment>
  >();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: { listAppointments, submitAppointment },
    isFetching: false,
  }),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

beforeEach(() => {
  listAppointments.mockReset();
  submitAppointment.mockReset();
});

describe("appointment data hooks", () => {
  it("reads appointments from the actor", async () => {
    const rows: Appointment[] = [
      {
        id: 1n,
        name: "Ananya",
        phone: "9418018910",
        preferredDate: "2026-11-05",
        preferredTime: "10:30",
        message: "",
        createdAt: 0n,
      },
    ];
    listAppointments.mockResolvedValue(rows);

    const { result } = renderHook(() => useAppointments(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(rows);
    expect(listAppointments).toHaveBeenCalledTimes(1);
  });

  it("forwards the form fields to submitAppointment in order", async () => {
    const created: Appointment = {
      id: 7n,
      name: "Rahul",
      phone: "9418018910",
      preferredDate: "2026-11-06",
      preferredTime: "16:00",
      message: "Braces consult",
      createdAt: 0n,
    };
    submitAppointment.mockResolvedValue(created);

    const { result } = renderHook(() => useSubmitAppointment(), { wrapper });

    result.current.mutate({
      name: "Rahul",
      phone: "9418018910",
      preferredDate: "2026-11-06",
      preferredTime: "16:00",
      message: "Braces consult",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(submitAppointment).toHaveBeenCalledWith(
      "Rahul",
      "9418018910",
      "2026-11-06",
      "16:00",
      "Braces consult",
    );
  });
});
