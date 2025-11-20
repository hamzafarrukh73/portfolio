<script setup>
const items = [
    { label: 'Coding' },
    { label: 'Content Creation' },
    { label: 'Database' },
]
const value = ref(items[0])
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
    <div class="container-main flex flex-col gap-3">
        <UCard class="rounded">
            <template #header>
                <div class="flex justify-between w-full">
                    <h2 class="font-semiboldtext-center ">Skills</h2>
                    <USelectMenu v-model="value" :items="items" class="w-2/10" />
                </div>
            </template>
        
        
        <div class="flex flex-row flex-wrap place-content-center p-2 h-full w-full overflow-auto">
            <div class="flex flex-col md:flex-row justify-start gap-5 place-items-center basis-1/2 md:basis-1/3 p-3" v-for="skill in skills" :key="skill">
                <UIcon :name="skill.icon" class="p-5 size-16"></UIcon>
                <h4 class="text-center">{{ skill.name }}</h4>
            </div>
            <!-- <UButton :label="skill.name" :icon="skill.icon" class="flex flex-row h-3/10 w-3/10 flex-shrink-0" color="neutral" variant="ghost" size="xl" v-for="skill in skills" :key="skill" /> -->
        </div>
        </UCard>
    </div>
</template>

<style scoped>
.container-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
}
</style>