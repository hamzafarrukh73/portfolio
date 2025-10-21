document.addEventListener('DOMContentLoaded', () => {
    loadAll();

    document.getElementById('searchProductBars').addEventListener('change', () => {
        let category_id = document.getElementById('searchProductCategory').value;
        let name = document.getElementById('searchProductName').value.toLowerCase();
        
        searchData(data=allProducts, container=populateProductsTable, category_id=category_id, name=name);
    });
    document.getElementById('confirmAddProduct').addEventListener('click', addProduct);
    document.getElementById('confirmEditProduct').addEventListener('click', editProduct);
    
    document.getElementById('searchCategoriesForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let name = document.getElementById('searchCategories').value.toLowerCase();
        
        searchData(data=allCategories, container=populateCategoriesTable, category_id="0" ,name=name);
    });

    document.getElementById('addCategoryForm').addEventListener('submit', addCategory);
    document.getElementById('confirmEditCategory').addEventListener('click', editCategory);

    document.getElementById("productImage").addEventListener("change", function(e) {
        const file = e.target.files[0];
        readFile(file, "addProductPreview");
    });

    document.getElementById("editProductImage").addEventListener("change", function(e) {
        if (e.target.value !== ""){
            const file = e.target.files[0];
            readFile(file, "editProductPreview");
        }
    });
});

function loadAll() {
    loadProducts();
    loadCategories();
}

let allProducts = [];
// let matchedProducts = [];

function loadProducts() {
    fetch('/api/products', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    })
    .then(response => response.json())
    .then(products => {
        allProducts = products;
        // matchedProducts = products;
        if (window.location.pathname === '/products') {
            populateProductsTable(allProducts);
        }
        else {
            populateInventoryContainer(allProducts);
        }
    })
    .catch(error => console.error('Error:', error));
}

// function populateProductsTable(products) {
//     const tbody = document.getElementById('productsTable');
//     tbody.innerHTML = '';

//     products.forEach(product => {
//         const row = document.createElement('tr');
//         row.classList.add('tr')
//         row.innerHTML = `
//             <td class="text-truncate">${product.name}</td>
//             <td>${product.category_name}</td>
//             <td>${product.price.toFixed(2)}</td>
//             <td>${product.quantity}</td>
//             <td>
//                 <div class="d-flex justify-content-center gap-1 h-25">
//                     <button class="btn btn-sm btn-success text-truncate" style="width: 40%" onclick="openEditProductModal(${product.id}, '${product.name}', ${product.price}, ${product.quantity}, ${product.category_id}, '${product.image_url}')">Edit</button>
//                     <button class="btn btn-sm btn-danger text-truncate" style="width: 40%" onclick="deleteProduct(${product.id})">Delete</button>
//                 </div>
//             </td>
//         `;
//         tbody.appendChild(row);
//     });
// }

