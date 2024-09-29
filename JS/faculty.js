async function fetchNotifications(role) {
    try {
        const response = await fetch(`http://localhost:3000/notifications/${role}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const notifications = await response.json();
        displayNotifications(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

function displayNotifications(notifications) {
    const notificationTable = document.getElementById('notificationTableBody');
    notificationTable.innerHTML = ''; // Clear existing notifications

    notifications.forEach(notification => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${notification.message}</td>
            <td>${new Date(notification.created_at).toLocaleString()}</td>
        `;
        notificationTable.appendChild(row);
    });
}

async function deleteNotification(id) {
    try {
        const response = await fetch(`http://localhost:3000/notifications/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete notification');
        }
        fetchNotifications('faculty'); // Refresh notifications for faculty
    } catch (error) {
        console.error('Failed to delete notification:', error);
    }
}

// Fetch notifications when loading the Dashboard
fetchNotifications('faculty');
