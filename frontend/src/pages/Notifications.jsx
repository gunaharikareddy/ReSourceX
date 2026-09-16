
import { useEffect, useState } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/notifications"
            );

            const result = await response.json();

            if (result.success) {
                setNotifications(result.data);
            }
        } catch (error) {
            console.error(
                "Error fetching notifications:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/notifications/${id}/read`,
                {
                    method: "PATCH"
                }
            );

            const result = await response.json();

            if (result.success) {
                setNotifications((previousNotifications) =>
                    previousNotifications.map(
                        (notification) =>
                            notification._id === id
                                ? {
                                      ...notification,
                                      read: true
                                  }
                                : notification
                    )
                );
            }
        } catch (error) {
            console.error(
                "Error marking notification as read:",
                error
            );
        }
    };

    const deleteNotification = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/notifications/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (result.success) {
                setNotifications((previousNotifications) =>
                    previousNotifications.filter(
                        (notification) =>
                            notification._id !== id
                    )
                );
            }
        } catch (error) {
            console.error(
                "Error deleting notification:",
                error
            );
        }
    };

    if (loading) {
        return (
            <section>
                <h2>Notifications</h2>
                <p>Loading notifications...</p>
            </section>
        );
    }

    return (
        <section>
            <h2>Notifications</h2>

            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                notifications.map((notification) => (
                    <div
                        key={notification._id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>
                            {notification.title}
                        </h3>

                        <p>
                            {notification.message}
                        </p>

                        <p>
                            <strong>Type:</strong>{" "}
                            {notification.type}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {notification.read
                                ? "Read"
                                : "Unread"}
                        </p>

                        <small>
                            {new Date(
                                notification.createdAt
                            ).toLocaleString()}
                        </small>

                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                gap: "10px"
                            }}
                        >
                            {!notification.read && (
                                <button
                                    onClick={() =>
                                        markAsRead(
                                            notification._id
                                        )
                                    }
                                >
                                    Mark as Read
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    deleteNotification(
                                        notification._id
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}

export default Notifications;

