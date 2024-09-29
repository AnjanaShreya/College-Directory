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

// =====================================fetch students and faculty===================================//

async function fetchFaculty() {
    try {
        const response = await fetch('http://localhost:3000/faculty');
        if (!response.ok) {
            throw new Error('Failed to fetch faculty');
        }
        const facultyList = await response.json();
        displayFaculty(facultyList);
    } catch (error) {
        console.error('Error fetching faculty:', error);
    }
}

async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        const studentList = await response.json();
        displayStudents(studentList);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

function displayFaculty(facultyList) {
    const facultyTableBody = document.querySelector('#facultyList tbody');
    facultyTableBody.innerHTML = ''; // Clear existing data

    facultyList.forEach(faculty => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${faculty.name}</td>
            <td>${faculty.subject}</td>
            <td>${faculty.email}</td>
        `;
        facultyTableBody.appendChild(row);
    });
}

function displayStudents(studentList) {
    const studentTableBody = document.querySelector('#studentList tbody');
    studentTableBody.innerHTML = ''; // Clear existing data

    studentList.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Call these functions when the Search section is shown
function showSearchSection() {
    showSection('Search');
    fetchFaculty();   // Fetch faculty when showing the search section
    fetchStudents();  // Fetch students when showing the search section
}
