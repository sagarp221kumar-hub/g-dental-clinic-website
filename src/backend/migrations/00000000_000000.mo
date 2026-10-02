import AccessControl "mo:caffeineai-authorization/access-control";
import Map "mo:core/Map";

module {
  type Appointment = {
    id : Nat;
    name : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Nat;
  };

  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    appointments : Map.Map<Nat, Appointment>;
    state : { var nextAppointmentId : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      appointments = Map.empty();
      state = { var nextAppointmentId = 0 };
    };
  };
};