function populateProductsTable(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
        
    products.forEach(product => {
        const card = document.createElement('div');
        card.style = "width: 23%"
        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h6 class="text-center" data-bs-toggle="tooltip" data-bs-title="${product.name}">${product.name}</h6>
                </div>
                <div class="card-body">
                    <img src="${product.image_url}" style="height: 25vh;">
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="text-truncate">Price: ${product.price}</h6>
                        <div class="d-flex w-50 gap-1 justify-content-end align-items-center">
                            <button class="btn btn-sm btn-success text-truncate text-center" style="width: 40%" onclick="openEditProductModal(${product.id}, '${product.name}', ${product.price}, ${product.quantity}, ${product.category_id}, '${product.image_url}')">E</button>
                            <button class="btn btn-sm btn-danger text-truncate text-center" style="width: 40%" onclick="deleteProduct(${product.id})">X</button>
                        <div>
                    </div>                          
                </div>
            </div>
        `;
        container.appendChild(card);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    });
}

function clearProductSearch() {
    document.getElementById('searchProductCategory').value = 0;
    document.getElementById('searchProductName').value = '';

    populateProductsTable(allProducts);
}

function openAddProductModal() {
    document.getElementById('addProductForm').reset();
    if (document.getElementById("productName").className.includes('is-invalid')){
        document.getElementById("productName").classList.remove('is-invalid');
    }
    
    const defaultSrc = "static/img/no_preview.png";
    
    document.getElementById("addProductPreview").src = defaultSrc;

    new bootstrap.Modal(document.getElementById('addProductModal')).show();
};

async function addProduct(e) {
    e.preventDefault();

    productName = document.getElementById('productName');

    const searchValue = productName.value.toLowerCase();
    
    const filtered = allProducts.filter(product => {
        const matchesName = searchValue ? product.name.toLowerCase()  === searchValue : true;
        // const matchesDate = selectedDate ? orderDate === selectedDate : true;
        return matchesName;
    });

    if (filtered.length > 0) {
        productName.classList.add('is-invalid');
        // document.getElementById("invalidProductName").className = "text-danger";
        return;
    }

    const imageFile = document.getElementById('productImage').files[0];
    let imageURL; // Declare imageUrl with 'let'

    if (imageFile) {
        imageURL = await uploadImage('POST', productName.value.trim(), 'products', imageFile);
    }
    else {
        imageURL = 'static/img/no_preview.png';
    }

    const formData = {
        "name": productName.value.trim(),
        "price": document.getElementById('productPrice').value,
        "category_id": document.getElementById('productCategory').value,
        // "quantity": document.getElementById('productStock').value || 0,
        "image_url": imageURL
    }

    await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
        bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        loadProducts();
    })
    .catch(error => console.error('Error:', error));
}


function openEditProductModal(id, name, price, stock, categoryId, imageURL) {
    // Reset file input
    document.getElementById('editProductImage').value = '';

    document.getElementById('editProductId').value = id;

    document.getElementById('editProductName').value = name;
    document.getElementById('editProductName').classList.remove('is-invalid');
    document.getElementById('editProductPrice').value = price;
    // document.getElementById('editProductStock').value = stock;
    document.getElementById('editProductCategory').value = categoryId;
    
    // Show current image
    const imagePreview = document.getElementById('editProductPreview');
    if (imageURL !== "null") {
        imagePreview.src = imageURL;
    }
    else {
        imagePreview.src = 'static/img/no_preview.png';
    };

    new bootstrap.Modal(document.getElementById('editProductModal')).show();
}

async function editProduct(e) {
    e.preventDefault();

    const id = document.getElementById('editProductId').value;
    const productName = document.getElementById('editProductName');
    const price = document.getElementById('editProductPrice').value;
    const category_id = document.getElementById('editProductCategory').value;
    // const quantity = document.getElementById('editProductStock').value;
    let imageURL = document.getElementById('editProductPreview').src;

    const searchValue = productName.value.toLowerCase();
    
    const filtered = allProducts.filter(product => {
        if (product.id.toString() !== id) {
            const matchesName = searchValue ? product.name.toLowerCase()  === searchValue : true;
            return matchesName; 
        } 
    });

    if (filtered.length > 0) {
        productName.classList.add('is-invalid');
        return;
    }

    const imageFile = document.getElementById('editProductImage').files[0];
    if (imageFile) {
        imageURL = await uploadImage('PUT', productName.value.trim(), 'products', imageFile)
    }

    const formData = {
        'name': productName.value.trim(),
        'price': price,
        'category_id': category_id,
        // 'quantity': quantity,
        'image_url': imageURL,
    }

    await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Get the existing modal instance and hide it
            bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
            loadProducts();
        }
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    openConfirmDeleteModal();
    document.getElementById('confirmDeleteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then(() => {
            // Get the existing modal instance and hide it
            bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
            loadProducts();
        })
        .catch(error => console.error('Error:', error));
    });
}

// function openRestockModal(itemId, currentQuantity) {
//     document.getElementById('restockItemId').value = itemId;
//     document.getElementById('restockQuantity').value = '';
//     new bootstrap.Modal(document.getElementById('restockModal')).show();
// }

// document.getElementById('restockForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const itemId = document.getElementById('restockItemId').value;
//     const quantityToAdd = parseInt(document.getElementById('restockQuantity').value);
    
//     // if (quantityToAdd < 1) {
//     //     alert('Please enter a valid quantity');
//     //     return;
//     // }

//     fetch(`/api/inventory/${itemId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             quantity: parseInt(allProducts.find(item => item.id == itemId).quantity) + quantityToAdd
//         })
//     })
//     .then(response => response.json())
//     .then(updatedItem => {
//         // Update local data
//         const index = allProducts.findIndex(item => item.id == itemId);
//         allProducts[index] = updatedItem;
        
//         // Close modal and refresh display
//         new bootstrap.Modal(document.getElementById('restockModal')).hide();
//         populateProductsTable(allProducts);
//     })
//     .catch(error => console.error('Error:', error));
// });
