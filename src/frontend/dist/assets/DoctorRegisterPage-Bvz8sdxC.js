import { a as useAuth, r as reactExports, j as jsxRuntimeExports, b as Stethoscope, B as Button, d as ue } from "./index-1WRhTf4i.js";
import { S as StatusBadge } from "./StatusBadge-Bu-d5fRK.js";
import { I as Input } from "./input-OrHZ9evO.js";
import { L as Label } from "./label-MBnD3_jr.js";
import { u as useDoctorProfile, a as useSubmitDoctorRequest } from "./useDoctorProfile-fX_xI_iv.js";
import { C as CircleCheckBig } from "./circle-check-big-CiF-9UmZ.js";
import { C as Clock } from "./clock-BocBxEPW.js";
import "./triangle-alert-DRjbu9A_.js";
import "./useMutation-Coptp5Yz.js";
function DoctorRegisterPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: existingProfile } = useDoctorProfile();
  const submitRequest = useSubmitDoctorRequest();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    specialty: "",
    licenseNumber: "",
    hospitalName: "",
    contactPhone: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Please log in to apply for doctor access." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "doctor_register.login_button", children: "Login with Internet Identity" })
    ] }) });
  }
  if (existingProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-4 text-center shadow-elevated", children: [
      existingProfile.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-[oklch(0.55_0.15_142)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Application Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: existingProfile.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        existingProfile.status === "pending" && "Your application is under review by our admin team. You will be notified once a decision is made.",
        existingProfile.status === "approved" && "Your account has been approved. You can now access the Doctor Portal.",
        existingProfile.status === "rejected" && `Your application was rejected. Reason: ${existingProfile.rejectionReason ?? "Not specified"}`,
        existingProfile.status === "suspended" && "Your account has been suspended. Contact support for more information."
      ] })
    ] }) });
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-4 text-center shadow-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-[oklch(0.55_0.15_142)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Application Submitted!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your doctor registration request has been submitted for review. Our admin team will review your credentials and notify you of their decision." })
    ] }) });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await submitRequest.mutateAsync(form);
      setSubmitted(true);
      ue.success("Doctor registration request submitted!");
    } catch {
      ue.error("Submission failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Doctor Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Submit your credentials for admin review. Once approved, you'll have access to patient emergency information." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dname", children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "dname",
              placeholder: "Dr. Jane Smith",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "dr.smith@hospital.com",
              value: form.email,
              onChange: (e) => setForm({ ...form, email: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "specialty", children: "Medical Specialty *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "specialty",
              placeholder: "Emergency Medicine",
              value: form.specialty,
              onChange: (e) => setForm({ ...form, specialty: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.specialty_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "license", children: "Medical License Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "license",
              placeholder: "MD-2024-001234",
              value: form.licenseNumber,
              onChange: (e) => setForm({ ...form, licenseNumber: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.license_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hospital", children: "Hospital / Institution *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "hospital",
              placeholder: "City General Hospital",
              value: form.hospitalName,
              onChange: (e) => setForm({ ...form, hospitalName: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.hospital_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Contact Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              placeholder: "+1 555-0100",
              value: form.contactPhone,
              onChange: (e) => setForm({ ...form, contactPhone: e.target.value }),
              required: true,
              "data-ocid": "doctor_register.phone_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          className: "w-full",
          disabled: submitRequest.isPending,
          "data-ocid": "doctor_register.submit_button",
          children: submitRequest.isPending ? "Submitting..." : "Submit Registration Request"
        }
      )
    ] })
  ] });
}
export {
  DoctorRegisterPage as default
};
