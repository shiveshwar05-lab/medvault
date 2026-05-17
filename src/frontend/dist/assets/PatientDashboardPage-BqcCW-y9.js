import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, e as cn, a as useAuth, u as useNavigate, S as Shield, f as LoadingSpinner, A as Activity, r as reactExports, _ as __vitePreload } from "./index-1WRhTf4i.js";
import { E as ErrorCard, M as MedicalBadge, P as Pill, a as Phone } from "./MedicalBadge-DKnQYx8Z.js";
import { a as usePatientProfile } from "./usePatientProfile-DNFRzyX6.js";
import { T as TriangleAlert } from "./triangle-alert-DRjbu9A_.js";
import { Q as QrCode } from "./qr-code-BfCRU2Mv.js";
import "./useMutation-Coptp5Yz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-4 py-16 px-8 text-center",
        className
      ),
      "data-ocid": "empty.empty_state",
      children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-1", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action.onClick, children: action.label })
      ]
    }
  );
}
function QRCodeDisplay({ value }) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    __vitePreload(() => import("./browser-DL7rV3NY.js").then((n) => n.b), true ? [] : void 0).then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, value, {
          width: 200,
          margin: 2,
          color: { dark: "#1e3a8a", light: "#ffffff" }
        });
      }
    }).catch(() => {
    });
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "rounded-lg",
      "aria-label": "Emergency QR Code"
    }
  );
}
function PatientDashboardPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    isFetched,
    error,
    refetch
  } = usePatientProfile();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, children: "Login with Internet Identity" })
    ] }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingSpinner,
      {
        size: "lg",
        label: "Loading your profile...",
        "data-ocid": "dashboard.loading_state"
      }
    ) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorCard,
      {
        title: "Failed to load profile",
        message: "Could not load your medical profile.",
        onRetry: () => refetch()
      }
    ) });
  }
  if (isFetched && !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Activity,
        title: "No Profile Found",
        description: "Create your emergency medical identity to get started.",
        action: {
          label: "Register Now",
          onClick: () => navigate({ to: "/patient/register" })
        }
      }
    ) });
  }
  if (!profile) return null;
  const emergencyUrl = `${window.location.origin}/emergency/${profile.emergencyId}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Emergency Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
              "Emergency ID:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: profile.emergencyId })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/patient/profile/edit" }),
              "data-ocid": "dashboard.edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-1.5" }),
                "Edit Profile"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 py-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-primary-foreground", children: "Patient Emergency Card" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 flex flex-col sm:flex-row gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              profile.profilePhotoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: profile.profilePhotoUrl,
                  alt: profile.name,
                  className: "w-16 h-16 rounded-xl object-cover border-2 border-border"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-muted-foreground", children: profile.name[0] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground", children: profile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Age: ",
                  profile.age.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
                  "ID: #",
                  profile.id.toString()
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalBadge, { bloodGroup: profile.bloodGroup, size: "lg" }),
              profile.allergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 px-3 py-1.5 rounded bg-accent/10 border border-accent/30 emergency-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-accent font-semibold uppercase tracking-wide", children: "Allergies" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent", children: profile.allergies.join(", ") })
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-border shadow-elevated p-6 flex flex-col items-center gap-4",
              "data-ocid": "dashboard.qr_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground w-full flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary" }),
                  "Emergency QR Code"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-background rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeDisplay, { value: emergencyUrl }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Hospital staff can scan this code to instantly access your emergency medical information." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      const link = document.createElement("a");
                      const canvas = document.querySelector("canvas");
                      if (canvas) {
                        link.download = `medvault-emergency-${profile.emergencyId}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                      }
                    },
                    "data-ocid": "dashboard.download_qr_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Download QR Code"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            profile.chronicDiseases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-foreground flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
                "Chronic Conditions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: profile.chronicDiseases.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-muted px-2 py-0.5 rounded-full text-foreground",
                  children: d
                },
                `disease-${d}`
              )) })
            ] }),
            profile.currentMedications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-foreground flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "w-4 h-4 text-primary" }),
                "Current Medications"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: profile.currentMedications.map((med) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-sm flex justify-between",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: med.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                      med.dosage,
                      " · ",
                      med.frequency
                    ] })
                  ]
                },
                `med-${med.name}`
              )) })
            ] }),
            profile.emergencyContacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-foreground flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
                "Emergency Contacts"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: profile.emergencyContacts.map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: contact.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-1", children: [
                        "(",
                        contact.relationship,
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: `tel:${contact.phone}`,
                        className: "text-primary hover:underline text-xs font-mono",
                        children: contact.phone
                      }
                    )
                  ]
                },
                `contact-${contact.phone}`
              )) })
            ] })
          ] })
        ] }),
        profile.insuranceProvider && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-foreground mb-2", children: "Insurance Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Provider: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.insuranceProvider })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Policy: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: profile.insurancePolicyNumber })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  PatientDashboardPage as default
};
