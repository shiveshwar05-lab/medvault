import { DoctorStatus } from "@/backend";
import LoadingSpinner from "@/components/LoadingSpinner";
import MedicalBadge from "@/components/MedicalBadge";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import { useQRScanner } from "@/lib/qr-scanner";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  QrCode,
  Search,
  Shield,
  Stethoscope,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DoctorDashboardPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: doctorProfile, isLoading } = useDoctorProfile();
  const navigate = useNavigate();
  const [manualId, setManualId] = useState("");
  const [scanMode, setScanMode] = useState(false);

  const {
    videoRef,
    canvasRef,
    isScanning,
    canStartScanning,
    startScanning,
    stopScanning,
    qrResults,
    error: scanError,
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 150,
    maxResults: 3,
  });

  useEffect(() => {
    if (qrResults.length > 0) {
      const url = qrResults[0].data;
      const match = url.match(/\/emergency\/([^/?]+)/);
      if (match) {
        stopScanning();
        setScanMode(false);
        navigate({
          to: "/emergency/$emergencyId",
          params: { emergencyId: match[1] },
        });
      } else {
        toast.error("Invalid QR code — not a MedVault emergency code.");
      }
    }
  }, [qrResults, navigate, stopScanning]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <Button onClick={login}>Login with Internet Identity</Button>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" label="Loading doctor profile..." />
      </div>
    );

  if (!doctorProfile) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Doctor Registration Required
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Submit a registration request to access the doctor portal.
        </p>
        <Button
          onClick={() => navigate({ to: "/doctor/register" })}
          data-ocid="doctor.register_button"
        >
          Register as Doctor
        </Button>
      </div>
    );
  }

  if (doctorProfile.status !== DoctorStatus.approved) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl border border-border p-8 text-center shadow-elevated">
          <StatusBadge status={doctorProfile.status} className="mb-4" />
          <h2 className="text-xl font-semibold mt-2">{doctorProfile.name}</h2>
          <p className="text-muted-foreground text-sm mt-2">
            {doctorProfile.status === DoctorStatus.pending &&
              "Your account is pending admin approval."}
            {doctorProfile.status === DoctorStatus.rejected &&
              `Rejected: ${doctorProfile.rejectionReason ?? "No reason provided"}`}
            {doctorProfile.status === DoctorStatus.suspended &&
              "Your account has been suspended."}
          </p>
        </div>
      </div>
    );
  }

  function handleManualSearch(e: React.FormEvent) {
    e.preventDefault();
    if (manualId.trim()) {
      navigate({
        to: "/emergency/$emergencyId",
        params: { emergencyId: manualId.trim() },
      });
    }
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 space-y-6"
      data-ocid="doctor.page"
    >
      {/* Doctor Header */}
      <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
        <div className="bg-primary px-6 py-4 flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-primary-foreground" />
          <h1 className="font-bold text-primary-foreground">Doctor Portal</h1>
          <StatusBadge status={doctorProfile.status} className="ml-auto" />
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-lg text-foreground">
            {doctorProfile.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            {doctorProfile.specialty} · {doctorProfile.hospitalName}
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            License: {doctorProfile.licenseNumber}
          </p>
        </div>
      </div>

      {/* QR Scanner */}
      <div
        className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
        data-ocid="doctor.qr_scanner_card"
      >
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <QrCode className="w-4 h-4 text-primary" />
            Scan Patient QR Code
          </h3>
          {isScanning && (
            <span className="text-xs text-[oklch(0.55_0.15_142)] font-medium animate-pulse">
              ● Scanning...
            </span>
          )}
        </div>
        <div className="p-6">
          {scanMode ? (
            <div className="space-y-4">
              <div className="relative bg-foreground/5 rounded-xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary/60 rounded-lg" />
                  </div>
                )}
              </div>
              {scanError && (
                <p className="text-sm text-accent">{scanError.message}</p>
              )}
              <div className="flex gap-2">
                {!isScanning ? (
                  <Button
                    onClick={startScanning}
                    disabled={!canStartScanning}
                    className="flex-1"
                    data-ocid="doctor.start_scan_button"
                  >
                    Start Scanning
                  </Button>
                ) : (
                  <Button
                    onClick={() => stopScanning()}
                    variant="outline"
                    className="flex-1"
                    data-ocid="doctor.stop_scan_button"
                  >
                    Stop Scanning
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    stopScanning();
                    setScanMode(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-24 h-24 rounded-2xl bg-primary/5 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-primary/40" />
              </div>
              <Button
                onClick={() => setScanMode(true)}
                size="lg"
                data-ocid="doctor.open_scanner_button"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Scan Patient QR Code
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Manual ID Search */}
      <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-primary" />
          Manual Patient Search
        </h3>
        <form onSubmit={handleManualSearch} className="flex gap-2">
          <Input
            placeholder="Enter Emergency ID (e.g. EMR-2024-001234)"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            className="flex-1"
            data-ocid="doctor.manual_id_input"
          />
          <Button
            type="submit"
            disabled={!manualId.trim()}
            data-ocid="doctor.search_button"
          >
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </form>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
        <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Patient data access is logged and audited. Only access records for
          patients under your care.
        </p>
      </div>
    </div>
  );
}
