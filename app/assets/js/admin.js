document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    document.getElementById('addUserForm').addEventListener('submit', addUser);
    document.getElementById('editUserForm').addEventListener('submit', editUser);
    document.getElementById('editInvoiceForm').addEventListener('submit', editInvoice);
    document.getElementById('searchUsersForm').addEventListener('submit', searchUsers);

    document.getElementById("editInvoiceImage").addEventListener("change", function(e) {
        if (e.target.value !== ""){
            const file = e.target.files[0];
            readFile(file, "editInvoicePreview");
        }
    });
});

let allUsers = [];
let invoiceSettings = [];

function getInvoiceSettings(){
    fetch(`/api/admin/invoice`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(invoice => {
        invoiceSettings = invoice;
    })
    .catch(error => console.error('Error:', error));
}

function loadUsers() {
    fetch('/api/users', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    })
    .then(response => response.json())
    .then(users => {
        allUsers = users;
        populateUsersTable(allUsers);
        getInvoiceSettings();
    })
    .catch(error => console.error('Error:', error));
}

function populateUsersTable(users) {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-truncate">${user.name}</td>
            <td>
                <div class="d-flex justify-content-center gap-1 h-25">
                    <button class="btn btn-sm btn-success text-truncate" style="width: 40%" onclick="openEditUserModal(${user.id}, '${user.name}')">Edit</button>
                    <button class="btn btn-sm btn-danger text-truncate" style="width: 40%" onclick="deleteUser(${user.id}, ${user.permissions.admin})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function searchUsers(e) {
    e.preventDefault();

    const searchQuery = document.getElementById('searchUsers').value.toLowerCase();
    const results = allUsers.filter(user => {
        searchResults = user.name.trim().toLowerCase().includes(searchQuery);
        return searchResults;
    });
    populateUsersTable(results);
}

function openEditInvoiceModal() {
    document.getElementById('editInvoiceImage').value = '';
    document.getElementById('editInvoicePreview').src = invoiceSettings.logo;
    document.getElementById('editInvoiceAddress').value = invoiceSettings.address;
    document.getElementById('editInvoiceContact1').value = invoiceSettings.contact1;
    document.getElementById('editInvoiceContact2').value = invoiceSettings.contact2;
    
    new bootstrap.Modal(document.getElementById('editInvoiceModal')).show();
}

