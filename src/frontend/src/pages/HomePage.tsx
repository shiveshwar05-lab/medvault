import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Heart,
  Lock,
  QrCode,
  Shield,
  Stethoscope,
  UserPlus,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: UserPlus,
    title: "Patient Registration",
    description:
      "Securely store your blood group, allergies, medications, emergency contacts, and insurance — all in one encrypted profile.",
    color: "bg-primary/10 text-primary",
    href: "/patient/register",
    cta: "Register as Patient",
  },
  {
    icon: QrCode,
    title: "Emergency QR Identity",
    description:
      "Generate your personal emergency QR code. Hospital staff can scan it to instantly retrieve your critical medical information.",
    color: "bg-accent/10 text-accent",
    href: "/patient/dashboard",
    cta: "Generate My QR Code",
  },
  {
    icon: Stethoscope,
    title: "Doctor Access Portal",
    description:
      "Medical professionals submit credentials for admin approval. Once approved, securely access patient emergency data in seconds.",
    color: "bg-[oklch(0.92_0.06_142)] text-[oklch(0.35_0.12_142)]",
    href: "/doctor/register",
    cta: "Apply as Doctor",
  },
];

const SAFETY_ITEMS = [
  { icon: Lock, text: "End-to-end encrypted medical data storage" },
  { icon: Shield, text: "Role-based access: admin approves every doctor" },
  { icon: CheckCircle, text: "All data access is logged and audited" },
  { icon: Zap, text: "Instant QR scan — zero login required in emergencies" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-primary"
        data-ocid="home.hero_section"
      >
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-medvault.dim_1200x600.jpg)",
          }}
        />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[oklch(0.30_0.14_262)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-medium mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-accent" />
            Emergency-Ready Medical Identity System
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Emergency Medical Identity
            <span className="block text-accent mt-1">in Your Pocket</span>
          </h1>

          <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            When every second counts, MedVault gives doctors instant access to
            your critical medical history — blood group, allergies, medications
            — through a simple QR code scan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {isAuthenticated ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate({ to: "/patient/dashboard" })}
                className="min-w-[180px]"
                data-ocid="home.go_to_dashboard_button"
              >
                <Shield className="w-4 h-4 mr-2" />
                My Emergency Profile
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={login}
                className="min-w-[180px]"
                data-ocid="home.register_patient_button"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register as Patient
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: "/doctor/register" })}
              className="min-w-[180px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              data-ocid="home.register_doctor_button"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Register as Doctor
            </Button>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-60">
            <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-primary-foreground/60" />
            </div>
            <span className="text-xs text-primary-foreground/60">
              scroll down
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-background py-20 px-4"
        data-ocid="home.features_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground">
              How MedVault Works
            </h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              Three steps to protect your life in any emergency
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-subtle hover:shadow-elevated transition-smooth group"
                  data-ocid={`home.feature_card.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="self-start mt-auto"
                    onClick={() => navigate({ to: feature.href as "/" })}
                    data-ocid={`home.feature_cta.${i + 1}`}
                  >
                    {feature.cta} →
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Flow */}
      <section className="bg-muted/30 py-20 px-4 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Emergency Scenario
            </h2>
            <p className="text-muted-foreground mt-3">
              How MedVault saves lives in seconds
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Emergency",
                desc: "Patient is unconscious or unable to communicate",
                icon: "🚨",
              },
              {
                step: "2",
                title: "QR Scan",
                desc: "Doctor scans QR code on patient wristband or phone",
                icon: "📱",
              },
              {
                step: "3",
                title: "Instant Access",
                desc: "Critical data appears: blood group, allergies, medications",
                icon: "⚡",
              },
              {
                step: "4",
                title: "Safe Treatment",
                desc: "Doctor makes faster, safer treatment decisions",
                icon: "💊",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-card rounded-2xl border border-border p-5 text-center h-full shadow-subtle">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mx-auto mb-2">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                Security-First Design
              </h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Your medical data is among the most sensitive information that
                exists. MedVault is built with security as the foundation, not
                an afterthought.
              </p>
              <ul className="mt-6 space-y-3">
                {SAFETY_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 shadow-elevated">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Ready for Any Emergency
                </h3>
                <p className="text-muted-foreground text-sm mt-3 mb-6">
                  Create your emergency identity today. A QR code that could
                  save your life is just minutes away.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={
                    isAuthenticated
                      ? () => navigate({ to: "/patient/dashboard" })
                      : login
                  }
                  data-ocid="home.cta_button"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {isAuthenticated ? "View My Profile" : "Get Started Free"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
