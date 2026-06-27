import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <header className="page-title">
          <div>
            <p>Roweder Disk Gás</p>
            <h1>{title}</h1>
            {subtitle && <span>{subtitle}</span>}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
