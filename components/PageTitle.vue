<template>
  <div class="title-wrapper">
    <h1>{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style lang="css" scoped>
h1 {
  margin: 32px 0;
  font-size: 24px;
  color: #322b50;
}

.title-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
