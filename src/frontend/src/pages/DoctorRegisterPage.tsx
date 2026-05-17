import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitDoctorRequest } from "@/hooks/useDoctorProfile";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import { CheckCircle, Clock, Stethoscope } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DoctorRegisterPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: existingProfile } = useDoctorProfile();
  const submitRequest = useSubmitDoctorRequest();

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "",
    licenseNumber: "",
    hospitalName: "",
    contactPhone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Please log in to apply for doctor access.
          </p>
          <Button onClick={login} data-ocid="doctor_register.login_button">
            Login with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  if (existingProfile) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-4 text-center shadow-elevated">
          {existingProfile.status === "approved" ? (
            <CheckCircle className="w-12 h-12 text-[oklch(0.55_0.15_142)]" />
          ) : (
            <Clock className="w-12 h-12 text-muted-foreground" />
          )}
          <h2 className="text-xl font-semibold">Application Status</h2>
          <StatusBadge status={existingProfile.status} />
          <p className="text-sm text-muted-foreground">
            {existingProfile.status === "pending" &&
              "Your application is under review by our admin team. You will be notified once a decision is made."}
            {existingProfile.status === "approved" &&
              "Your account has been approved. You can now access the Doctor Portal."}
            {existingProfile.status === "rejected" &&
              `Your application was rejected. Reason: ${existingProfile.rejectionReason ?? "Not specified"}`}
            {existingProfile.status === "suspended" &&
              "Your account has been suspended. Contact support for more information."}
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-4 text-center shadow-elevated">
          <CheckCircle className="w-12 h-12 text-[oklch(0.55_0.15_142)]" />
          <h2 className="text-xl font-semibold">Application Submitted!</h2>
          <p className="text-sm text-muted-foreground">
            Your doctor registration request has been submitted for review. Our
            admin team will review your credentials and notify you of their
            decision.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitRequest.mutateAsync(form);
      setSubmitted(true);
      toast.success("Doctor registration request submitted!");
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Doctor Registration</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Submit your credentials for admin review. Once approved, you'll have
          access to patient emergency information.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div>
            <Label htmlFor="dname">Full Name *</Label>
            <Input
              id="dname"
              placeholder="Dr. Jane Smith"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              data-ocid="doctor_register.name_input"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="dr.smith@hospital.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              data-ocid="doctor_register.email_input"
            />
          </div>
          <div>
            <Label htmlFor="specialty">Medical Specialty *</Label>
            <Input
              id="specialty"
              placeholder="Emergency Medicine"
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              required
              data-ocid="doctor_register.specialty_input"
            />
          </div>
          <div>
            <Label htmlFor="license">Medical License Number *</Label>
            <Input
              id="license"
              placeholder="MD-2024-001234"
              value={form.licenseNumber}
              onChange={(e) =>
                setForm({ ...form, licenseNumber: e.target.value })
              }
              required
              data-ocid="doctor_register.license_input"
            />
          </div>
          <div>
            <Label htmlFor="hospital">Hospital / Institution *</Label>
            <Input
              id="hospital"
              placeholder="City General Hospital"
              value={form.hospitalName}
              onChange={(e) =>
                setForm({ ...form, hospitalName: e.target.value })
              }
              required
              data-ocid="doctor_register.hospital_input"
            />
          </div>
          <div>
            <Label htmlFor="phone">Contact Phone *</Label>
            <Input
              id="phone"
              placeholder="+1 555-0100"
              value={form.contactPhone}
              onChange={(e) =>
                setForm({ ...form, contactPhone: e.target.value })
              }
              required
              data-ocid="doctor_register.phone_input"
            />
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitRequest.isPending}
          data-ocid="doctor_register.submit_button"
        >
          {submitRequest.isPending
            ? "Submitting..."
            : "Submit Registration Request"}
        </Button>
      </form>
    </div>
  );
}
