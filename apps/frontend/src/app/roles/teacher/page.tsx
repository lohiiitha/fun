import { EmptyState } from '@/components/empty-state';

export default function TeacherPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teacher Workspace</h1>
      <p className="text-slate-600">Track attendance, publish results, and post notices.</p>
      <EmptyState title="No classes assigned" description="Assigned class sections will be listed here." />
    </div>
  );
}
