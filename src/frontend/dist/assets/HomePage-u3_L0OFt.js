import { c as createLucideIcon, u as useNavigate, a as useAuth, j as jsxRuntimeExports, B as Button, S as Shield, b as Stethoscope, H as Heart } from "./index-1WRhTf4i.js";
import { T as TriangleAlert } from "./triangle-alert-DRjbu9A_.js";
import { Q as QrCode } from "./qr-code-BfCRU2Mv.js";
import { L as Lock } from "./lock-DeKfpwAM.js";
import { C as CircleCheckBig } from "./circle-check-big-CiF-9UmZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  {
    icon: UserPlus,
    title: "Patient Registration",
    description: "Securely store your blood group, allergies, medications, emergency contacts, and insurance — all in one encrypted profile.",
    color: "bg-primary/10 text-primary",
    href: "/patient/register",
    cta: "Register as Patient"
  },
  {
    icon: QrCode,
    title: "Emergency QR Identity",
    description: "Generate your personal emergency QR code. Hospital staff can scan it to instantly retrieve your critical medical information.",
    color: "bg-accent/10 text-accent",
    href: "/patient/dashboard",
    cta: "Generate My QR Code"
  },
  {
    icon: Stethoscope,
    title: "Doctor Access Portal",
    description: "Medical professionals submit credentials for admin approval. Once approved, securely access patient emergency data in seconds.",
    color: "bg-[oklch(0.92_0.06_142)] text-[oklch(0.35_0.12_142)]",
    href: "/doctor/register",
    cta: "Apply as Doctor"
  }
];
const SAFETY_ITEMS = [
  { icon: Lock, text: "End-to-end encrypted medical data storage" },
  { icon: Shield, text: "Role-based access: admin approves every doctor" },
  { icon: CircleCheckBig, text: "All data access is logged and audited" },
  { icon: Zap, text: "Instant QR scan — zero login required in emergencies" }
];
function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-primary",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center opacity-20",
              style: {
                backgroundImage: "url(/assets/generated/hero-medvault.dim_1200x600.jpg)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[oklch(0.30_0.14_262)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-medium mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-accent" }),
              "Emergency-Ready Medical Identity System"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6", children: [
              "Emergency Medical Identity",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-accent mt-1", children: "in Your Pocket" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed", children: "When every second counts, MedVault gives doctors instant access to your critical medical history — blood group, allergies, medications — through a simple QR code scan." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
              isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "secondary",
                  onClick: () => navigate({ to: "/patient/dashboard" }),
                  className: "min-w-[180px]",
                  "data-ocid": "home.go_to_dashboard_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
                    "My Emergency Profile"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "secondary",
                  onClick: login,
                  className: "min-w-[180px]",
                  "data-ocid": "home.register_patient_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
                    "Register as Patient"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  onClick: () => navigate({ to: "/doctor/register" }),
                  className: "min-w-[180px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
                  "data-ocid": "home.register_doctor_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-4 h-4 mr-2" }),
                    "Register as Doctor"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center gap-2 animate-bounce opacity-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-2 rounded-full bg-primary-foreground/60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-foreground/60", children: "scroll down" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-20 px-4",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground", children: "How MedVault Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 text-lg max-w-xl mx-auto", children: "Three steps to protect your life in any emergency" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-subtle hover:shadow-elevated transition-smooth group",
                "data-ocid": `home.feature_card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-xl flex items-center justify-center ${feature.color}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                      "0",
                      i + 1
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg", children: feature.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: feature.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "self-start mt-auto",
                      onClick: () => navigate({ to: feature.href }),
                      "data-ocid": `home.feature_cta.${i + 1}`,
                      children: [
                        feature.cta,
                        " →"
                      ]
                    }
                  )
                ]
              },
              feature.title
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20 px-4 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground", children: "Emergency Scenario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: "How MedVault saves lives in seconds" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4", children: [
        {
          step: "1",
          title: "Emergency",
          desc: "Patient is unconscious or unable to communicate",
          icon: "🚨"
        },
        {
          step: "2",
          title: "QR Scan",
          desc: "Doctor scans QR code on patient wristband or phone",
          icon: "📱"
        },
        {
          step: "3",
          title: "Instant Access",
          desc: "Critical data appears: blood group, allergies, medications",
          icon: "⚡"
        },
        {
          step: "4",
          title: "Safe Treatment",
          desc: "Doctor makes faster, safer treatment decisions",
          icon: "💊"
        }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 text-center h-full shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mx-auto mb-2", children: item.step }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: item.desc })
        ] }),
        i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" })
      ] }, item.step)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground", children: "Security-First Design" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 leading-relaxed", children: "Your medical data is among the most sensitive information that exists. MedVault is built with security as the foundation, not an afterthought." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3", children: SAFETY_ITEMS.map((item) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: item.text })
          ] }, item.text);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-8 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground", children: "Ready for Any Emergency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-3 mb-6", children: "Create your emergency identity today. A QR code that could save your life is just minutes away." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "w-full",
            onClick: isAuthenticated ? () => navigate({ to: "/patient/dashboard" }) : login,
            "data-ocid": "home.cta_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 mr-2" }),
              isAuthenticated ? "View My Profile" : "Get Started Free"
            ]
          }
        )
      ] }) })
    ] }) }) })
  ] });
}
export {
  HomePage as default
};
