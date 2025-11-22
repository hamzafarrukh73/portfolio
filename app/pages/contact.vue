<script setup lang="ts">
const contacts = [
  { name: 'Gmail', info: 'hamzafarrukh73@gmail.com', link: 'mailto:hamzafarrukh73@gmail.com', icon: 'i-logos-google-gmail' },
  { name: 'LinkedIn', info: 'linkedin.com/in/hamzafarrukh73', link: 'https://linkedin.com/in/hamzafarrukh73', icon: 'i-logos-linkedin-icon' },
  { name: 'GitHub', info: 'github.com/hamzafarrukh73', link: 'https://github.com/hamzafarrukh73', icon: 'i-simple-icons-github' },
  { name: 'Whatsapp', info: '+92 314 7864828', link: 'https://wa.me/923147864828', icon: 'i-logos-whatsapp-icon' },
];
</script>

<template>
  <UPage>
    <UPageHeader
      title="Get in Touch"
      class="justify-center"
    />
    <UPageGrid class="p-5">
      <UPageCard
        v-for="contact in contacts" :key="contact.name"
        :title="contact.name"
        :description="contact.info"
        :to="contact.link"
        :icon="contact.icon"
        target="_blank"
        variant="soft"
        orientation="horizontal"
        class="col-span-1"
        :ui="{ leadingIcon: 'size-8' }"
        
      >
      <!-- <template #body>
        <div class="flex flex-row place-content-start gap-3">
          
          <div class="flex flex-col">
            <h4 class="font-semibold">Gmail</h4>
            <p class="text-muted">hamzafarrukh73@gmail.com</p>
          </div>
        </div>
      </template> -->
      </UPageCard>
    </UPageGrid>
  </UPage>  
</template>

<style scoped>

</style>