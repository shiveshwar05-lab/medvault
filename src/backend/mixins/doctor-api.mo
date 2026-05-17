import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import DoctorLib "../lib/doctor";
import PatientLib "../lib/patient";
import DoctorTypes "../types/doctor";
import CommonTypes "../types/common";
import PatientTypes "../types/patient";

mixin (
  accessControlState : AccessControl.AccessControlState,
  doctorState : DoctorLib.State,
  patientState : PatientLib.State,
) {
  public shared ({ caller }) func submitDoctorRequest(input : DoctorTypes.SubmitDoctorRequestInput) : async DoctorTypes.DoctorProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.submitDoctorRequest(doctorState, caller, input);
  };

  public query ({ caller }) func getDoctorStatus() : async ?DoctorTypes.DoctorProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.getDoctorByPrincipal(doctorState, caller);
  };

  public query ({ caller }) func getDoctorProfile() : async ?DoctorTypes.DoctorProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.getDoctorByPrincipal(doctorState, caller);
  };

  public shared ({ caller }) func getPatientEmergencyInfo(
    emergencyId : Text,
    accessType : CommonTypes.AccessType,
  ) : async ?PatientTypes.PatientEmergencyInfo {
    // Only approved doctors may access emergency info
    if (not DoctorLib.isApprovedDoctor(doctorState, caller)) {
      Runtime.trap("notAuthorized");
    };
    let doctorId = switch (DoctorLib.getDoctorByPrincipal(doctorState, caller)) {
      case (?doc) doc.id;
      case null { Runtime.trap("Doctor record missing") };
    };
    let result = PatientLib.getEmergencyInfo(patientState, emergencyId);
    switch (result) {
      case (?info) {
        // Find patientId for logging
        let patientOpt = PatientLib.getByEmergencyId(patientState, emergencyId);
        switch (patientOpt) {
          case (?patient) {
            DoctorLib.logAccess(doctorState, doctorId, patient.id, accessType);
          };
          case null {};
        };
        ?info;
      };
      case null null;
    };
  };
};
