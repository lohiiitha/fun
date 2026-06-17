import { LoadingSkeleton } from '@/components/loading-skeleton';
import { StatCard } from '@/components/stat-card';
import { stats } from '@/lib/constants';

export default function DashboardPage() {
  const isLoading = false;
  const hasData = true;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Analytics</h1>
      {isLoading ? <LoadingSkeleton /> : null}
      {!isLoading && hasData ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
