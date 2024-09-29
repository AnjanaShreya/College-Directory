// Function to show the selected section and hide others
function showSection(sectionId) {
    var sections = document.getElementsByClassName('content-section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none'; 
    }
    document.getElementById(sectionId).style.display = 'block'; 
}

// Function to toggle sidebar collapse
function toggleSidebar() {
    var sidebar = document.querySelector('.navbar-primary');
    var content = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
}
