import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import DoctorLib "../lib/doctor";
import PatientLib "../lib/patient";
import DoctorTypes "../types/doctor";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  doctorState : DoctorLib.State,
  patientState : PatientLib.State,
) {
  public query ({ caller }) func getPendingDoctorRequests() : async [DoctorTypes.DoctorProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.getPendingRequests(doctorState);
  };

  public shared ({ caller }) func approveDoctorRequest(doctorId : CommonTypes.DoctorId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.approveDoctor(doctorState, caller, doctorId);
  };

  public shared ({ caller }) func rejectDoctorRequest(doctorId : CommonTypes.DoctorId, reason : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.rejectDoctor(doctorState, caller, doctorId, reason);
  };

  public shared ({ caller }) func suspendDoctor(doctorId : CommonTypes.DoctorId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.suspendDoctor(doctorState, caller, doctorId);
  };

  public query ({ caller }) func getAllDoctors() : async [DoctorTypes.DoctorProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.getAllDoctors(doctorState);
  };

  public query ({ caller }) func getAccessLogs() : async [DoctorTypes.AccessLog] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    DoctorLib.getAccessLogs(doctorState);
  };

  public query ({ caller }) func getDashboardStats() : async DoctorTypes.DashboardStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("notAuthorized");
    };
    let pendingCount = DoctorLib.getPendingRequests(doctorState).size();
    {
      totalPatients = PatientLib.count(patientState);
      totalDoctors = DoctorLib.count(doctorState);
      pendingRequests = pendingCount;
      totalAccessLogs = DoctorLib.getAccessLogs(doctorState).size();
    };
  };
};
