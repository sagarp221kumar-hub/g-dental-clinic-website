import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/appointments";

module {
  public func submitAppointment(
    appointments : Map.Map<Types.AppointmentId, Types.Appointment>,
    state : { var nextAppointmentId : Nat },
    name : Text,
    phone : Text,
    preferredDate : Text,
    preferredTime : Text,
    message : Text,
  ) : Types.Appointment {
    let id = state.nextAppointmentId;
    state.nextAppointmentId := id + 1;
    let appointment : Types.Appointment = {
      id;
      name;
      phone;
      preferredDate;
      preferredTime;
      message;
      createdAt = Time.now().toNat();
    };
    appointments.add(id, appointment);
    appointment;
  };

  public func listAppointments(
    appointments : Map.Map<Types.AppointmentId, Types.Appointment>
  ) : [Types.Appointment] {
    appointments.values().toArray();
  };
};
