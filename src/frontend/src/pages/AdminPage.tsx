import { DoctorStatus } from "@/backend";
import type { DoctorProfile } from "@/backend";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAccessLogs,
  useAdminStats,
  useAllDoctors,
  useApproveDoctor,
  usePendingDoctorRequests,
  useRejectDoctor,
  useSuspendDoctor,
} from "@/hooks/useAdminStats";
import { useAuth } from "@/hooks/useAuth";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pause,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 shadow-subtle">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: pendingRequests, isLoading: pendingLoading } =
    usePendingDoctorRequests();
  const { data: allDoctors, isLoading: doctorsLoading } = useAllDoctors();
  const { data: accessLogs, isLoading: logsLoading } = useAccessLogs();
  const approveDoctor = useApproveDoctor();
  const rejectDoctor = useRejectDoctor();
  const suspendDoctor = useSuspendDoctor();

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    doctorId: bigint | null;
    name: string;
  }>({
    open: false,
    doctorId: null,
    name: "",
  });
  const [rejectReason, setRejectReason] = useState("");

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
          <p className="text-muted-foreground text-sm">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  async function handleApprove(doctorId: bigint, name: string) {
    try {
      await approveDoctor.mutateAsync(doctorId);
      toast.success(`Dr. ${name} approved successfully`);
    } catch {
      toast.error("Failed to approve doctor");
    }
  }

  async function handleRejectConfirm() {
    if (!rejectDialog.doctorId) return;
    try {
      await rejectDoctor.mutateAsync({
        doctorId: rejectDialog.doctorId,
        reason: rejectReason,
      });
      toast.success(`Dr. ${rejectDialog.name} request rejected`);
      setRejectDialog({ open: false, doctorId: null, name: "" });
      setRejectReason("");
    } catch {
      toast.error("Failed to reject doctor");
    }
  }

  async function handleSuspend(doctorId: bigint, name: string) {
    try {
      await suspendDoctor.mutateAsync(doctorId);
      toast.success(`Dr. ${name} suspended`);
    } catch {
      toast.error("Failed to suspend doctor");
    }
  }

  const formatTime = (ts: bigint) => {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleDateString();
  };

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 space-y-6"
      data-ocid="admin.page"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            MedVault system management & doctor approvals
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/30 text-primary bg-primary/5"
        >
          🛡 Admin
        </Badge>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner label="Loading stats..." />
        </div>
      ) : (
        stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Patients"
              value={stats.totalPatients.toString()}
              icon={Users}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              label="Total Doctors"
              value={stats.totalDoctors.toString()}
              icon={Activity}
              color="bg-[oklch(0.92_0.06_142)] text-[oklch(0.35_0.12_142)]"
            />
            <StatCard
              label="Pending Approvals"
              value={stats.pendingRequests.toString()}
              icon={Clock}
              color="bg-[oklch(0.95_0.06_75)] text-[oklch(0.4_0.12_75)]"
            />
            <StatCard
              label="Access Logs"
              value={stats.totalAccessLogs.toString()}
              icon={Shield}
              color="bg-muted text-muted-foreground"
            />
          </div>
        )
      )}

      <Tabs defaultValue="pending" data-ocid="admin.tabs">
        <TabsList>
          <TabsTrigger value="pending" data-ocid="admin.pending_tab">
            Pending Approvals
            {pendingRequests && pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="doctors" data-ocid="admin.doctors_tab">
            All Doctors
          </TabsTrigger>
          <TabsTrigger value="logs" data-ocid="admin.logs_tab">
            Access Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pendingLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner label="Loading requests..." />
            </div>
          ) : !pendingRequests?.length ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 text-[oklch(0.55_0.15_142)]" />
              <p>No pending doctor requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((doc: DoctorProfile, i: number) => (
                <div
                  key={doc.id.toString()}
                  className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  data-ocid={`admin.pending_request.${i + 1}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {doc.name}
                      </h3>
                      <StatusBadge status={doc.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {doc.specialty} · {doc.hospitalName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {doc.email} · License: {doc.licenseNumber}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(doc.id, doc.name)}
                      disabled={approveDoctor.isPending}
                      data-ocid={`admin.approve_button.${i + 1}`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setRejectDialog({
                          open: true,
                          doctorId: doc.id,
                          name: doc.name,
                        })
                      }
                      data-ocid={`admin.reject_button.${i + 1}`}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="doctors" className="mt-4">
          {doctorsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-3">
              {(allDoctors ?? []).map((doc: DoctorProfile, i: number) => (
                <div
                  key={doc.id.toString()}
                  className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  data-ocid={`admin.doctor_item.${i + 1}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {doc.name}
                      </h3>
                      <StatusBadge status={doc.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.specialty} · {doc.hospitalName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {doc.status === DoctorStatus.approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuspend(doc.id, doc.name)}
                        disabled={suspendDoctor.isPending}
                        data-ocid={`admin.suspend_button.${i + 1}`}
                      >
                        <Pause className="w-3.5 h-3.5 mr-1" />
                        Suspend
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          {logsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Log ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Doctor ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Patient ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(accessLogs ?? []).length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-muted-foreground"
                      >
                        No access logs yet
                      </td>
                    </tr>
                  ) : (
                    (accessLogs ?? []).map((log, i) => (
                      <tr
                        key={log.id.toString()}
                        data-ocid={`admin.log_item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs">
                          {log.id.toString()}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">
                          {log.doctorId.toString()}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">
                          {log.patientId.toString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">
                            {String(log.accessType)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                          {formatTime(log.accessedAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog
        open={rejectDialog.open}
        onOpenChange={(open) => setRejectDialog((d) => ({ ...d, open }))}
      >
        <DialogContent data-ocid="admin.reject_dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Reject Doctor Request
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Rejecting {rejectDialog.name}'s registration request.
          </p>
          <div>
            <Label>Rejection Reason *</Label>
            <Textarea
              rows={3}
              placeholder="Provide a reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              data-ocid="admin.reject_reason_input"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setRejectDialog({ open: false, doctorId: null, name: "" })
              }
              data-ocid="admin.reject_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim() || rejectDoctor.isPending}
              data-ocid="admin.reject_confirm_button"
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
