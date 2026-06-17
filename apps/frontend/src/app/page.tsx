import { StatCard } from '@/components/stat-card';
import { modules, stats } from '@/lib/constants';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 p-8 text-white">
        <p className="text-sm uppercase tracking-wider text-blue-100">Government School Management Portal</p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Transparent, fast, and inclusive school communication.</h1>
        <p className="mt-3 max-w-2xl text-blue-100">
          Centralized platform for announcements, attendance, results, events, admissions, and parent feedback.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">School Performance Snapshot</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Facilities & Achievements</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li>Smart classrooms, digital library, science labs, and sports complex.</li>
            <li>District-level academic excellence and sports awards.</li>
            <li>Dedicated faculty across all major departments.</li>
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Core Modules</h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            {modules.map((module) => (
              <li key={module} className="rounded bg-slate-100 px-3 py-2">{module}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p className="mt-2 text-slate-600">Email: info@govschool.example | Phone: +91 00000 00000</p>
        <p className="text-slate-600">Address: District Education Campus, Main Road, India</p>
      </section>
    </div>
  );
}
