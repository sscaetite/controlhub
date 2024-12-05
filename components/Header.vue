<template>
  <main>
    <button class="home" @click="goToHomePage()">
      <IconCookie /> ControlHub
    </button>
  </main>
</template>

<script setup>
const router = useRouter();

const goToHomePage = () => {
  router.push("/");
};
</script>

<style lang="css" scoped>
main {
  padding: 16px;
  box-shadow: 0px 10px 21px -8px rgba(133, 131, 133, 0.69);
  display: flex;
  justify-content: center;
  align-items: center;
}

button.home {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}
</style>
