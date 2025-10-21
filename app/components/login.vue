<script setup>
const userStore = useUserStore()
const toast = useToast();

let name = ref('');
let password = ref('');

let nameClassList = ref(false);
let passwordClassList = ref('neutral');

localStorage.removeItem('authToken');
const login = async () => {
    nameClassList.value = false;
    passwordClassList.value = 'neutral';
    toast.add({
        title: 'Logging in...',
        color: 'info'
    });

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
            // nameClassList.value = 'is-valid';
            // passwordClassList.value = 'is-valid';
            const token = response.token;
            localStorage.setItem('authToken', token);
            // userStore.login(user);
            navigateTo('/dashboard', { replace: true });
        }

    } catch (error) {
        // This block runs if the request fails (status code 4xx, 5xx, or network error)
        // Assuming a 400 Bad Request for validation errors
        nameClassList.value = 'error';
        passwordClassList.value = 'error';
        if (error.response && error.response.status === 400) {
            toast.add({
                title: 'Invalid username or password.',
                color: 'error'
            });
        } else {
            // Handle other types of errors
            nameClassList.value = true;
            passwordClassList.value = 'error';
            toast.add({
                title: 'An error occurred. Please try again.',
                color: 'error'
            });
        }
    }
};
</script>

<template>    
    <div class="flex place-content-center py-3 h-25 w-50">
        <img src="~/assets/img/logo5.png" class="" alt="Login">
    </div>
    <UForm class="form-login" @submit="login">
        <!-- <UFormField size="xl" class="flex"> -->
        <UInput type="text" placeholder="Username" v-model="name" size="lg" id="loginName" required />
        <!-- </UFormField> -->
        <UInput type="password" placeholder="Password" v-model="password" size="lg" id="loginPassword" required />
        <UButton type="submit" label="Login" size="xl" class="place-content-center" />
    </UForm>
</template>

<style>
.form-login {
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    /* flex-grow: 1; */
    gap: 1.5rem;
}

</style>