module {
  public type UserId = Nat;
  public type DoctorId = Nat;
  public type LogId = Nat;
  public type Timestamp = Int;

  public type Medication = {
    name : Text;
    dosage : Text;
    frequency : Text;
  };

  public type EmergencyContact = {
    name : Text;
    relationship : Text;
    phone : Text;
  };

  public type DoctorStatus = {
    #pending;
    #approved;
    #rejected;
    #suspended;
  };

  public type AccessType = {
    #qr_scan;
    #manual_id;
  };
};
