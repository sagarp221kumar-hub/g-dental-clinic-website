import Map "mo:core/Map";
import Types "../types/appointments";
import AppointmentsLib "../lib/appointments";

mixin (
  appointments : Map.Map<Types.AppointmentId, Types.Appointment>,
  state : { var nextAppointmentId : Nat },
) {
  public shared ({ caller }) func submitAppointment(
    name : Text,
    phone : Text,
    preferredDate : Text,
    preferredTime : Text,
    message : Text,
  ) : async Types.Appointment {
    ignore caller;
    AppointmentsLib.submitAppointment(
      appointments,
      state,
      name,
      phone,
      preferredDate,
      preferredTime,
      message,
    );
  };

  public query func listAppointments() : async [Types.Appointment] {
    AppointmentsLib.listAppointments(appointments);
  };
};
