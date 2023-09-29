/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});




// Make an HTTP GET request to fetch user data
// fetch('http://127.0.0.1:8000/api/users')
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json(); // Parse the JSON response
// })
// .then(data => {
//     // Use the JSON data to populate the table
//     populateTable(data);
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });

// // Function to populate the table with data
// function populateTable(userData) {
// var tableBody = document.getElementById("tableBody");
// for (var i = 0; i < userData.length; i++) {
//     var data = userData[i];
//     var row = tableBody.insertRow(i);
//     var fieldsToDisplay = ["firstname", "lastname", "email", "phone", "matricule"];
//     for (var j = 0; j < fieldsToDisplay.length; j++) {
//         var fieldName = fieldsToDisplay[j];
//         var cell = row.insertCell(j);
//         cell.innerHTML = data[fieldName];
//     }
//     // Add an action column here, if needed
//     var actionCell = row.insertCell(fieldsToDisplay.length);
//     actionCell.innerHTML = '<button>Edit</button> <button>Delete</button>';
// }
// }

// Replace 'http://127.0.0.1:8000/api/users' with your actual API URL
const apiUrl = 'http://127.0.0.1:8000/api/users';

// Get the search input element
const searchInput = document.getElementById('searchInput');
const addButton = document.getElementById('addButton');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const userDataTbody = document.getElementById('userData');
        // Assuming the API returns an array of user objects
        let filteredData = data; // Initially, show all data

        // Function to update the table based on the search input
        const updateTable = () => {
            userDataTbody.innerHTML = ''; // Clear the table body

            // Filter data based on the search input
            const searchText = searchInput.value.trim().toLowerCase();
            filteredData = data.filter(user => {
                const { firstname, lastname, mat_number, email } = user;
                return (
                    firstname.toLowerCase().includes(searchText) ||
                    lastname.toLowerCase().includes(searchText) ||
                    mat_number.toLowerCase().includes(searchText) ||
                    email.toLowerCase().includes(searchText)
                );
            });

            filteredData.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.mat_number}</td>
                    <td>
                        <button onclick="updateUser(${user.id})">Update</button>
                        <button onclick="deleteUser('${user.mat_number}')" class="delete">Delete</button>

                    </td>
                `;
                userDataTbody.appendChild(row);
            });
        };

        // Listen for changes in the search input
        searchInput.addEventListener('input', updateTable);

        // Add user button functionality (you can replace this with your own logic)
        addButton.addEventListener('click', () => {
            // Implement your logic for adding users here
            alert('You can implement user addition logic here.');
        });

        // Initial table update
        updateTable();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to handle user update
function updateUser(userId) {
    // Implement your logic for updating users here
    alert(`Update user with ID: ${userId}`);
}

function deleteUser(matNumber) {
const deleteUrl = `http://127.0.0.1:8000/api/users/${matNumber}`;

fetch(deleteUrl, {
method: 'DELETE',
headers: {
    'Content-Type': 'application/json', // Specify the content type if required
},
})
.then(response => {
if (response.ok) {
    // User deleted successfully, you can update the UI or take other actions
    alert(`User with Mat Number ${matNumber} has been deleted.`);
    // Refresh the table or update it as needed
    updateTable(); // This function updates the table
} else {
    // Handle error, e.g., show an error message
    alert(`Failed to delete user with Mat Number ${matNumber}.`);
}
})
.catch(error => {
console.error('Error deleting user:', error);
});
}
