function setInvoice() {
    return fetch(`/api/admin/invoice`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(invoice => {
        document.getElementById('invoiceLogo').src = invoice.logo;
        document.getElementById('invoiceAddress').textContent = invoice.address;
        document.getElementById('invoiceContact1').textContent = invoice.contact1;
        document.getElementById('invoiceContact2').textContent = invoice.contact2;

        return;
    })
    .catch(error => console.error('Error:', error));
}

function createInvoice(orderData) {
    // Create temporary print container
    const printContainer = document.createElement('div');
    printContainer.innerHTML = document.getElementById('invoiceTemplate').innerHTML;
    
    // Populate invoice data
    printContainer.querySelector('#invoiceNumber').textContent = orderData.id;
    
    date = new Date(orderData.created_on).toLocaleString().split(', ');
    printContainer.querySelector('#invoiceDate').textContent = date[0];
    printContainer.querySelector('#invoiceTime').textContent = date[1];
    printContainer.querySelector('#invoiceOrderType').textContent = orderData.order_type;

    const discount_type  = orderData.discount_type;
    
    if (discount_type === "percent"){
        printContainer.querySelector('#invoiceDiscount').textContent = orderData.discount_value + "%";
    }
    else{
        printContainer.querySelector('#invoiceDiscount').textContent = orderData.discount_value.toFixed(2);
    }
    printContainer.querySelector('#invoiceTotal').textContent = orderData.subtotal.toFixed(2);
    printContainer.querySelector('#invoiceGrandTotal').textContent = orderData.total.toFixed(2);

    const itemsBody = printContainer.querySelector('#invoiceItems');
    itemsBody.innerHTML = orderData.items.map(item => `
        <tr>
            <td colspan="3" class="text-start">${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td class="text-end">${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');
    return printContainer;
}

function styleInvoice() {
    // Add print-specific styles
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            body * {
                visibility: hidden;
                margin: 0 !important;
                padding: 0 !important;
            }
            #invoiceContainer, #invoiceContainer * {
                visibility: visible;
            }
            #invoiceContainer {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                padding: 20px;
            }
        }
    `;
    return style;
}

async function printInvoice(orderId) {
    await setInvoice();
    await fetch(`/api/history/${orderId}`)
        .then(response => response.json())
        .then(orderData => {

           printContainer = createInvoice(orderData);
            
           style = styleInvoice();
            
            // Create final container
            const invoiceContainer = document.createElement('div');
            invoiceContainer.id = 'invoiceContainer';
            invoiceContainer.appendChild(style);
            invoiceContainer.appendChild(printContainer);
            
            // Add to document
            document.body.appendChild(invoiceContainer);
            
            // const duplicateCopy = printContainer.cloneNode(true); 
            // invoiceContainer.appendChild(duplicateCopy);
            
            // Trigger print
        })
        .then (data => {
            window.print();
            
            // Clean up after print
            setTimeout(() => {
                document.body.removeChild(invoiceContainer);
            }, 500);
        })
        .catch(error => console.error('Error:', error));
}