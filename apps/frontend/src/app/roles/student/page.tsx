import { EmptyState } from '@/components/empty-state';

export default function StudentPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p className="text-slate-600">View attendance, exam results, and announcements.</p>
      <EmptyState title="No new updates" description="Upcoming exams and attendance alerts will appear here." />
    </div>
  );
}
