import { EmptyState } from '@/components/empty-state';

export default function ParentPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Parent Portal</h1>
      <p className="text-slate-600">Monitor child attendance, performance, events, and notices.</p>
      <EmptyState title="No unresolved concerns" description="Submitted feedback and query status will appear here." />
    </div>
  );
}
