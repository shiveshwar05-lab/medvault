import type { EmergencyContact, Medication } from "@/backend";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  usePatientProfile,
  useUpdatePatientProfile,
} from "@/hooks/usePatientProfile";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function PatientProfileEditPage() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = usePatientProfile();
  const updateMutation = useUpdatePatientProfile();

  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    medicalHistory: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    profilePhotoUrl: "",
    allergies: [""],
    chronicDiseases: [""],
  });
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "" },
  ]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: "", phone: "", relationship: "" },
  ]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        age: profile.age.toString(),
        bloodGroup: profile.bloodGroup,
        medicalHistory: profile.medicalHistory,
        insuranceProvider: profile.insuranceProvider,
        insurancePolicyNumber: profile.insurancePolicyNumber,
        profilePhotoUrl: profile.profilePhotoUrl,
        allergies: profile.allergies.length ? profile.allergies : [""],
        chronicDiseases: profile.chronicDiseases.length
          ? profile.chronicDiseases
          : [""],
      });
      setMedications(
        profile.currentMedications.length
          ? profile.currentMedications
          : [{ name: "", dosage: "", frequency: "" }],
      );
      setContacts(
        profile.emergencyContacts.length
          ? profile.emergencyContacts
          : [{ name: "", phone: "", relationship: "" }],
      );
    }
  }, [profile]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" label="Loading profile..." />
      </div>
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        name: form.name,
        age: BigInt(form.age),
        bloodGroup: form.bloodGroup,
        medicalHistory: form.medicalHistory,
        insuranceProvider: form.insuranceProvider,
        insurancePolicyNumber: form.insurancePolicyNumber,
        profilePhotoUrl: form.profilePhotoUrl,
        allergies: form.allergies.filter(Boolean),
        chronicDiseases: form.chronicDiseases.filter(Boolean),
        currentMedications: medications.filter((m) => m.name),
        emergencyContacts: contacts.filter((c) => c.name && c.phone),
      });
      toast.success("Profile updated successfully!");
      navigate({ to: "/patient/dashboard" });
    } catch {
      toast.error("Update failed. Please try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/patient/dashboard" })}
          data-ocid="edit.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Edit Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Update your emergency medical information
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                data-ocid="edit.name_input"
              />
            </div>
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
                data-ocid="edit.age_input"
              />
            </div>
            <div>
              <Label>Blood Group</Label>
              <Select
                value={form.bloodGroup}
                onValueChange={(v) => setForm({ ...form, bloodGroup: v })}
              >
                <SelectTrigger data-ocid="edit.blood_group_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold">Medical Details</h2>
          <div>
            <Label>Medical History</Label>
            <Textarea
              rows={3}
              value={form.medicalHistory}
              onChange={(e) =>
                setForm({ ...form, medicalHistory: e.target.value })
              }
              data-ocid="edit.medical_history_input"
            />
          </div>
          <div>
            <Label>Allergies</Label>
            {form.allergies.map((a) => (
              <div key={a || "allergy-empty"} className="flex gap-2 mt-1">
                <Input
                  value={a}
                  onChange={(e) => {
                    const idx = form.allergies.indexOf(a);
                    const arr = [...form.allergies];
                    arr[idx] = e.target.value;
                    setForm({ ...form, allergies: arr });
                  }}
                />
                {form.allergies.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setForm({
                        ...form,
                        allergies: form.allergies.filter((v) => v !== a),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() =>
                setForm({ ...form, allergies: [...form.allergies, ""] })
              }
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add
            </Button>
          </div>
        </section>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate({ to: "/patient/dashboard" })}
            data-ocid="edit.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={updateMutation.isPending}
            data-ocid="edit.save_button"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
