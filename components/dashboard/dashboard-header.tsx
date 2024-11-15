import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Notification System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span>{session?.user?.email}</span>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}