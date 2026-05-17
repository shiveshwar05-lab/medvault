import EmptyState from "@/components/EmptyState";
import ErrorCard from "@/components/ErrorCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import MedicalBadge from "@/components/MedicalBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { usePatientProfile } from "@/hooks/usePatientProfile";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Download,
  Edit,
  Phone,
  Pill,
  QrCode,
  Shield,
} from "lucide-react";
import { useEffect, useRef } from "react";

function QRCodeDisplay({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    import("qrcode")
      .then((QRCode) => {
        if (canvasRef.current) {
          QRCode.toCanvas(canvasRef.current, value, {
            width: 200,
            margin: 2,
            color: { dark: "#1e3a8a", light: "#ffffff" },
          });
        }
      })
      .catch(() => {});
  }, [value]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg"
      aria-label="Emergency QR Code"
    />
  );
}

export default function PatientDashboardPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    isFetched,
    error,
    refetch,
  } = usePatientProfile();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <Button onClick={login}>Login with Internet Identity</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner
            size="lg"
            label="Loading your profile..."
            data-ocid="dashboard.loading_state"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ErrorCard
          title="Failed to load profile"
          message="Could not load your medical profile."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (isFetched && !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <EmptyState
          icon={Activity}
          title="No Profile Found"
          description="Create your emergency medical identity to get started."
          action={{
            label: "Register Now",
            onClick: () => navigate({ to: "/patient/register" }),
          }}
        />
      </div>
    );
  }

  if (!profile) return null;

  const emergencyUrl = `${window.location.origin}/emergency/${profile.emergencyId}`;

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
      data-ocid="dashboard.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Emergency Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Emergency ID:{" "}
            <span className="font-mono text-primary">
              {profile.emergencyId}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/patient/profile/edit" })}
          data-ocid="dashboard.edit_button"
        >
          <Edit className="w-4 h-4 mr-1.5" />
          Edit Profile
        </Button>
      </div>

      {/* Identity Card */}
      <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
        <div className="bg-primary px-6 py-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary-foreground" />
          <h2 className="font-semibold text-primary-foreground">
            Patient Emergency Card
          </h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {profile.profilePhotoUrl ? (
                <img
                  src={profile.profilePhotoUrl}
                  alt={profile.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-border"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {profile.name[0]}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {profile.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Age: {profile.age.toString()}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  ID: #{profile.id.toString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <MedicalBadge bloodGroup={profile.bloodGroup} size="lg" />
              {profile.allergies.length > 0 && (
                <div className="flex items-start gap-1.5 px-3 py-1.5 rounded bg-accent/10 border border-accent/30 emergency-border">
                  <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-accent font-semibold uppercase tracking-wide">
                      Allergies
                    </p>
                    <p className="text-sm font-semibold text-accent">
                      {profile.allergies.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code Card */}
        <div
          className="bg-card rounded-2xl border border-border shadow-elevated p-6 flex flex-col items-center gap-4"
          data-ocid="dashboard.qr_card"
        >
          <h3 className="font-semibold text-foreground w-full flex items-center gap-2">
            <QrCode className="w-4 h-4 text-primary" />
            Emergency QR Code
          </h3>
          <div className="p-4 bg-background rounded-xl border border-border">
            <QRCodeDisplay value={emergencyUrl} />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Hospital staff can scan this code to instantly access your emergency
            medical information.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const link = document.createElement("a");
              const canvas = document.querySelector("canvas");
              if (canvas) {
                link.download = `medvault-emergency-${profile.emergencyId}.png`;
                link.href = canvas.toDataURL();
                link.click();
              }
            }}
            data-ocid="dashboard.download_qr_button"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download QR Code
          </Button>
        </div>

        {/* Medical Summary */}
        <div className="space-y-4">
          {profile.chronicDiseases.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                Chronic Conditions
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.chronicDiseases.map((d) => (
                  <span
                    key={`disease-${d}`}
                    className="text-xs bg-muted px-2 py-0.5 rounded-full text-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
          {profile.currentMedications.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-primary" />
                Current Medications
              </h4>
              <div className="space-y-1.5">
                {profile.currentMedications.map((med) => (
                  <div
                    key={`med-${med.name}`}
                    className="text-sm flex justify-between"
                  >
                    <span className="font-medium text-foreground">
                      {med.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {med.dosage} · {med.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {profile.emergencyContacts.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-primary" />
                Emergency Contacts
              </h4>
              <div className="space-y-2">
                {profile.emergencyContacts.map((contact) => (
                  <div
                    key={`contact-${contact.phone}`}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium text-foreground">
                        {contact.name}
                      </span>
                      <span className="text-muted-foreground text-xs ml-1">
                        ({contact.relationship})
                      </span>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-primary hover:underline text-xs font-mono"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insurance */}
      {profile.insuranceProvider && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-medium text-foreground mb-2">
            Insurance Information
          </h4>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Provider: </span>
              <span className="font-medium">{profile.insuranceProvider}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Policy: </span>
              <span className="font-mono text-xs">
                {profile.insurancePolicyNumber}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
