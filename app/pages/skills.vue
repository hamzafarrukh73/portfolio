<script setup>
const skills = [
    { name: "HTML" , icon: "i-skill-icons-html" },
    { name: "CSS" , icon: "i-skill-icons-css" },
    { name: "Tailwind" , icon: "i-skill-icons-tailwindcss-dark" },
    { name: "JavaScript" , icon: "i-skill-icons-javascript" },
    { name: "Nuxt.js" , icon: "i-skill-icons-nuxtjs-dark" },
    { name: "Python" , icon: "i-skill-icons-python-dark" },
    { name: "Django" , icon: "i-skill-icons-django" },
    { name: "PostgreSQL" , icon: "i-skill-icons-postgresql-dark" },
]
</script>

<template>
    <div class="container-skills">
            <h3 class="font-semibold text-center">Skills & Technologies</h3>
            <div class="flex flex-rpw flex-wrap gap-3 my-3 place-content-center overflow-x-auto w-full">
                <UButton :label="skill.name" :icon="skill.icon" class="flex-col flex-shrink-0" color="neutral" variant="ghost" size="xl" v-for="skill in skills" :key="skill" />
            </div>
        </div>
</template>

<style scoped>
.container-skills {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>