'use client';
import React from 'react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead?: (id: number) => void;
}

export default function Notifications({ notifications, onMarkAsRead }: NotificationsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4">
        🔔 Notifications {unreadCount > 0 && <span className="text-sm bg-red-500 text-white rounded-full px-2">({unreadCount})</span>}
      </h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 italic">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border-l-4 flex justify-between items-center ${
                notification.read
                  ? 'bg-gray-50 border-gray-300'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <p className={notification.read ? 'text-gray-700' : 'text-gray-900 font-semibold'}>
                {notification.message}
              </p>
              {!notification.read && onMarkAsRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
