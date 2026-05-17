import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import PatientTypes "../types/patient";

module {
  public type State = {
    patients : Map.Map<CommonTypes.UserId, PatientTypes.PatientProfile>;
    patientByPrincipal : Map.Map<Principal, CommonTypes.UserId>;
    patientByEmergencyId : Map.Map<Text, CommonTypes.UserId>;
    counter : { var nextId : CommonTypes.UserId };
  };

  public func initState() : State {
    {
      patients = Map.empty<CommonTypes.UserId, PatientTypes.PatientProfile>();
      patientByPrincipal = Map.empty<Principal, CommonTypes.UserId>();
      patientByEmergencyId = Map.empty<Text, CommonTypes.UserId>();
      counter = { var nextId = 0 };
    };
  };

  func makeEmergencyId(id : Nat, now : Int) : Text {
    "EID-" # id.toText() # "-" # Int.abs(now / 1_000_000_000).toText();
  };

  public func registerPatient(
    state : State,
    caller : Principal,
    input : PatientTypes.RegisterPatientInput,
  ) : PatientTypes.PatientProfile {
    // Prevent duplicate registration
    switch (state.patientByPrincipal.get(caller)) {
      case (?_existingId) { Runtime.trap("Patient already registered") };
      case null {};
    };
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let now = Time.now();
    let emergencyId = makeEmergencyId(id, now);
    let profile : PatientTypes.PatientProfile = {
      id;
      principalId = caller;
      name = input.name;
      age = input.age;
      bloodGroup = input.bloodGroup;
      allergies = input.allergies;
      chronicDiseases = input.chronicDiseases;
      currentMedications = input.currentMedications;
      medicalHistory = input.medicalHistory;
      emergencyContacts = input.emergencyContacts;
      insuranceProvider = input.insuranceProvider;
      insurancePolicyNumber = input.insurancePolicyNumber;
      profilePhotoUrl = input.profilePhotoUrl;
      emergencyId;
      createdAt = now;
      updatedAt = now;
    };
    state.patients.add(id, profile);
    state.patientByPrincipal.add(caller, id);
    state.patientByEmergencyId.add(emergencyId, id);
    profile;
  };

  public func updatePatient(
    state : State,
    caller : Principal,
    input : PatientTypes.RegisterPatientInput,
  ) : PatientTypes.PatientProfile {
    let patientId = switch (state.patientByPrincipal.get(caller)) {
      case (?pid) pid;
      case null { Runtime.trap("Patient not found") };
    };
    let existing = switch (state.patients.get(patientId)) {
      case (?p) p;
      case null { Runtime.trap("Patient record missing") };
    };
    let now = Time.now();
    let updated : PatientTypes.PatientProfile = {
      existing with
      name = input.name;
      age = input.age;
      bloodGroup = input.bloodGroup;
      allergies = input.allergies;
      chronicDiseases = input.chronicDiseases;
      currentMedications = input.currentMedications;
      medicalHistory = input.medicalHistory;
      emergencyContacts = input.emergencyContacts;
      insuranceProvider = input.insuranceProvider;
      insurancePolicyNumber = input.insurancePolicyNumber;
      profilePhotoUrl = input.profilePhotoUrl;
      updatedAt = now;
    };
    state.patients.add(patientId, updated);
    updated;
  };

  public func getByPrincipal(
    state : State,
    caller : Principal,
  ) : ?PatientTypes.PatientProfile {
    switch (state.patientByPrincipal.get(caller)) {
      case (?id) state.patients.get(id);
      case null null;
    };
  };

  public func getByEmergencyId(
    state : State,
    emergencyId : Text,
  ) : ?PatientTypes.PatientProfile {
    switch (state.patientByEmergencyId.get(emergencyId)) {
      case (?id) state.patients.get(id);
      case null null;
    };
  };

  public func getEmergencyInfo(
    state : State,
    emergencyId : Text,
  ) : ?PatientTypes.PatientEmergencyInfo {
    switch (getByEmergencyId(state, emergencyId)) {
      case (?p) ?{
        name = p.name;
        age = p.age;
        bloodGroup = p.bloodGroup;
        allergies = p.allergies;
        chronicDiseases = p.chronicDiseases;
        currentMedications = p.currentMedications;
        emergencyContacts = p.emergencyContacts;
        insuranceProvider = p.insuranceProvider;
        insurancePolicyNumber = p.insurancePolicyNumber;
      };
      case null null;
    };
  };

  public func generateEmergencyId(state : State, caller : Principal) : Text {
    let patientId = switch (state.patientByPrincipal.get(caller)) {
      case (?pid) pid;
      case null { Runtime.trap("Patient not registered") };
    };
    let existing = switch (state.patients.get(patientId)) {
      case (?p) p;
      case null { Runtime.trap("Patient record missing") };
    };
    // Remove old emergencyId index
    state.patientByEmergencyId.remove(existing.emergencyId);
    let now = Time.now();
    let newEmergencyId = makeEmergencyId(patientId, now);
    let updated : PatientTypes.PatientProfile = { existing with emergencyId = newEmergencyId; updatedAt = now };
    state.patients.add(patientId, updated);
    state.patientByEmergencyId.add(newEmergencyId, patientId);
    newEmergencyId;
  };

  public func count(state : State) : Nat {
    state.patients.size();
  };

  public func seedSampleData(state : State) : () {
    // Only seed if empty
    if (state.patients.size() > 0) return;
    let fakePrincipal1 = Principal.fromText("aaaaa-aa");
    let fakePrincipal2 = Principal.fromText("2vxsx-fae");
    let fakePrincipal3 = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
    let baseTime : Int = 1_700_000_000_000_000_000;

    let alice : PatientTypes.PatientProfile = {
      id = 0;
      principalId = fakePrincipal1;
      name = "Alice Johnson";
      age = 34;
      bloodGroup = "A+";
      allergies = ["Penicillin", "Peanuts"];
      chronicDiseases = ["Type 2 Diabetes"];
      currentMedications = [{ name = "Metformin"; dosage = "500mg"; frequency = "Twice daily" }];
      medicalHistory = "Appendectomy in 2018. Diagnosed with Type 2 Diabetes in 2020.";
      emergencyContacts = [{ name = "Robert Johnson"; relationship = "Husband"; phone = "+1-555-0101" }];
      insuranceProvider = "BlueCross BlueShield";
      insurancePolicyNumber = "BCB-2024-001";
      profilePhotoUrl = "";
      emergencyId = "EID-0-ALICE";
      createdAt = baseTime;
      updatedAt = baseTime;
    };
    let bob : PatientTypes.PatientProfile = {
      id = 1;
      principalId = fakePrincipal2;
      name = "Bob Smith";
      age = 52;
      bloodGroup = "O-";
      allergies = ["Sulfa drugs", "Latex"];
      chronicDiseases = ["Hypertension", "Coronary Artery Disease"];
      currentMedications = [
        { name = "Lisinopril"; dosage = "10mg"; frequency = "Once daily" },
        { name = "Aspirin"; dosage = "81mg"; frequency = "Once daily" },
      ];
      medicalHistory = "Cardiac stent placement 2021. Hypertension since 2015.";
      emergencyContacts = [{ name = "Mary Smith"; relationship = "Wife"; phone = "+1-555-0202" }];
      insuranceProvider = "Aetna Health";
      insurancePolicyNumber = "AET-2024-002";
      profilePhotoUrl = "";
      emergencyId = "EID-1-BOB";
      createdAt = baseTime;
      updatedAt = baseTime;
    };
    let carol : PatientTypes.PatientProfile = {
      id = 2;
      principalId = fakePrincipal3;
      name = "Carol Williams";
      age = 28;
      bloodGroup = "B+";
      allergies = ["Aspirin"];
      chronicDiseases = ["Asthma"];
      currentMedications = [{ name = "Albuterol"; dosage = "90mcg"; frequency = "As needed" }];
      medicalHistory = "Asthma diagnosed at age 10. No surgeries.";
      emergencyContacts = [{ name = "James Williams"; relationship = "Father"; phone = "+1-555-0303" }];
      insuranceProvider = "Cigna";
      insurancePolicyNumber = "CIG-2024-003";
      profilePhotoUrl = "";
      emergencyId = "EID-2-CAROL";
      createdAt = baseTime;
      updatedAt = baseTime;
    };

    state.counter.nextId := 3;
    state.patients.add(0, alice);
    state.patients.add(1, bob);
    state.patients.add(2, carol);
    // We do NOT add these to patientByPrincipal since the fake principals are special-cased.
    // They can still be found by emergencyId.
    state.patientByEmergencyId.add("EID-0-ALICE", 0);
    state.patientByEmergencyId.add("EID-1-BOB", 1);
    state.patientByEmergencyId.add("EID-2-CAROL", 2);
  };
};
