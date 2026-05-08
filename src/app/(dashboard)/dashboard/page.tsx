export default function DashboardPage() {
  return (
    <>
      <aside className="w-64 shrink-0 border-r border-border p-4">
        <h2 className="text-sm font-medium text-muted-foreground">Sidebar</h2>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-sm font-medium text-muted-foreground">Main</h2>
      </main>
    </>
  );
}
