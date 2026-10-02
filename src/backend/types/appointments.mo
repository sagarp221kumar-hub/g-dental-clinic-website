module {
  public type AppointmentId = Nat;

  public type Appointment = {
    id : AppointmentId;
    name : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Nat;
  };
};
