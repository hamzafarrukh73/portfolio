<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

// A reactive variable to hold the final SVG string
const svgContent = ref('');

// A watch effect to handle the async import logic
watchEffect(async () => {
  if (!props.name) {
    svgContent.value = '';
    return;
  }

  try {
    const iconModule = await import(`~/assets/icons/${props.name}.svg?raw`);
    svgContent.value = iconModule.default;
  } catch (e) {
    console.error(`Could not load icon: ${props.name}`, e);
    svgContent.value = '';
  }
});
</script>

<template>
  <div v-if="svgContent" v-html="svgContent" ></div>
  <div v-else></div>
</template>

<style scoped>

</style>