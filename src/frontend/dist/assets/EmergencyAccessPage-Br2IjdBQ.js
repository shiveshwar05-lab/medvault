import { p as useParams, j as jsxRuntimeExports, f as LoadingSpinner, S as Shield, A as Activity } from "./index-1WRhTf4i.js";
import { E as ErrorCard, M as MedicalBadge, P as Pill, a as Phone } from "./MedicalBadge-DKnQYx8Z.js";
import { c as useEmergencyAccess } from "./usePatientProfile-DNFRzyX6.js";
import { T as TriangleAlert } from "./triangle-alert-DRjbu9A_.js";
import { C as Clock } from "./clock-BocBxEPW.js";
import "./useMutation-Coptp5Yz.js";
function EmergencyAccessPage() {
  const { emergencyId } = useParams({ from: "/emergency/$emergencyId" });
  const {
    data: info,
    isLoading,
    error,
    refetch
  } = useEmergencyAccess(emergencyId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LoadingSpinner,
        {
          size: "lg",
          label: "Retrieving emergency medical information..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 font-mono", children: emergencyId })
    ] }) });
  }
  if (error || !info) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorCard,
      {
        title: "Patient Not Found",
        message: `No emergency record found for ID: ${emergencyId}`,
        onRetry: () => refetch()
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-6 space-y-4",
      "data-ocid": "emergency.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-accent rounded-2xl p-5 text-accent-foreground shadow-emergency",
            "data-ocid": "emergency.alert_banner",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-lg", children: "EMERGENCY MEDICAL ACCESS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: "Authorized emergency information retrieval" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70", children: "Emergency ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold", children: emergencyId })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-primary-foreground text-sm", children: "Patient Identity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col sm:flex-row items-start gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: info.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Age: ",
                info.age.toString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalBadge, { bloodGroup: info.bloodGroup, size: "lg" }) })
          ] })
        ] }),
        info.allergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-accent/10 rounded-2xl border-2 border-accent shadow-emergency p-5",
            "data-ocid": "emergency.allergies_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-accent flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
                "⚠ CRITICAL ALLERGIES"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: info.allergies.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-sm font-bold uppercase tracking-wide",
                  children: a
                },
                `allergy-${a}`
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          info.chronicDiseases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
              "Chronic Conditions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: info.chronicDiseases.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-foreground", children: [
              "• ",
              d
            ] }, `disease-${d}`)) })
          ] }),
          info.currentMedications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "w-4 h-4 text-primary" }),
              "Current Medications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: info.currentMedications.map((med) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: med.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-1", children: [
                med.dosage,
                " · ",
                med.frequency
              ] })
            ] }, `medication-${med.name}`)) })
          ] }),
          info.emergencyContacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
              "Emergency Contacts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: info.emergencyContacts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                c.name,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                  "(",
                  c.relationship,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `tel:${c.phone}`,
                  className: "text-primary font-mono text-xs hover:underline",
                  children: c.phone
                }
              )
            ] }, `contact-${c.phone}`)) })
          ] }),
          (info.insuranceProvider || info.insurancePolicyNumber) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
              "Insurance"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: info.insuranceProvider }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground mt-1", children: info.insurancePolicyNumber })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          "This access has been logged. Timestamp: ",
          (/* @__PURE__ */ new Date()).toISOString()
        ] })
      ]
    }
  );
}
export {
  EmergencyAccessPage as default
};
