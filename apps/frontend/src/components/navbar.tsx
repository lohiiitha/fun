import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/roles/admin', label: 'Admin' },
  { href: '/roles/teacher', label: 'Teacher' },
  { href: '/roles/student', label: 'Student' },
  { href: '/roles/parent', label: 'Parent' }
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="font-semibold text-slate-800">Government School Portal</p>
        <ul className="flex flex-wrap gap-3 text-sm text-slate-600">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="rounded px-2 py-1 hover:bg-slate-100" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
