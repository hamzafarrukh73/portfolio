document.addEventListener("DOMContentLoaded", function (e) {
    
    if (window.location.pathname !== "/login" && window.location.pathname !== "/signup"){
        check_permissions();
        document.getElementById('logoutNav').addEventListener("click", logout);
    }

    // Prevent F12 key
    document.onkeydown = function (e) {
        if (e.key === "F12") {e.preventDefault();}

        // if (e.ctrlKey) {e.preventDefault();}
        // if (e.key === "Ctrl" && e.key === e.shiftKey && e.key === "C")
    };
    
    // Prevent right-click
    document.addEventListener("contextmenu", function (e) {e.preventDefault();});
});

function check_permissions() {
    fetch('/api/admin/permissions', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.message) {
            
        }
        else {
            const navItems = [
                { id: 'dashboardNav', permission: data.dashboard, href: '/dashboard' },
                { id: 'productsNav', permission: data.products, href: '/products' },
                { id: 'inventoryNav', permission: data.products, href: '/inventory' },
                { id: 'checkoutNav', permission: data.checkout, href: '/checkout' },
                { id: 'historyNav', permission: data.history, href: '/history' },
                { id: 'adminNav', permission: data.admin, href: '/admin' },
                { id: 'logoutNav', permission: true, href: '/login' }
            ];
            navItems.forEach(item => {
                button = document.getElementById(item.id);
                if (item.permission) {
                    if (item.id === 'logoutNav'){
                        button.className = 'btn btn-sm btn-danger';
                    }
                    else {
                        button.className = 'btn btn-sm btn-success';
                    }
                    button.href = item.href;
                }
                else {
                    button.className = 'btn btn-sm btn-outline-success disabled-link';
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function logout(e) {
    e.preventDefault();

    fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        // alert(data.message);
        window.location.href = "/login";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function openConfirmDeleteModal() {
    new bootstrap.Modal(document.getElementById('confirmDeleteModal')).show();
}

function uploadImage(requestMethod, name, foldername, imageFile) {
    formData = new FormData();

    formData.append('name', name);
    formData.append('foldername', foldername);
    formData.append('image', imageFile);

    return fetch(`/api/uploads/image`, {
        method: requestMethod,
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data.message;
    })
    .catch(error => console.error('Error:', error));
}

function readFile(file, element){
    const reader = new FileReader();
    reader.addEventListener('load', function(e) {
        document.getElementById(element).src = reader.result;
    });
    reader.readAsDataURL(file);
}

function searchData(data, container=null, category_id="0", name='') {

    if (category_id !== "0") {
        let matched = data.filter(index => {
            if (index.category_id.toString() === category_id){
                return index;
            }
        });
        matchedData = matched;
    }
    else {
        matchedData = data;
    }
    
    matched = matchedData.filter(index => {
        return index.name.toLowerCase().includes(name);
    });

    if (container !== null) {
        container(matched);
    }
}
