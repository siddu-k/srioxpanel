import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ServersTable } from "@/components/servers-table"

async function getServers() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/servers', { 
      cache: 'no-store' 
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch servers", error);
    return [];
  }
}

export default async function Page() {
  const servers = await getServers();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2 p-4 md:p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Your Servers</h1>
              <p className="text-muted-foreground">
                Manage your active game servers and applications.
              </p>
            </div>
            
            <ServersTable servers={servers} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
