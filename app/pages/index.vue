<script setup>
// definePageMeta({
//     layout: 'empty'
// })
</script>

<template>
    <div class="container-profile flex flex-col-reverse md:flex-row justify-center md:justify-around">
        <div class="flex-col h-fit w-full md:w-5/10 place-content-center md:place-content-start">
            <h1 class="font-bold text-center md:text-start">I'm Hamza Farrukh</h1>
            <h4 class="font-muted text-pretty w-full text-center md:text-start my-3">
                A Full Stack Developer who specialize in Nuxt.js for the frontend and Django REST 
                framework for the backend logic and APIs. I have experience in Data Analytics, 
                Machine Learning, Content Creation, and Teaching computer science as well.
            </h4>
            
            <div class="flex flex-col md:flex-row place-items-center md:place-content-start gap-3">
                <div class="flex gap-3">
                    <UButton label="Download CV" to="/files/hamza_farrukh_cv.pdf" target="_blank" color="primary" size="md" />
                    <UButton label="View Projects" to="/projects" color="primary" variant="outline" size="md" />
                </div>
                <div class="flex gap-3 rounded w-fit">
                    <!-- Social Media Links Will Go Here -->
                    <UButton icon="i-logos-github-icon" to="https://github.com/hamzafarrukh73" target="_blank" color="neutral" variant="ghost" size="xl" />
                    <UButton icon="i-logos-linkedin-icon" to="https://www.linkedin.com/in/hamzafarrukh73" target="_blank" color="neutral" variant="ghost" size="xl" />
                    <UButton icon="i-logos-whatsapp-icon" to="https://wa.me/923147864828" target="_blank" color="neutral" variant="ghost" size="xl" />
                </div>
            </div>
        </div>
        <div class="flex h-fit md:h-full w-3/10 place-content-center place-items-center">
            <img src="~assets/img/profile.png" alt="" class="md:h-3/4 aspect-square object-contain">
        </div>
    </div>
</template>

<style scoped>
.container-profile {
    grid-area: profile;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
}
</style>