async function editInvoice(e) {
    e.preventDefault();

    const imageFile = document.getElementById('editInvoiceImage').files[0];
    let logo;
    if (imageFile){
        logo = await uploadImage('PUT', 'logo', 'assets', imageFile);
    }
    else {
        logo = document.getElementById('editInvoicePreview').src;
    }

    formData = {
        'address': document.getElementById('editInvoiceAddress').value,
        'contact1': document.getElementById('editInvoiceContact1').value,
        'contact2': document.getElementById('editInvoiceContact2').value,
        'logo': logo
    }

    await fetch(`/api/admin/invoice`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        getInvoiceSettings();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editInvoiceModal'));
        modal.hide();
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function openAddUserModal() {
    document.getElementById('addUserForm').reset();
    document.getElementById('addUserName').className = 'form-control form-control-sm';
    document.getElementById('addUserPassword').className = 'form-control form-control-sm';
    document.getElementById('addUserConfirmPassword').className = 'form-control form-control-sm';
    new bootstrap.Modal(document.getElementById('addUserModal')).show();
}

function addUser(e) {
    e.preventDefault();

    name = document.getElementById('addUserName').value;
    password = document.getElementById('addUserPassword').value;
    confirmPassword = document.getElementById('addUserConfirmPassword').value;

    const matched = allUsers.filter(user => {
        matchesName = user.name.trim().includes(name);
        return matchesName;
    });
    if (matched.length > 0) {
        document.getElementById('addUserName').className = 'form-control form-control-sm is-invalid';
        return;
    }
    else {
        document.getElementById('addUserName').className = 'form-control form-control-sm is-valid';
    }

    if (password != '' && password != confirmPassword) {
        document.getElementById('addUserPassword').className = 'form-control form-control-sm is-invalid';
        document.getElementById('addUserConfirmPassword').className = 'form-control form-control-sm is-invalid';
        return;
    }
    else if (password == '' || confirmPassword == ''){
        document.getElementById('addUserPassword').className = 'form-control form-control-sm';
        document.getElementById('addUserConfirmPassword').className = 'form-control form-control-sm';
    }
    else {
        document.getElementById('addUserPassword').className = 'form-control form-control-sm is-valid';
        document.getElementById('addUserConfirmPassword').className = 'form-control form-control-sm is-valid';
    }

    formData = {
        'name': name,
        'password': password,
        'dashboard': document.getElementById('addUserDashboard').checked,
        'products': document.getElementById('addUserProducts').checked,
        'checkout': document.getElementById('addUserCheckout').checked,
        'history': document.getElementById('addUserHistory').checked,
    };
    
    fetch(`/api/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        loadUsers();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function openEditUserModal(id, name) {
    document.getElementById('editUserForm').reset();
    document.getElementById('editUserId').value = id;
    document.getElementById('editUserName').value = name;
    document.getElementById('editUserPassword').className = 'form-control form-control-sm';
    document.getElementById('editUserConfirmPassword').className = 'form-control form-control-sm';

    const matched = allUsers.filter(user => {
        matchesName = user.name.trim().includes(name);
        return matchesName;
    });

    document.getElementById('editUserDashboard').checked = matched[0].permissions.dashboard;
    document.getElementById('editUserProducts').checked = matched[0].permissions.products;
    document.getElementById('editUserCheckout').checked = matched[0].permissions.checkout;
    document.getElementById('editUserHistory').checked = matched[0].permissions.history;
    
    if (name === 'admin') {
        document.getElementById('editUserName').disabled = true;
    }
    else {
        document.getElementById('editUserName').disabled = false;
    }

    new bootstrap.Modal(document.getElementById('editUserModal')).show();
}

function editUser(e){
    e.preventDefault();

    id = document.getElementById('editUserId').value,
    password = document.getElementById('editUserPassword').value;

    confirmPassword = document.getElementById('editUserConfirmPassword').value;
    
    if (password != '' && password != confirmPassword) {
        document.getElementById('editUserPassword').className = 'form-control form-control-sm is-invalid';
        document.getElementById('editUserConfirmPassword').className = 'form-control form-control-sm is-invalid';
        return;
    }
    else if (password == '' || confirmPassword == ''){
        document.getElementById('editUserPassword').className = 'form-control form-control-sm';
        document.getElementById('editUserConfirmPassword').className = 'form-control form-control-sm';
    }
    else {
        document.getElementById('editUserPassword').className = 'form-control form-control-sm is-valid';
        document.getElementById('editUserConfirmPassword').className = 'form-control form-control-sm is-valid';
    }
    
    formData = {
        'name': document.getElementById('editUserName').value,
        'password': password,
        'dashboard': document.getElementById('editUserDashboard').checked,
        'products': document.getElementById('editUserProducts').checked,
        'checkout': document.getElementById('editUserCheckout').checked,
        'history': document.getElementById('editUserHistory').checked,
    };
    
    fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        loadUsers();
        check_permissions();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function deleteUser(id, permission) {
    if (permission) { 
        alert('Cannot delete Admin')
        return;
    }
    else {
        openConfirmDeleteModal();
    }
    document.getElementById('confirmDeleteForm').addEventListener('submit', function(e) {
        e.preventDefault();

        fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(() => {
            // Get the existing modal instance and hide it
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
            if (modal) { // Check if an instance exists
                modal.hide();
            } else {
                // Fallback or error handling if instance isn't found (unlikely if modal was shown)
                console.warn("Bootstrap modal instance not found, cannot hide.");
            }
            loadUsers();
        })
        .catch(error => console.error('Error:', error));
    });
}
