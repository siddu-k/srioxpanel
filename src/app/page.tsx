import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden bg-background">
      {/* Background glowing effects for glassmorphism aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-chart-1/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
          Sriox Panel
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground mx-auto">
          Modern, open-source game and application hosting panel.
        </p>
      </div>

      <Card className="w-full max-w-md bg-card/40 backdrop-blur-xl border-border/50">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to manage your servers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            <Button asChild className="w-full" size="lg">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
