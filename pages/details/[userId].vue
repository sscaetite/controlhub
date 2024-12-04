<template>
  <div>Detalhes {{ userId }}</div>
</template>

<script setup>
const route = useRoute();

const userId = computed(() => route.params.userId);
</script>
