import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import DoctorTypes "../types/doctor";

module {
  public type State = {
    doctors : Map.Map<CommonTypes.DoctorId, DoctorTypes.DoctorProfile>;
    doctorByPrincipal : Map.Map<Principal, CommonTypes.DoctorId>;
    accessLogs : List.List<DoctorTypes.AccessLog>;
    counter : { var nextDoctorId : CommonTypes.DoctorId; var nextLogId : CommonTypes.LogId };
  };

  public func initState() : State {
    {
      doctors = Map.empty<CommonTypes.DoctorId, DoctorTypes.DoctorProfile>();
      doctorByPrincipal = Map.empty<Principal, CommonTypes.DoctorId>();
      accessLogs = List.empty<DoctorTypes.AccessLog>();
      counter = { var nextDoctorId = 0; var nextLogId = 0 };
    };
  };

  public func submitDoctorRequest(
    state : State,
    caller : Principal,
    input : DoctorTypes.SubmitDoctorRequestInput,
  ) : DoctorTypes.DoctorProfile {
    // Prevent duplicate requests
    switch (state.doctorByPrincipal.get(caller)) {
      case (?_) { Runtime.trap("Doctor request already submitted") };
      case null {};
    };
    let id = state.counter.nextDoctorId;
    state.counter.nextDoctorId += 1;
    let profile : DoctorTypes.DoctorProfile = {
      id;
      principalId = caller;
      name = input.name;
      email = input.email;
      hospitalName = input.hospitalName;
      specialty = input.specialty;
      licenseNumber = input.licenseNumber;
      contactPhone = input.contactPhone;
      status = #pending;
      requestedAt = Time.now();
      reviewedAt = null;
      reviewedBy = null;
      rejectionReason = null;
    };
    state.doctors.add(id, profile);
    state.doctorByPrincipal.add(caller, id);
    profile;
  };

  public func getDoctorByPrincipal(
    state : State,
    caller : Principal,
  ) : ?DoctorTypes.DoctorProfile {
    switch (state.doctorByPrincipal.get(caller)) {
      case (?id) state.doctors.get(id);
      case null null;
    };
  };

  public func getDoctorById(
    state : State,
    doctorId : CommonTypes.DoctorId,
  ) : ?DoctorTypes.DoctorProfile {
    state.doctors.get(doctorId);
  };

  public func isApprovedDoctor(state : State, caller : Principal) : Bool {
    switch (getDoctorByPrincipal(state, caller)) {
      case (?doc) doc.status == #approved;
      case null false;
    };
  };

  public func getPendingRequests(state : State) : [DoctorTypes.DoctorProfile] {
    state.doctors.values().filter(func(d) { d.status == #pending }).toArray();
  };

  public func getAllDoctors(state : State) : [DoctorTypes.DoctorProfile] {
    state.doctors.values().toArray();
  };

  func updateDoctorStatus(
    state : State,
    doctorId : CommonTypes.DoctorId,
    adminPrincipal : Principal,
    newStatus : CommonTypes.DoctorStatus,
    rejection : ?Text,
  ) : () {
    let existing = switch (state.doctors.get(doctorId)) {
      case (?d) d;
      case null { Runtime.trap("Doctor not found") };
    };
    let now = Time.now();
    let updated : DoctorTypes.DoctorProfile = {
      existing with
      status = newStatus;
      reviewedAt = ?now;
      reviewedBy = ?adminPrincipal;
      rejectionReason = rejection;
    };
    state.doctors.add(doctorId, updated);
  };

  public func approveDoctor(
    state : State,
    adminPrincipal : Principal,
    doctorId : CommonTypes.DoctorId,
  ) : () {
    updateDoctorStatus(state, doctorId, adminPrincipal, #approved, null);
  };

  public func rejectDoctor(
    state : State,
    adminPrincipal : Principal,
    doctorId : CommonTypes.DoctorId,
    reason : Text,
  ) : () {
    updateDoctorStatus(state, doctorId, adminPrincipal, #rejected, ?reason);
  };

  public func suspendDoctor(
    state : State,
    adminPrincipal : Principal,
    doctorId : CommonTypes.DoctorId,
  ) : () {
    updateDoctorStatus(state, doctorId, adminPrincipal, #suspended, null);
  };

  public func logAccess(
    state : State,
    doctorId : CommonTypes.DoctorId,
    patientId : CommonTypes.UserId,
    accessType : CommonTypes.AccessType,
  ) : () {
    let logId = state.counter.nextLogId;
    state.counter.nextLogId += 1;
    let entry : DoctorTypes.AccessLog = {
      id = logId;
      doctorId;
      patientId;
      accessedAt = Time.now();
      accessType;
    };
    state.accessLogs.add(entry);
  };

  public func getAccessLogs(state : State) : [DoctorTypes.AccessLog] {
    state.accessLogs.toArray();
  };

  public func count(state : State) : Nat {
    state.doctors.values().filter(func(d) { d.status == #approved }).toArray().size();
  };

  public func seedSampleData(state : State) : () {
    // Only seed if empty
    if (state.doctors.size() > 0) return;
    let baseTime : Int = 1_700_000_000_000_000_000;
    let reviewTime : Int = 1_700_100_000_000_000_000;
    let adminSeedPrincipal = Principal.fromText("aaaaa-aa");

    let drWilson : DoctorTypes.DoctorProfile = {
      id = 0;
      principalId = Principal.fromText("2vxsx-fae");
      name = "Dr. James Wilson";
      email = "j.wilson@citymedical.com";
      hospitalName = "City Medical Center";
      specialty = "Emergency Medicine";
      licenseNumber = "MD-2024-001";
      contactPhone = "+1-555-1001";
      status = #pending;
      requestedAt = baseTime;
      reviewedAt = null;
      reviewedBy = null;
      rejectionReason = null;
    };
    let drChen : DoctorTypes.DoctorProfile = {
      id = 1;
      principalId = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
      name = "Dr. Sarah Chen";
      email = "s.chen@generalhospital.com";
      hospitalName = "General Hospital";
      specialty = "Internal Medicine";
      licenseNumber = "MD-2024-002";
      contactPhone = "+1-555-1002";
      status = #approved;
      requestedAt = baseTime;
      reviewedAt = ?reviewTime;
      reviewedBy = ?adminSeedPrincipal;
      rejectionReason = null;
    };

    state.counter.nextDoctorId := 2;
    state.doctors.add(0, drWilson);
    state.doctors.add(1, drChen);
  };
};
