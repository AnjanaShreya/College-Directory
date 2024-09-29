// ===============================================notification panel=======================================//
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
            <td><button onclick="deleteNotification(${notification.id})">Delete</button></td>
        `;
        notificationTable.appendChild(row);
    });
}

async function addNotification() {
    const messageInput = document.getElementById('notificationMessage');
    const userRoleSelect = document.getElementById('userRole'); // Get the user role from your dropdown

    if (!messageInput || !userRoleSelect) {
        console.error('Message input or user role select element not found.');
        return;
    }

    const message = messageInput.value.trim();
    const userRole = userRoleSelect.value; 

    if (!message) {
        console.error('Notification message is empty.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, userRole }),
        });
        if (!response.ok) {
            throw new Error('Failed to add notification');
        }
        const newNotification = await response.json();
        fetchNotifications(userRole); // Refresh notifications after adding
        messageInput.value = ''; // Clear input after adding
    } catch (error) {
        console.error('Failed to add notification:', error);
    }
}

async function deleteNotification(id) {
    try {
        const response = await fetch(`http://localhost:3000/notifications/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete notification');
        }
        // Assuming userRole is known or set somewhere in your code
        const userRole = 'faculty'; // Change as needed based on the context
        fetchNotifications(userRole); // Refresh notifications for faculty or student
    } catch (error) {
        console.error('Failed to delete notification:', error);
    }
}

// Call fetchNotifications for the appropriate role when loading the dashboard
fetchNotifications('faculty'); // or 'student'

// ===============================student and faculty====================================//

// Function to add faculty and update the faculty table
async function addFaculty() {
    // Fetch input values
    const name = document.getElementById('facultyName').value;
    const subject = document.getElementById('facultySubject').value;
    const email = document.getElementById('facultyEmail').value;

    // Validation
    if (name === '' || subject === '' || email === '') {
        alert('Please fill all the fields');
        return;
    }

    // API call to add faculty
    try {
        const response = await fetch('http://localhost:3000/add-faculty', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, subject, email }),
        });

        if (!response.ok) {
            throw new Error('Failed to add faculty');
        }

        // Clear the form
        document.getElementById('facultyName').value = '';
        document.getElementById('facultySubject').value = '';
        document.getElementById('facultyEmail').value = '';

        // Fetch and display updated faculty list
        fetchFacultyList();
    } catch (err) {
        console.error(err);
        alert('Error adding faculty');
    }
}

// Function to fetch and display the updated faculty list
async function fetchFacultyList() {
    try {
        const response = await fetch('http://localhost:3000/faculty');
        if (!response.ok) {
            throw new Error('Failed to fetch faculty list');
        }
        const facultyList = await response.json();

        // Populate the faculty table
        const facultyTableBody = document.querySelector('#facultyTable tbody');
        facultyTableBody.innerHTML = '';  // Clear existing rows

        facultyList.forEach(faculty => {
            const row = `<tr>
                <td>${faculty.name}</td>
                <td>${faculty.subject}</td>
                <td>${faculty.email}</td>
                <td><button class="btn btn-danger" onclick="deleteFaculty(${faculty.id})">Delete</button></td>
            </tr>`;
            facultyTableBody.innerHTML += row;
        });
    } catch (err) {
        console.error(err);
        alert('Error fetching faculty list');
    }
}

// Function to add student and update the student table
async function addStudent() {
    // Fetch input values
    const name = document.getElementById('studentName').value;
    const course = document.getElementById('studentCourse').value;
    const email = document.getElementById('studentEmail').value;

    // Validation
    if (name === '' || course === '' || email === '') {
        alert('Please fill all the fields');
        return;
    }

    // API call to add student
    try {
        const response = await fetch('http://localhost:3000/add-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, course, email }),
        });

        if (!response.ok) {
            throw new Error('Failed to add student');
        }

        // Clear the form
        document.getElementById('studentName').value = '';
        document.getElementById('studentCourse').value = '';
        document.getElementById('studentEmail').value = '';

        // Fetch and display updated student list
        fetchStudentList();
    } catch (err) {
        console.error(err);
        alert('Error adding student');
    }
}

// Function to fetch and display the updated student list
async function fetchStudentList() {
    try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
            throw new Error('Failed to fetch student list');
        }
        const studentList = await response.json();

        // Populate the student table
        const studentTableBody = document.querySelector('#studentTable tbody');
        studentTableBody.innerHTML = '';  // Clear existing rows

        studentList.forEach(student => {
            const row = `<tr>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td><button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button></td>
            </tr>`;
            studentTableBody.innerHTML += row;
        });
    } catch (err) {
        console.error(err);
        alert('Error fetching student list');
    }
}

// Fetch initial data when the page loads
window.onload = function () {
    showSection('Dashboard'); // Default section to show
    fetchFacultyList();        // Fetch and display faculty data
    fetchStudentList();        // Fetch and display student data
};

// Optional: You can also add delete functionality
async function deleteFaculty(facultyId) {
    try {
        const response = await fetch(`http://localhost:3000/faculty/${facultyId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete faculty');
        }
        fetchFacultyList(); // Refresh the faculty list after deletion
    } catch (err) {
        console.error(err);
        alert('Error deleting faculty');
    }
}

async function deleteStudent(studentId) {
    try {
        const response = await fetch(`http://localhost:3000/students/${studentId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
        fetchStudentList(); // Refresh the student list after deletion
    } catch (err) {
        console.error(err);
        alert('Error deleting student');
    }
}

// ==================================profile========================================//
async function updateProfile() {
    // Fetch input values
    const name = document.getElementById('profileName').value;
    const gender = document.querySelector('input[name="gender"]:checked').value; // Assuming you have radio buttons for gender
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const profilePhoto = document.getElementById('profilePhoto').value; // File input for the profile photo

    // Validation
    if (name === '' || email === '' || phone === '' || !gender) {
        alert('Please fill all the fields');
        return;
    }

    // Create form data to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('profile_photo', profilePhoto); // Assuming you will handle file upload

    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PUT',
            body: formData, // Use FormData for file upload
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        // Optionally refresh or display the updated profile
        alert('Profile updated successfully!');
    } catch (error) {
        console.error(error);
        alert('Error updating profile: ' + error.message);
    }
}
