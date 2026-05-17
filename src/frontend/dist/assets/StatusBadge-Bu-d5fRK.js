import { c as createLucideIcon, D as DoctorStatus, j as jsxRuntimeExports, e as cn } from "./index-1WRhTf4i.js";
import { T as TriangleAlert } from "./triangle-alert-DRjbu9A_.js";
import { C as Clock } from "./clock-BocBxEPW.js";
import { C as CircleCheckBig } from "./circle-check-big-CiF-9UmZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const STATUS_CONFIG = {
  [DoctorStatus.approved]: {
    label: "Approved",
    icon: CircleCheckBig,
    className: "bg-[oklch(0.92_0.06_142)] text-[oklch(0.35_0.12_142)] border border-[oklch(0.75_0.12_142)]"
  },
  [DoctorStatus.pending]: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-[oklch(0.95_0.06_75)] text-[oklch(0.4_0.12_75)] border border-[oklch(0.78_0.12_75)]"
  },
  [DoctorStatus.rejected]: {
    label: "Rejected",
    icon: CircleX,
    className: "bg-accent/10 text-accent border border-accent/30"
  },
  [DoctorStatus.suspended]: {
    label: "Suspended",
    icon: TriangleAlert,
    className: "bg-muted text-muted-foreground border border-border"
  }
};
function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG[DoctorStatus.pending];
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
        config.className,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
        config.label
      ]
    }
  );
}
export {
  CircleX as C,
  StatusBadge as S
};
