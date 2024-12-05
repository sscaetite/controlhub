<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal-content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
