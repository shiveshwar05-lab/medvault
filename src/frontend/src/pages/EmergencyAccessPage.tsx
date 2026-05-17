import ErrorCard from "@/components/ErrorCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import MedicalBadge from "@/components/MedicalBadge";
import { useEmergencyAccess } from "@/hooks/usePatientProfile";
import { useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Clock,
  Phone,
  Pill,
  Shield,
} from "lucide-react";

export default function EmergencyAccessPage() {
  const { emergencyId } = useParams({ from: "/emergency/$emergencyId" });
  const {
    data: info,
    isLoading,
    error,
    refetch,
  } = useEmergencyAccess(emergencyId);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner
            size="lg"
            label="Retrieving emergency medical information..."
          />
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            {emergencyId}
          </p>
        </div>
      </div>
    );
  }

  if (error || !info) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <ErrorCard
          title="Patient Not Found"
          message={`No emergency record found for ID: ${emergencyId}`}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-6 space-y-4"
      data-ocid="emergency.page"
    >
      {/* Emergency Banner */}
      <div
        className="bg-accent rounded-2xl p-5 text-accent-foreground shadow-emergency"
        data-ocid="emergency.alert_banner"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <h1 className="font-bold text-lg">EMERGENCY MEDICAL ACCESS</h1>
            <p className="text-sm opacity-90">
              Authorized emergency information retrieval
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs opacity-70">Emergency ID</p>
            <p className="font-mono text-sm font-bold">{emergencyId}</p>
          </div>
        </div>
      </div>

      {/* Patient Identity */}
      <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
        <div className="bg-primary px-6 py-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary-foreground" />
          <h2 className="font-semibold text-primary-foreground text-sm">
            Patient Identity
          </h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{info.name}</h2>
            <p className="text-muted-foreground">Age: {info.age.toString()}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MedicalBadge bloodGroup={info.bloodGroup} size="lg" />
          </div>
        </div>
      </div>

      {/* Allergies - Critical */}
      {info.allergies.length > 0 && (
        <div
          className="bg-accent/10 rounded-2xl border-2 border-accent shadow-emergency p-5"
          data-ocid="emergency.allergies_card"
        >
          <h3 className="font-bold text-accent flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5" />⚠ CRITICAL ALLERGIES
          </h3>
          <div className="flex flex-wrap gap-2">
            {info.allergies.map((a) => (
              <span
                key={`allergy-${a}`}
                className="px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-sm font-bold uppercase tracking-wide"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Medical Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {info.chronicDiseases.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-primary" />
              Chronic Conditions
            </h4>
            <ul className="space-y-1">
              {info.chronicDiseases.map((d) => (
                <li key={`disease-${d}`} className="text-sm text-foreground">
                  • {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {info.currentMedications.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-primary" />
              Current Medications
            </h4>
            <ul className="space-y-2">
              {info.currentMedications.map((med) => (
                <li key={`medication-${med.name}`} className="text-sm">
                  <span className="font-medium text-foreground">
                    {med.name}
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">
                    {med.dosage} · {med.frequency}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {info.emergencyContacts.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-primary" />
              Emergency Contacts
            </h4>
            <ul className="space-y-2">
              {info.emergencyContacts.map((c) => (
                <li key={`contact-${c.phone}`} className="text-sm">
                  <p className="font-medium text-foreground">
                    {c.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({c.relationship})
                    </span>
                  </p>
                  <a
                    href={`tel:${c.phone}`}
                    className="text-primary font-mono text-xs hover:underline"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(info.insuranceProvider || info.insurancePolicyNumber) && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              Insurance
            </h4>
            <p className="text-sm font-medium text-foreground">
              {info.insuranceProvider}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {info.insurancePolicyNumber}
            </p>
          </div>
        )}
      </div>

      {/* Access Log Notice */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-muted-foreground text-xs">
        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
        This access has been logged. Timestamp: {new Date().toISOString()}
      </div>
    </div>
  );
}
