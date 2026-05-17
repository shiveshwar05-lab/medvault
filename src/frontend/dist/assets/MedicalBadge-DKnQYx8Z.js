import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, e as cn } from "./index-1WRhTf4i.js";
import { T as TriangleAlert } from "./triangle-alert-DRjbu9A_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
];
const Pill = createLucideIcon("pill", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function ErrorCard({
  title = "Something went wrong",
  message = "An error occurred while loading this content.",
  onRetry,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-4 p-8 rounded-xl border border-accent/30 bg-accent/5 text-center",
        className
      ),
      role: "alert",
      "data-ocid": "error.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: message })
        ] }),
        onRetry && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: onRetry, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
          "Try Again"
        ] })
      ]
    }
  );
}
const BLOOD_GROUP_COLORS = {
  "A+": "bg-accent text-accent-foreground",
  "A-": "bg-accent/80 text-accent-foreground",
  "B+": "bg-primary text-primary-foreground",
  "B-": "bg-primary/80 text-primary-foreground",
  "AB+": "bg-[oklch(0.45_0.18_280)] text-primary-foreground",
  "AB-": "bg-[oklch(0.5_0.16_280)] text-primary-foreground",
  "O+": "bg-[oklch(0.55_0.20_145)] text-primary-foreground",
  "O-": "bg-[oklch(0.48_0.18_145)] text-primary-foreground"
};
const SIZE_CLASSES = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2 font-bold"
};
function MedicalBadge({
  bloodGroup,
  className,
  size = "md"
}) {
  const colorClass = BLOOD_GROUP_COLORS[bloodGroup] ?? "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex flex-col items-center rounded font-mono font-semibold shadow-subtle select-none",
        colorClass,
        SIZE_CLASSES[size],
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest opacity-80", children: "Blood Group" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("tracking-wide", size === "lg" ? "text-xl" : ""), children: bloodGroup })
      ]
    }
  );
}
export {
  ErrorCard as E,
  MedicalBadge as M,
  Pill as P,
  Phone as a
};
