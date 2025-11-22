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
    { name: 'Github' },
];
</script>

<template>
    <div class="container-main flex flex-col md:flex-row gap-5 md:gap-20">
        <div class="h-fit w-4/10 md:w-3/10 place-content-center place-items-center aspect-square">
            <img src="~assets/img/profile.png" alt="" class="h-full aspect-square object-contain rounded-full border-3 border-primary">
        </div>
        <div class="flex flex-col gap-5 h-fit w-full md:w-5/10 place-content-center md:place-content-start">
            <h1 class="font-bold text-center md:text-start">Hamza Farrukh</h1>
            <h4 class="text-muted text-pretty w-full text-center md:text-start">
                Full Stack Developer
            </h4>
            
            <div class="flex flex-row flex-wrap place-content-center md:place-content-start gap-3">
                <UButton :label="skill.name" v-for="skill in skills" :key="skill.name" color="neutral" variant="outline" size="xs" />
            </div>

            <div class="flex flex-col md:flex-row place-items-center md:place-content-start gap-5">
                <div class="flex flex-row gap-3 ">
                    <UButton label="View Projects" to="/projects" color="primary" size="xl" />
                    <UButton label="Download Resume" to="/files/hamza_farrukh_resume.pdf" target="_blank" color="primary" variant="outline" size="xl" />
                </div>
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