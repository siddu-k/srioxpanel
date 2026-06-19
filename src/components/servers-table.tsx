import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ServersTable({ servers }: { servers: any[] }) {
  if (!servers || servers.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        No servers found. Create one using the API!
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Server Name</TableHead>
            <TableHead>UUID</TableHead>
            <TableHead>Node ID</TableHead>
            <TableHead>Memory (MB)</TableHead>
            <TableHead>Disk (MB)</TableHead>
            <TableHead>CPU (%)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers.map((server) => (
            <TableRow key={server.id}>
              <TableCell className="font-medium">{server.name}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{server.uuid}</TableCell>
              <TableCell>{server.node_id}</TableCell>
              <TableCell>{server.memory}</TableCell>
              <TableCell>{server.disk}</TableCell>
              <TableCell>{server.cpu}</TableCell>
              <TableCell>
                <Badge variant={server.status === "running" ? "default" : "outline"} className="capitalize">
                  {server.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
