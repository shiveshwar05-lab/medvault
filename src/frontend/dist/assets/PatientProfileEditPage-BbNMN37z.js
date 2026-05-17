import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, f as LoadingSpinner, B as Button, d as ue } from "./index-1WRhTf4i.js";
import { I as Input } from "./input-OrHZ9evO.js";
import { L as Label } from "./label-MBnD3_jr.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Trash2, P as Plus } from "./select-DrHgi4V1.js";
import { T as Textarea } from "./textarea-DBDVe8p_.js";
import { a as usePatientProfile, b as useUpdatePatientProfile } from "./usePatientProfile-DNFRzyX6.js";
import "./useMutation-Coptp5Yz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
function PatientProfileEditPage() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = usePatientProfile();
  const updateMutation = useUpdatePatientProfile();
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
  reactExports.useEffect(() => {
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
        chronicDiseases: profile.chronicDiseases.length ? profile.chronicDiseases : [""]
      });
      setMedications(
        profile.currentMedications.length ? profile.currentMedications : [{ name: "", dosage: "", frequency: "" }]
      );
      setContacts(
        profile.emergencyContacts.length ? profile.emergencyContacts : [{ name: "", phone: "", relationship: "" }]
      );
    }
  }, [profile]);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading profile..." }) });
  async function handleSubmit(e) {
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
        emergencyContacts: contacts.filter((c) => c.name && c.phone)
      });
      ue.success("Profile updated successfully!");
      navigate({ to: "/patient/dashboard" });
    } catch {
      ue.error("Update failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/patient/dashboard" }),
          "data-ocid": "edit.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Edit Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Update your emergency medical information" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                required: true,
                "data-ocid": "edit.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Age" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.age,
                onChange: (e) => setForm({ ...form, age: e.target.value }),
                required: true,
                "data-ocid": "edit.age_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Blood Group" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.bloodGroup,
                onValueChange: (v) => setForm({ ...form, bloodGroup: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "edit.blood_group_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_GROUPS.map((bg) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: bg, children: bg }, bg)) })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Medical Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Medical History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 3,
              value: form.medicalHistory,
              onChange: (e) => setForm({ ...form, medicalHistory: e.target.value }),
              "data-ocid": "edit.medical_history_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Allergies" }),
          form.allergies.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: a,
                onChange: (e) => {
                  const idx = form.allergies.indexOf(a);
                  const arr = [...form.allergies];
                  arr[idx] = e.target.value;
                  setForm({ ...form, allergies: arr });
                }
              }
            ),
            form.allergies.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => setForm({
                  ...form,
                  allergies: form.allergies.filter((v) => v !== a)
                }),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }, a || "allergy-empty")),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "mt-1",
              onClick: () => setForm({ ...form, allergies: [...form.allergies, ""] }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                "Add"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: () => navigate({ to: "/patient/dashboard" }),
            "data-ocid": "edit.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "flex-1",
            disabled: updateMutation.isPending,
            "data-ocid": "edit.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-1.5" }),
              updateMutation.isPending ? "Saving..." : "Save Changes"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  PatientProfileEditPage as default
};
