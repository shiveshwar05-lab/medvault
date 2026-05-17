import Common "common";

module {
  public type PatientProfile = {
    id : Common.UserId;
    principalId : Principal;
    name : Text;
    age : Nat;
    bloodGroup : Text;
    allergies : [Text];
    chronicDiseases : [Text];
    currentMedications : [Common.Medication];
    medicalHistory : Text;
    emergencyContacts : [Common.EmergencyContact];
    insuranceProvider : Text;
    insurancePolicyNumber : Text;
    profilePhotoUrl : Text;
    emergencyId : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PatientEmergencyInfo = {
    name : Text;
    age : Nat;
    bloodGroup : Text;
    allergies : [Text];
    chronicDiseases : [Text];
    currentMedications : [Common.Medication];
    emergencyContacts : [Common.EmergencyContact];
    insuranceProvider : Text;
    insurancePolicyNumber : Text;
  };

  public type RegisterPatientInput = {
    name : Text;
    age : Nat;
    bloodGroup : Text;
    allergies : [Text];
    chronicDiseases : [Text];
    currentMedications : [Common.Medication];
    medicalHistory : Text;
    emergencyContacts : [Common.EmergencyContact];
    insuranceProvider : Text;
    insurancePolicyNumber : Text;
    profilePhotoUrl : Text;
  };
};
