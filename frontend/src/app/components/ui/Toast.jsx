"use client";

import { useNotification } from "../../context/NotificationContext";

export const Toast = ({ notification, onClose }) => {
    const types = {
        success: {
            bg: "bg-green-500",
            icon: "✓",
        },
        error: {
            bg: "bg-red-500",
            icon: "✕",
        },
        info: {
            bg: "bg-blue-500",
            icon: "ℹ",
        },
        warning: {
            bg: "bg-yellow-500",
            icon: "⚠",
        },
    };

    const { bg, icon } = types[notification.type] || types.info;

    return (
        <div
            className={`${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-in fade-in slide-in-from-right-4 duration-300`}
        >
            <span className="text-xl font-bold">{icon}</span>
            <span className="flex-1 text-sm">{notification.message}</span>
            <button
                onClick={onClose}
                className="ml-2 text-lg font-bold hover:opacity-80 transition-opacity"
            >
                ×
            </button>
        </div>
    );
};

export const ToastContainer = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
            {notifications.map((notification) => (
                <div key={notification.id} className="pointer-events-auto">
                    <Toast
                        notification={notification}
                        onClose={() => removeNotification(notification.id)}
                    />
                </div>
            ))}
        </div>
    );
};
