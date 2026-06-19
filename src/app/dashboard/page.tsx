import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ServersTable } from "@/components/servers-table"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function fetchWithAuth(url: string, token: string | undefined) {
  if (!token) return null;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await fetchWithAuth("http://127.0.0.1:8000/api/auth/me", token);
  if (!user) {
    redirect("/login");
  }

  const servers = await fetchWithAuth("http://127.0.0.1:8000/api/servers", token) || [];

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2 p-4 md:p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.is_admin ? "Admin Dashboard" : "Your Servers"}
              </h1>
              <p className="text-muted-foreground">
                {user.is_admin ? "Manage all nodes and assign servers to users." : "Manage your active game servers and applications."}
              </p>
            </div>
            
            {user.is_admin && (
              <div className="mb-6 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Admin Tools (Coming Soon)</p>
                <p>As an administrator, you have access to create Nodes, provision new containers on Wings, and assign them directly to user emails. For now, use the Swagger API documentation (<code>http://localhost:8000/docs</code>) to create servers and assign them to users via email.</p>
              </div>
            )}
            
            <ServersTable servers={servers} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
