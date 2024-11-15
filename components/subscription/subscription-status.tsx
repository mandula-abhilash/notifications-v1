import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SubscriptionStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Current Plan</h3>
          <Badge>Pro</Badge>
        </div>
        <Button variant="outline">Manage</Button>
      </div>
      <Card className="p-4 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Next billing date</span>
            <span>May 1, 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </Card>
    </div>
  );
}