<script setup>
// definePageMeta({
//     layout: 'empty'
// })

const skills = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'Tailwind CSS' },
    { name: 'JavaScript' },
    { name: 'Nuxt.js' },
    { name: 'Python' },
    { name: 'Django REST Framework' },
    { name: 'SQL' },
    { name: 'Git' },
];
</script>

<template>
    <div class="container-main flex flex-col md:flex-col">
        <div class="flex flex-col h-fit w-fit gap-15 place-items-center">
            <h1 class="font-bold text-center">Get in Touch</h1>
            <div class="flex flex-col gap-5 h-fit w-min">
                <UButton icon="i-logos-google-gmail" label="Gmail: hamzafarrukh73@gmail.com" to="mailto:hamzafarrukh73@gmail.com" target="_blank" color="primary" variant="outline" size="xl" />
                <UButton icon="i-logos-github-icon" label="Github: github.com/hamzafarrukh73" to="https://github.com/hamzafarrukh73" target="_blank" color="primary" variant="outline" size="xl" />
                <UButton icon="i-logos-linkedin-icon" label="LinkedIn: linkedin.com/in/hamzafarrukh73" to="https://www.linkedin.com/in/hamzafarrukh73" target="_blank" color="primary" variant="outline" size="xl" />
                <UButton icon="i-logos-whatsapp-icon" label="WhatsApp: +923147864828" to="https://wa.me/923147864828" target="_blank" color="primary" variant="outline" size="xl" />
            </div>
        </div>        
    </div>
</template>

<style scoped>
.container-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
}
</style>