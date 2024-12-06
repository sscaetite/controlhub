<template>
  <Header />
  <ContentContainer>
    <PageTitle title="Detalhes do Usuário" />

    <div v-if="loading" class="loading">Carregando detalhes...</div>
    <div v-else-if="error" class="error">
      Ocorreu um erro ao carregar os detalhes.
    </div>
    <div v-else class="user-details-card">
      <div class="user-title">
        <h2 class="user-complete-name">{{ user.name }}</h2>
        <button @click="editUser" class="edit-btn"><IconEdit /></button>
      </div>
      <p><strong>CPF:</strong> {{ user.cpf }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Grupo:</strong> {{ user.group }}</p>
      <button @click="goBack" class="back-btn">Voltar</button>
    </div>
  </ContentContainer>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const userId = route.params.userId;

const user = ref(null);
const loading = ref(true);
const error = ref(false);

const loadUserDetails = async () => {
  try {
    const response = await $fetch(
      `https://6750fdd769dc1669ec1ccd01.mockapi.io/Users/${userId}`
    );
    user.value = response;
  } catch (err) {
    console.error("Erro ao carregar detalhes do usuário:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push("/");
};

const editUser = () => {
  router.push(`/edit/${userId}`);
};

onMounted(() => {
  loadUserDetails();
});
</script>

<style scoped>
.user-details-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: auto;
  text-align: left;
}

.user-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-complete-name {
  margin: 0 0 16px;
}

.edit-btn {
  border: none;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  box-shadow: 3px 3px 5px 1px rgba(0,0,0,0.33);
}

.user-details-card h2 {
  margin-bottom: 16px;
  color: #322b50;
}

.user-details-card p {
  margin: 8px 0;
  font-size: 16px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #322b50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.back-btn:hover {
  background-color: #443366;
}

.loading,
.error {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
