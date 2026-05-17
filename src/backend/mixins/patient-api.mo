import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import PatientLib "../lib/patient";
import PatientTypes "../types/patient";

mixin (
  accessControlState : AccessControl.AccessControlState,
  patientState : PatientLib.State,
) {
  public shared ({ caller }) func registerPatient(input : PatientTypes.RegisterPatientInput) : async PatientTypes.PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    PatientLib.registerPatient(patientState, caller, input);
  };

  public shared ({ caller }) func updatePatientProfile(input : PatientTypes.RegisterPatientInput) : async PatientTypes.PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    // Ownership verified inside PatientLib.updatePatient via principal lookup
    PatientLib.updatePatient(patientState, caller, input);
  };

  public query ({ caller }) func getMyProfile() : async ?PatientTypes.PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    PatientLib.getByPrincipal(patientState, caller);
  };

  public query func getPatientByEmergencyId(emergencyId : Text) : async ?PatientTypes.PatientProfile {
    PatientLib.getByEmergencyId(patientState, emergencyId);
  };

  public shared ({ caller }) func generateEmergencyId() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("notAuthorized");
    };
    PatientLib.generateEmergencyId(patientState, caller);
  };
};
