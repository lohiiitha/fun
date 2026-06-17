import { EmptyState } from '@/components/empty-state';

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Console</h1>
      <p className="text-slate-600">Manage users, notices, admissions, and institution-wide settings.</p>
      <EmptyState title="No pending approvals" description="Admission and staff approvals will appear here." />
    </div>
  );
}
