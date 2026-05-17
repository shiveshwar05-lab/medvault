import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import PatientLib "lib/patient";
import DoctorLib "lib/doctor";
import PatientApiMixin "mixins/patient-api";
import DoctorApiMixin "mixins/doctor-api";
import AdminApiMixin "mixins/admin-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let patientState = PatientLib.initState();
  let doctorState = DoctorLib.initState();

  // Seed sample data on first initialization
  PatientLib.seedSampleData(patientState);
  DoctorLib.seedSampleData(doctorState);

  include PatientApiMixin(accessControlState, patientState);
  include DoctorApiMixin(accessControlState, doctorState, patientState);
  include AdminApiMixin(accessControlState, doctorState, patientState);
};
