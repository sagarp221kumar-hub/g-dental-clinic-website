import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface AppointmentInput {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export function useAppointments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: AppointmentInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitAppointment(
        input.name,
        input.phone,
        input.preferredDate,
        input.preferredTime,
        input.message,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
