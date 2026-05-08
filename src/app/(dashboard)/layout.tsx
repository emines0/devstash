import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border px-4">
        <span className="text-sm font-semibold tracking-tight">DevStash</span>

        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search items..."
              className="h-8 pl-3 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            New Collection
          </Button>
          <Button size="sm">
            <Plus />
            New Item
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
