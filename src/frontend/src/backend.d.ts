import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type DoctorId = bigint;
export interface EmergencyContact {
    relationship: string;
    name: string;
    phone: string;
}
export interface DoctorProfile {
    id: DoctorId;
    status: DoctorStatus;
    name: string;
    rejectionReason?: string;
    reviewedAt?: Timestamp;
    reviewedBy?: Principal;
    email: string;
    specialty: string;
    licenseNumber: string;
    hospitalName: string;
    principalId: Principal;
    requestedAt: Timestamp;
    contactPhone: string;
}
export interface AccessLog {
    id: LogId;
    doctorId: DoctorId;
    patientId: UserId;
    accessType: AccessType;
    accessedAt: Timestamp;
}
export interface PatientEmergencyInfo {
    age: bigint;
    insuranceProvider: string;
    name: string;
    insurancePolicyNumber: string;
    emergencyContacts: Array<EmergencyContact>;
    bloodGroup: string;
    chronicDiseases: Array<string>;
    allergies: Array<string>;
    currentMedications: Array<Medication>;
}
export interface DashboardStats {
    totalPatients: bigint;
    totalAccessLogs: bigint;
    pendingRequests: bigint;
    totalDoctors: bigint;
}
export type LogId = bigint;
export type UserId = bigint;
export interface RegisterPatientInput {
    age: bigint;
    insuranceProvider: string;
    name: string;
    insurancePolicyNumber: string;
    emergencyContacts: Array<EmergencyContact>;
    medicalHistory: string;
    bloodGroup: string;
    chronicDiseases: Array<string>;
    profilePhotoUrl: string;
    allergies: Array<string>;
    currentMedications: Array<Medication>;
}
export interface PatientProfile {
    id: UserId;
    age: bigint;
    emergencyId: string;
    insuranceProvider: string;
    name: string;
    createdAt: Timestamp;
    insurancePolicyNumber: string;
    emergencyContacts: Array<EmergencyContact>;
    updatedAt: Timestamp;
    medicalHistory: string;
    bloodGroup: string;
    chronicDiseases: Array<string>;
    profilePhotoUrl: string;
    allergies: Array<string>;
    principalId: Principal;
    currentMedications: Array<Medication>;
}
export interface SubmitDoctorRequestInput {
    name: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    hospitalName: string;
    contactPhone: string;
}
export interface Medication {
    dosage: string;
    name: string;
    frequency: string;
}
export enum AccessType {
    manual_id = "manual_id",
    qr_scan = "qr_scan"
}
export enum DoctorStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    suspended = "suspended"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveDoctorRequest(doctorId: DoctorId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    generateEmergencyId(): Promise<string>;
    getAccessLogs(): Promise<Array<AccessLog>>;
    getAllDoctors(): Promise<Array<DoctorProfile>>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getDoctorProfile(): Promise<DoctorProfile | null>;
    getDoctorStatus(): Promise<DoctorProfile | null>;
    getMyProfile(): Promise<PatientProfile | null>;
    getPatientByEmergencyId(emergencyId: string): Promise<PatientProfile | null>;
    getPatientEmergencyInfo(emergencyId: string, accessType: AccessType): Promise<PatientEmergencyInfo | null>;
    getPendingDoctorRequests(): Promise<Array<DoctorProfile>>;
    isCallerAdmin(): Promise<boolean>;
    registerPatient(input: RegisterPatientInput): Promise<PatientProfile>;
    rejectDoctorRequest(doctorId: DoctorId, reason: string): Promise<void>;
    submitDoctorRequest(input: SubmitDoctorRequestInput): Promise<DoctorProfile>;
    suspendDoctor(doctorId: DoctorId): Promise<void>;
    updatePatientProfile(input: RegisterPatientInput): Promise<PatientProfile>;
}
