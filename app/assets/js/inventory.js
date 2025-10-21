function populateInventoryContainer(products) {
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
                        <h6 class="text-truncate">Stock: ${product.quantity}</h6>
                        <div class="d-flex w-50 gap-1 justify-content-end align-items-center">
                            <button class="btn btn-sm btn-success" onclick="restock(${product.id}, '${product.name}', ${product.price}, ${product.quantity}, ${product.category_id}, '${product.image_url}')">Change</button>
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

function openRestockModal(itemId, currentQuantity) {
    document.getElementById('restockItemId').value = itemId;
    document.getElementById('restockQuantity').value = '';
    new bootstrap.Modal(document.getElementById('restockModal')).show();
}

document.getElementById('restockForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemId = document.getElementById('restockItemId').value;
    const quantityToAdd = parseInt(document.getElementById('restockQuantity').value);
    
    // if (quantityToAdd < 1) {
    //     alert('Please enter a valid quantity');
    //     return;
    // }

    fetch(`/api/inventory/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            quantity: parseInt(allItems.find(item => item.id == itemId).quantity) + quantityToAdd
        })
    })
    .then(response => response.json())
    .then(updatedItem => {
        // Update local data
        const index = allItems.findIndex(item => item.id == itemId);
        allItems[index] = updatedItem;
        
        // Close modal and refresh display
        new bootstrap.Modal(document.getElementById('restockModal')).hide();
        populateInventoryTable(allItems);
    })
    .catch(error => console.error('Error:', error));
});