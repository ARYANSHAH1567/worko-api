$(document).ready(function() {
    // Fetch initial user list
    fetchUsers();

    // Handle form submission for adding a new user
    $('#addUserForm').submit(function(event) {
        event.preventDefault();

        const formData = {
            email: $('#email').val(),
            name: $('#name').val(),
            age: $('#age').val(),
            city: $('#city').val(),
            zipCode: $('#zipCode').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/worko/user', // Replace with your API endpoint
            headers: {
                'Authorization': 'Bearer <your_jwt_token>' // Replace with your JWT token
            },
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('User added:', response);
                fetchUsers(); // Refresh user list after adding
                $('#addUserForm')[0].reset(); // Clear form
            },
            error: function(error) {
                console.error('Error adding user:', error);
                alert('Failed to add user. Please try again.');
            }
        });
    });

    // Function to fetch and display users
    function fetchUsers() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/worko/user', // Replace with your API endpoint
            headers: {
                'Authorization': 'Bearer <your_jwt_token>' // Replace with your JWT token
            },
            success: function(users) {
                console.log('Users fetched:', users);

                $('#userList').empty();
                users.forEach(function(user) {
                    const userHtml = `<div class="user">
                        <span>Name: ${user.name}</span><br>
                        <span>Email: ${user.email}</span><br>
                        <span>Age: ${user.age}</span><br>
                        <span>City: ${user.city}</span><br>
                        <span>Zip Code: ${user.zipCode}</span><br>
                        <button class="deleteUserBtn" data-user-id="${user._id}">Delete</button>
                    </div>`;
                    $('#userList').append(userHtml);
                });

                // Add event listener for delete buttons
                $('.deleteUserBtn').click(function() {
                    const userId = $(this).data('user-id');
                    deleteUser(userId);
                });
            },
            error: function(error) {
                console.error('Error fetching users:', error);
                alert('Failed to fetch users. Please try again.');
            }
        });
    }

    // Function to delete a user
    function deleteUser(userId) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/worko/user/${userId}`, // Replace with your API endpoint
            headers: {
                'Authorization': 'Bearer <your_jwt_token>' // Replace with your JWT token
            },
            success: function(response) {
                console.log('User deleted:', response);
                fetchUsers(); // Refresh user list after deletion
            },
            error: function(error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        });
    }
});
