<script setup>
let name = ref('');
let password = ref('');

let nameClassList = ref('');
let passwordClassList = ref('');

localStorage.removeItem('authToken');
const login = async () => {
    nameClassList.value = '';
    passwordClassList.value = '';

    try {
        const response = await $fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            body: {
                username: name.value,
                password: password.value
            }
        });

        // This block runs only if the request is successful (status code 2xx)
        if (response.token) {
            nameClassList.value = 'is-valid';
            passwordClassList.value = 'is-valid';
            const token = response.token;
            localStorage.setItem('authToken', token);
            navigateTo('/dashboard', { replace: true });
        }

    } catch (error) {
        // This block runs if the request fails (status code 4xx, 5xx, or network error)
        if (error.response && error.response.status === 400) {
            // Assuming a 400 Bad Request for validation errors
            nameClassList.value = 'is-invalid';
            passwordClassList.value = 'is-invalid';
            alert('Invalid username or password.');
        } else {
            // Handle other types of errors
            alert('An error occurred. Please try again.');
        }
    }
};
</script>

<template>
    <div class="form form-login ">
        <h2 class="text-center">Login</h2>
        <input type="text" v-model="name" :class="nameClassList" placeholder="Name" id="loginName">
        <input type="password" v-model="password" :class="passwordClassList" placeholder="Password" id="loginPassword">
        <div class="d-flex justify-content-between px-2">
            <a href="" style="text-decoration: none;">
                <p class="text-primary">Reset Password</p>
            </a>
             <a href="" style="text-decoration: none;">
                <p class="text-primary">Create Account</p>
            </a>
        </div>
        <input type="submit" class="btn btn-dark" value="Login" @click="login" id="loginSubmit">
        <!-- <p class="text-center">OR</p>
        <input type="submit" class="btn btn-dark" value="Signup" id="loginSubmit"> -->
    </div>
</template>

<style>
.form-login {
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
}
.is-valid {
    border: 1px solid var(--color-success);
    border-radius: 5px;
}
.is-invalid {
    border: 1px solid var(--color-error);
    border-radius: 5px;
}
</style>