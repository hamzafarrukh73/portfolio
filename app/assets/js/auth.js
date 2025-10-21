document.addEventListener("DOMContentLoaded", function (e) {
    if (window.location.pathname === "/signup") {
        document.getElementById('signupForm').addEventListener('submit', signup);
    }
    else {
        document.getElementById('loginForm').addEventListener('submit', login);
    }
});

function signup(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (password.value !== confirmPassword.value) {
        password.classList.add('is-invalid');
        confirmPassword.classList.add('is-invalid');
        return;
    }

    const formData = {
        'name': name.value,
        'password': password.value,
    };

    fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.message == 'Admin exists') {
            alert('Only one admin account is allowed.');
        }
        else if (data.message === "Signed up"){
            name.classList.add('is-valid');
            password.classList.add('is-valid');
            confirmPassword.classList.add('is-valid');
            window.location.href = '/login';
        }
        else {
            alert('MF Hacker')
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function login(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const password = document.getElementById('password');

    const formData = {
        'name': name.value,
        'password': password.value,
    };

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.message === "Incorrect Name"){
            name.classList.add('is-invalid');
            password.classList.add('is-invalid');
        }
        else if (data.message === 'Incorrect Password') {
            name.classList.add('is-valid');
            password.classList.add('is-invalid');
        }
        else if (data.message === "Logged in"){
            name.classList.add('is-valid');
            password.classList.add('is-valid');
            window.location.href = '/dashboard';
        }
        else {
            alert('MF Hacker');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
