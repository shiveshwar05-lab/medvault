import { c as createLucideIcon, a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, U as User, B as Button, d as ue } from "./index-1WRhTf4i.js";
import { I as Input } from "./input-OrHZ9evO.js";
import { L as Label } from "./label-MBnD3_jr.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Trash2, P as Plus } from "./select-DrHgi4V1.js";
import { T as Textarea } from "./textarea-DBDVe8p_.js";
import { u as useRegisterPatient } from "./usePatientProfile-DNFRzyX6.js";
import "./useMutation-Coptp5Yz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
function PatientRegisterPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const registerMutation = useRegisterPatient();
  const [form, setForm] = reactExports.useState({
    name: "",
    age: "",
    bloodGroup: "",
    medicalHistory: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    profilePhotoUrl: "",
    allergies: [""],
    chronicDiseases: [""]
  });
  const [medications, setMedications] = reactExports.useState([
    { name: "", dosage: "", frequency: "" }
  ]);
  const [contacts, setContacts] = reactExports.useState([
    { name: "", phone: "", relationship: "" }
  ]);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Please log in to register as a patient." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "register.login_button", children: "Login with Internet Identity" })
    ] }) });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.bloodGroup) {
      ue.error("Please select a blood group.");
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
        emergencyContacts: contacts.filter((c) => c.name && c.phone)
      });
      ue.success("Patient profile created successfully!");
      navigate({ to: "/patient/dashboard" });
    } catch (_err) {
      ue.error("Registration failed. Please try again.");
    }
  }
  function updateAllergy(allergy, newValue) {
    const idx = form.allergies.indexOf(allergy);
    if (idx === -1) return;
    const updated = [...form.allergies];
    updated[idx] = newValue;
    setForm({ ...form, allergies: updated });
  }
  function removeAllergy(allergy) {
    setForm({
      ...form,
      allergies: form.allergies.filter((v) => v !== allergy)
    });
  }
  function updateDisease(disease, newValue) {
    const idx = form.chronicDiseases.indexOf(disease);
    if (idx === -1) return;
    const updated = [...form.chronicDiseases];
    updated[idx] = newValue;
    setForm({ ...form, chronicDiseases: updated });
  }
  function removeDisease(disease) {
    setForm({
      ...form,
      chronicDiseases: form.chronicDiseases.filter((v) => v !== disease)
    });
  }
  function updateMedication(med, patch) {
    const idx = medications.indexOf(med);
    if (idx === -1) return;
    const updated = [...medications];
    updated[idx] = { ...updated[idx], ...patch };
    setMedications(updated);
  }
  function removeMedication(med) {
    setMedications(medications.filter((m) => m !== med));
  }
  function updateContact(contact, patch) {
    const idx = contacts.indexOf(contact);
    if (idx === -1) return;
    const updated = [...contacts];
    updated[idx] = { ...updated[idx], ...patch };
    setContacts(updated);
  }
  function removeContact(contact) {
    setContacts(contacts.filter((c) => c !== contact));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Patient Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Create your emergency medical identity profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
          "Personal Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                placeholder: "Jane Doe",
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                required: true,
                "data-ocid": "register.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "age", children: "Age *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "age",
                type: "number",
                min: "1",
                max: "120",
                placeholder: "32",
                value: form.age,
                onChange: (e) => setForm({ ...form, age: e.target.value }),
                required: true,
                "data-ocid": "register.age_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bloodGroup", children: "Blood Group *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.bloodGroup,
                onValueChange: (v) => setForm({ ...form, bloodGroup: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "register.blood_group_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select blood group" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_GROUPS.map((bg) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: bg, children: bg }, bg)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "photoUrl", children: "Profile Photo URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "photoUrl",
                type: "url",
                placeholder: "https://...",
                value: form.profilePhotoUrl,
                onChange: (e) => setForm({ ...form, profilePhotoUrl: e.target.value }),
                "data-ocid": "register.photo_url_input"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Medical Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "medicalHistory", children: "Medical History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "medicalHistory",
              rows: 3,
              placeholder: "Previous surgeries, diagnoses...",
              value: form.medicalHistory,
              onChange: (e) => setForm({ ...form, medicalHistory: e.target.value }),
              "data-ocid": "register.medical_history_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Allergies" }),
          form.allergies.map((allergy, pos) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2 mt-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. Penicillin",
                    value: allergy,
                    onChange: (e) => updateAllergy(allergy, e.target.value),
                    "data-ocid": `register.allergy_input.${pos + 1}`
                  }
                ),
                form.allergies.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => removeAllergy(allergy),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-accent" })
                  }
                )
              ]
            },
            allergy || `allergy-empty-${pos}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "mt-1",
              onClick: () => setForm({ ...form, allergies: [...form.allergies, ""] }),
              "data-ocid": "register.add_allergy_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                "Add Allergy"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Chronic Diseases" }),
          form.chronicDiseases.map((disease, pos) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2 mt-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. Type 2 Diabetes",
                    value: disease,
                    onChange: (e) => updateDisease(disease, e.target.value),
                    "data-ocid": `register.disease_input.${pos + 1}`
                  }
                ),
                form.chronicDiseases.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => removeDisease(disease),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-accent" })
                  }
                )
              ]
            },
            disease || `disease-empty-${pos}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "mt-1",
              onClick: () => setForm({
                ...form,
                chronicDiseases: [...form.chronicDiseases, ""]
              }),
              "data-ocid": "register.add_disease_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                "Add Disease"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Current Medications" }),
        medications.map((med, pos) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-3 gap-2 items-end",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Medication Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Metformin",
                    value: med.name,
                    onChange: (e) => updateMedication(med, { name: e.target.value }),
                    "data-ocid": `register.medication_name.${pos + 1}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dosage" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "500mg",
                    value: med.dosage,
                    onChange: (e) => updateMedication(med, { dosage: e.target.value })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Frequency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Twice daily",
                      value: med.frequency,
                      onChange: (e) => updateMedication(med, { frequency: e.target.value })
                    }
                  )
                ] }),
                medications.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "self-end",
                    onClick: () => removeMedication(med),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-accent" })
                  }
                )
              ] })
            ]
          },
          med.name ? `med-${med.name}-${med.dosage}` : `med-empty-${pos}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setMedications([
              ...medications,
              { name: "", dosage: "", frequency: "" }
            ]),
            "data-ocid": "register.add_medication_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
              "Add Medication"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Emergency Contacts" }),
        contacts.map((contact, pos) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-3 gap-2 items-end",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "John Doe",
                    value: contact.name,
                    onChange: (e) => updateContact(contact, { name: e.target.value }),
                    "data-ocid": `register.contact_name.${pos + 1}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "+1 555-0100",
                    value: contact.phone,
                    onChange: (e) => updateContact(contact, { phone: e.target.value })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Relationship" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Spouse",
                      value: contact.relationship,
                      onChange: (e) => updateContact(contact, { relationship: e.target.value })
                    }
                  )
                ] }),
                contacts.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "self-end",
                    onClick: () => removeContact(contact),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-accent" })
                  }
                )
              ] })
            ]
          },
          contact.name ? `contact-${contact.name}-${contact.phone}` : `contact-empty-${pos}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setContacts([
              ...contacts,
              { name: "", phone: "", relationship: "" }
            ]),
            "data-ocid": "register.add_contact_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
              "Add Contact"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Insurance Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "insurance", children: "Insurance Provider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "insurance",
                placeholder: "BlueCross BlueShield",
                value: form.insuranceProvider,
                onChange: (e) => setForm({ ...form, insuranceProvider: e.target.value }),
                "data-ocid": "register.insurance_provider_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "policyNum", children: "Policy Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "policyNum",
                placeholder: "BCB-123456789",
                value: form.insurancePolicyNumber,
                onChange: (e) => setForm({ ...form, insurancePolicyNumber: e.target.value }),
                "data-ocid": "register.insurance_policy_input"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          className: "w-full",
          disabled: registerMutation.isPending,
          "data-ocid": "register.submit_button",
          children: registerMutation.isPending ? "Creating Profile..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 mr-1" }),
            "Create Emergency Identity"
          ] })
        }
      )
    ] })
  ] });
}
export {
  PatientRegisterPage as default
};
