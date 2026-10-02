import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Map "mo:core/Map";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import Types "types/appointments";
import AppointmentsApi "mixins/appointments-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let appointments : Map.Map<Types.AppointmentId, Types.Appointment>;
  let state : { var nextAppointmentId : Nat };

  include MixinAuthorization(accessControlState, null);
  include AppointmentsApi(appointments, state);
  include ApiDocMixin();
  include Expose({
    entities = [
      appointments
        .toEntity("appointment", "Appointment", "id")
        .sample({
          id = 0;
          name = "";
          phone = "";
          preferredDate = "";
          preferredTime = "";
          message = "";
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
