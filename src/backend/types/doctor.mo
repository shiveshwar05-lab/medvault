import Common "common";

module {
  public type DoctorProfile = {
    id : Common.DoctorId;
    principalId : Principal;
    name : Text;
    email : Text;
    hospitalName : Text;
    specialty : Text;
    licenseNumber : Text;
    contactPhone : Text;
    status : Common.DoctorStatus;
    requestedAt : Common.Timestamp;
    reviewedAt : ?Common.Timestamp;
    reviewedBy : ?Principal;
    rejectionReason : ?Text;
  };

  public type SubmitDoctorRequestInput = {
    name : Text;
    email : Text;
    hospitalName : Text;
    specialty : Text;
    licenseNumber : Text;
    contactPhone : Text;
  };

  public type AccessLog = {
    id : Common.LogId;
    doctorId : Common.DoctorId;
    patientId : Common.UserId;
    accessedAt : Common.Timestamp;
    accessType : Common.AccessType;
  };

  public type DashboardStats = {
    totalPatients : Nat;
    totalDoctors : Nat;
    pendingRequests : Nat;
    totalAccessLogs : Nat;
  };
};
