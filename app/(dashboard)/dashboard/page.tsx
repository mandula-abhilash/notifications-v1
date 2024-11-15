"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationList } from "@/components/notifications/notification-list";
import { SubscriptionStatus } from "@/components/subscription/subscription-status";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Implement WebSocket connection
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationList notifications={notifications} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriptionStatus />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}