document.addEventListener('DOMContentLoaded', () => {
    loadOrders();  
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
        populateOrdersTable(orders.slice(0, 20));
        updateSales(orders);  
    })
    .catch(error => console.error('Error:', error));
}

function populateOrdersTable(orders) {
    const tbody = document.getElementById('lastOrders');
    tbody.innerHTML = '';
    orders.forEach(order => {
        const row = document.createElement('tr');
        date = new Date(order.created_on).toLocaleString().split(', ');
        row.innerHTML = `
            <td class="no-text-wrap text-truncate">${date[0]}</td>
            <td class="no-text-wrap text-truncate">${date[1]}</td>
            <td>${order.total.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

async function updateSales() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Helper function to check if two dates are the same day
    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    };

    // Helper function to get the first day of the current week (assuming Monday as the start)
    const getFirstDayOfWeek = (date) => {
        const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    };

    // Helper function to check if a date is within the current week
    const isWithinThisWeek = (orderDate) => {
        const firstDayOfWeek = getFirstDayOfWeek(new Date(currentDate));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        return orderDate >= firstDayOfWeek && orderDate <= lastDayOfWeek;
    };

    // Helper function to check if a date is within the current month
    const isWithinThisMonth = (orderDate) => {
        return orderDate.getMonth() === currentMonth &&
               orderDate.getFullYear() === currentYear;
    };

    // Helper function to check if a date is within the last month
    const isWithinLastMonth = (orderDate) => {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return orderDate.getMonth() === lastMonth &&
               orderDate.getFullYear() === lastYear;
    };

    // Helper function to check if a date is within the current year
    const isWithinThisYear = (orderDate) => {
        return orderDate.getFullYear() === currentYear;
    };

    const isWithinLastYear = (orderDate) => {
        return orderDate.getFullYear() === currentYear - 1;
    };

    // Calculate Today's Sales
    const dailySales = allOrders
        .filter(order => isSameDay(new Date(order.created_on), currentDate))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);
    

    // Calculate Yesterday's Sales
    // const yesterday = new Date(currentDate);
    // yesterday.setDate(currentDate.getDate() - 1);
    // const yesterdaySales = allOrders
    //     .filter(order => isSameDay(new Date(order.created_on), yesterday))
    //     .reduce((sum, order) => sum + order.total, 0)
    //     .toFixed(2);
    // document.getElementById('sales2').textContent = yesterdaySales;

    // Calculate This Week's Sales
    const weeklySales = allOrders
        .filter(order => isWithinThisWeek(new Date(order.created_on)))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);
    
   

    // Calculate This Month's Sales
    const monthlySales = allOrders
        .filter(order => isWithinThisMonth(new Date(order.created_on)))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);
    
    

    // Calculate Last Month's Sales
    const lastMonthSales = allOrders
        .filter(order => isWithinLastMonth(new Date(order.created_on)))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);
    
    

    // Calculate This Year's Sales
    const yearlySales = allOrders
        .filter(order => isWithinThisYear(new Date(order.created_on)))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);

    const lastYearlySales =  await allOrders
        .filter(order => isWithinLastYear(new Date(order.created_on)))
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2);
    
    
    // document.getElementById('sales1').textContent = dailySales;
    // document.getElementById('sales2').textContent = weeklySales;
    // document.getElementById('sales3').textContent = monthlySales;
    // document.getElementById('sales4').textContent = lastMonthSales;
    // document.getElementById('sales5').textContent = yearlySales;
    // document.getElementById('sales6').textContent = lastYearlySales;

    const salesData = [
        { id: `Today's Sales`, value: dailySales, },
        { id: `This Week's Sales`, value: weeklySales, } ,
        { id: `This Month's Sales`, value: monthlySales,  },
        { id: `Last Month's Sales`, value: lastMonthSales,  },
        { id: `This Year's Sales`, value: yearlySales,  },
        { id: `Last Year's Sales`, value: lastYearlySales, }
    ];
    populateSalesCards(salesData);
}

function populateSalesCards(salesData){
    const container = document.getElementById('saleCardsContainer');
    container.innerHTML = '';
    salesData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card bg-success';
        card.style = 'width: 45%; height:30%;'
        card.innerHTML = ` 
            <div class="card-header py-2"><h5 class="text-dark text-center">${data.id}</h5></div>
            <div class="card-body py-4"><h5 id="sales1" class="text-dark text-center">${data.value}</h5></div>
        `;
        container.appendChild(card);
    });
}