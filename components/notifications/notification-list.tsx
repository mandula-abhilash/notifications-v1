import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/types/notification";

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No notifications yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}