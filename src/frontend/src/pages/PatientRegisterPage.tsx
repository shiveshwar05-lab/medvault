import type { EmergencyContact, Medication } from "@/backend";
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
import { useAuth } from "@/hooks/useAuth";
import { useRegisterPatient } from "@/hooks/usePatientProfile";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function PatientRegisterPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const registerMutation = useRegisterPatient();

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Please log in to register as a patient.
          </p>
          <Button onClick={login} data-ocid="register.login_button">
            Login with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.bloodGroup) {
      toast.error("Please select a blood group.");
      return;
    }
    try {
      await registerMutation.mutateAsync({
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
      toast.success("Patient profile created successfully!");
      navigate({ to: "/patient/dashboard" });
    } catch (_err) {
      toast.error("Registration failed. Please try again.");
    }
  }

  // ── allergy helpers (value-based, no index in key or mutation) ────────────
  function updateAllergy(allergy: string, newValue: string) {
    const idx = form.allergies.indexOf(allergy);
    if (idx === -1) return;
    const updated = [...form.allergies];
    updated[idx] = newValue;
    setForm({ ...form, allergies: updated });
  }
  function removeAllergy(allergy: string) {
    setForm({
      ...form,
      allergies: form.allergies.filter((v) => v !== allergy),
    });
  }

  // ── chronic-disease helpers ───────────────────────────────────────────────
  function updateDisease(disease: string, newValue: string) {
    const idx = form.chronicDiseases.indexOf(disease);
    if (idx === -1) return;
    const updated = [...form.chronicDiseases];
    updated[idx] = newValue;
    setForm({ ...form, chronicDiseases: updated });
  }
  function removeDisease(disease: string) {
    setForm({
      ...form,
      chronicDiseases: form.chronicDiseases.filter((v) => v !== disease),
    });
  }

  // ── medication helpers ────────────────────────────────────────────────────
  function updateMedication(med: Medication, patch: Partial<Medication>) {
    const idx = medications.indexOf(med);
    if (idx === -1) return;
    const updated = [...medications];
    updated[idx] = { ...updated[idx], ...patch };
    setMedications(updated);
  }
  function removeMedication(med: Medication) {
    setMedications(medications.filter((m) => m !== med));
  }

  // ── contact helpers ───────────────────────────────────────────────────────
  function updateContact(
    contact: EmergencyContact,
    patch: Partial<EmergencyContact>,
  ) {
    const idx = contacts.indexOf(contact);
    if (idx === -1) return;
    const updated = [...contacts];
    updated[idx] = { ...updated[idx], ...patch };
    setContacts(updated);
  }
  function removeContact(contact: EmergencyContact) {
    setContacts(contacts.filter((c) => c !== contact));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Patient Registration
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Create your emergency medical identity profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                data-ocid="register.name_input"
              />
            </div>
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="32"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
                data-ocid="register.age_input"
              />
            </div>
            <div>
              <Label htmlFor="bloodGroup">Blood Group *</Label>
              <Select
                value={form.bloodGroup}
                onValueChange={(v) => setForm({ ...form, bloodGroup: v })}
              >
                <SelectTrigger data-ocid="register.blood_group_select">
                  <SelectValue placeholder="Select blood group" />
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
            <div className="sm:col-span-2">
              <Label htmlFor="photoUrl">Profile Photo URL</Label>
              <Input
                id="photoUrl"
                type="url"
                placeholder="https://..."
                value={form.profilePhotoUrl}
                onChange={(e) =>
                  setForm({ ...form, profilePhotoUrl: e.target.value })
                }
                data-ocid="register.photo_url_input"
              />
            </div>
          </div>
        </section>

        {/* Medical Info */}
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Medical Information</h2>
          <div>
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              rows={3}
              placeholder="Previous surgeries, diagnoses..."
              value={form.medicalHistory}
              onChange={(e) =>
                setForm({ ...form, medicalHistory: e.target.value })
              }
              data-ocid="register.medical_history_input"
            />
          </div>

          {/* Allergies */}
          <div>
            <Label>Allergies</Label>
            {form.allergies.map((allergy, pos) => (
              <div
                key={allergy || `allergy-empty-${pos}`}
                className="flex gap-2 mt-1"
              >
                <Input
                  placeholder="e.g. Penicillin"
                  value={allergy}
                  onChange={(e) => updateAllergy(allergy, e.target.value)}
                  data-ocid={`register.allergy_input.${pos + 1}`}
                />
                {form.allergies.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAllergy(allergy)}
                  >
                    <Trash2 className="w-4 h-4 text-accent" />
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
              data-ocid="register.add_allergy_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Allergy
            </Button>
          </div>

          {/* Chronic Diseases */}
          <div>
            <Label>Chronic Diseases</Label>
            {form.chronicDiseases.map((disease, pos) => (
              <div
                key={disease || `disease-empty-${pos}`}
                className="flex gap-2 mt-1"
              >
                <Input
                  placeholder="e.g. Type 2 Diabetes"
                  value={disease}
                  onChange={(e) => updateDisease(disease, e.target.value)}
                  data-ocid={`register.disease_input.${pos + 1}`}
                />
                {form.chronicDiseases.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDisease(disease)}
                  >
                    <Trash2 className="w-4 h-4 text-accent" />
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
                setForm({
                  ...form,
                  chronicDiseases: [...form.chronicDiseases, ""],
                })
              }
              data-ocid="register.add_disease_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Disease
            </Button>
          </div>
        </section>

        {/* Medications */}
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Current Medications</h2>
          {medications.map((med, pos) => (
            <div
              key={
                med.name ? `med-${med.name}-${med.dosage}` : `med-empty-${pos}`
              }
              className="grid grid-cols-3 gap-2 items-end"
            >
              <div>
                <Label>Medication Name</Label>
                <Input
                  placeholder="Metformin"
                  value={med.name}
                  onChange={(e) =>
                    updateMedication(med, { name: e.target.value })
                  }
                  data-ocid={`register.medication_name.${pos + 1}`}
                />
              </div>
              <div>
                <Label>Dosage</Label>
                <Input
                  placeholder="500mg"
                  value={med.dosage}
                  onChange={(e) =>
                    updateMedication(med, { dosage: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-1">
                <div className="flex-1">
                  <Label>Frequency</Label>
                  <Input
                    placeholder="Twice daily"
                    value={med.frequency}
                    onChange={(e) =>
                      updateMedication(med, { frequency: e.target.value })
                    }
                  />
                </div>
                {medications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="self-end"
                    onClick={() => removeMedication(med)}
                  >
                    <Trash2 className="w-4 h-4 text-accent" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setMedications([
                ...medications,
                { name: "", dosage: "", frequency: "" },
              ])
            }
            data-ocid="register.add_medication_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Medication
          </Button>
        </section>

        {/* Emergency Contacts */}
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Emergency Contacts</h2>
          {contacts.map((contact, pos) => (
            <div
              key={
                contact.name
                  ? `contact-${contact.name}-${contact.phone}`
                  : `contact-empty-${pos}`
              }
              className="grid grid-cols-3 gap-2 items-end"
            >
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="John Doe"
                  value={contact.name}
                  onChange={(e) =>
                    updateContact(contact, { name: e.target.value })
                  }
                  data-ocid={`register.contact_name.${pos + 1}`}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  placeholder="+1 555-0100"
                  value={contact.phone}
                  onChange={(e) =>
                    updateContact(contact, { phone: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-1">
                <div className="flex-1">
                  <Label>Relationship</Label>
                  <Input
                    placeholder="Spouse"
                    value={contact.relationship}
                    onChange={(e) =>
                      updateContact(contact, { relationship: e.target.value })
                    }
                  />
                </div>
                {contacts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="self-end"
                    onClick={() => removeContact(contact)}
                  >
                    <Trash2 className="w-4 h-4 text-accent" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setContacts([
                ...contacts,
                { name: "", phone: "", relationship: "" },
              ])
            }
            data-ocid="register.add_contact_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Contact
          </Button>
        </section>

        {/* Insurance */}
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">
            Insurance Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insurance">Insurance Provider</Label>
              <Input
                id="insurance"
                placeholder="BlueCross BlueShield"
                value={form.insuranceProvider}
                onChange={(e) =>
                  setForm({ ...form, insuranceProvider: e.target.value })
                }
                data-ocid="register.insurance_provider_input"
              />
            </div>
            <div>
              <Label htmlFor="policyNum">Policy Number</Label>
              <Input
                id="policyNum"
                placeholder="BCB-123456789"
                value={form.insurancePolicyNumber}
                onChange={(e) =>
                  setForm({ ...form, insurancePolicyNumber: e.target.value })
                }
                data-ocid="register.insurance_policy_input"
              />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={registerMutation.isPending}
          data-ocid="register.submit_button"
        >
          {registerMutation.isPending ? (
            "Creating Profile..."
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-1" />
              Create Emergency Identity
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
