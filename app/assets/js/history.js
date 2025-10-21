document.addEventListener('DOMContentLoaded', () => {
    loadOrders();    

    document.getElementById('searchOrderId').addEventListener('input', filterOrders);
    document.getElementById('searchDate').addEventListener('change', filterOrders);
});

let allOrders = [];

function loadOrders() {
    fetch('/api/history', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    })
    .then(response => response.json())
    .then(orders => {
        allOrders = orders;
        populateOrdersTable(orders);
    })
    .catch(error => console.error('Error:', error));
}

function populateOrdersTable(orders) {
    const tbody = document.getElementById('ordersTable');
    tbody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        date = new Date(order.created_on).toLocaleString().split(', ');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${date[0]}</td>
            <td>${date[1]}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>
                <div class="d-flex justify-content-center gap-1 h-25">
                    <button class="btn btn-sm btn-success text-truncate" style="width: 40%" onclick="printInvoice(${order.id})">Print</button>
                    <button class="btn btn-sm btn-danger text-truncate" style="width: 40%" onclick="deleteOrder(${order.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterOrders() {
    const orderId = document.getElementById('searchOrderId').value.toLowerCase();
    const selectedDate = document.getElementById('searchDate').value;
    
    const filtered = allOrders.filter(order => {
        const matchesId = order.id.toString().includes(orderId);
        const orderDate = order.created_on.split(' ')[0];
        const matchesDate = selectedDate ? orderDate === selectedDate : true;
        return matchesId && matchesDate;
    });
    
    populateOrdersTable(filtered);
}

function clearSearch() {
    document.getElementById('searchOrderId').value = '';
    document.getElementById('searchDate').value = '';
    filterOrders();
}

function deleteOrder(id) {
    openConfirmDeleteModal();

    document.getElementById('confirmDeleteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(`/api/history/${id}`, { method: 'DELETE' })
        .then(() => {
            // Get the existing modal instance and hide it
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
            if (modal) { // Check if an instance exists
                modal.hide();
            } else {
                // Fallback or error handling if instance isn't found (unlikely if modal was shown)
                console.warn("Bootstrap modal instance not found, cannot hide.");
            }
            loadOrders();
        })
        .catch(error => console.error('Error:', error));
    });
}

// async function printInvoice(orderId) {
//     await setInvoice();
//     await fetch(`/api/history/${orderId}`)
//         .then(response => response.json())
//         .then(orderData => {

//            printContainer = createInvoice(orderData);
            
//            style = styleInvoice();
            
//             // Create final container
//             const invoiceContainer = document.createElement('div');
//             invoiceContainer.id = 'invoiceContainer';
//             invoiceContainer.appendChild(style);
//             invoiceContainer.appendChild(printContainer);
            
//             // Add to document
//             document.body.appendChild(invoiceContainer);
            
//             // const duplicateCopy = printContainer.cloneNode(true); 
//             // invoiceContainer.appendChild(duplicateCopy);
            
//             // Trigger print
//             window.print();
            
//             // Clean up after print
//             setTimeout(() => {
//                 document.body.removeChild(invoiceContainer);
//             }, 100);
//         })
//         .catch(error => console.error('Error:', error));
// }

function updateMonthlySales() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthlySales = allOrders
        .filter(order => {
            const orderDate = new Date(order.created_on);
            return orderDate.getMonth() === currentMonth && 
                   orderDate.getFullYear() === currentYear;
        })
        .reduce((sum, order) => sum + order.total, 0);

    document.getElementById('monthlySales').textContent = monthlySales.toFixed(2);
}