<template>
  <Header />
  <ContentContainer>
    <PageTitle title="Editar Usuário" />
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          required
          placeholder="Digite o nome"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          v-model="user.cpf"
          required
          placeholder="Digite o CPF"
          @input="maskCPF"
        />
        <span v-if="cpfError" class="error-message">CPF inválido.</span>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="user.username"
          required
          placeholder="Digite o username"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          required
          placeholder="Digite o email"
        />
        <span v-if="emailError" class="error-message">Email inválido.</span>
      </div>

      <div class="form-group">
        <label for="group">Grupo</label>
        <input
          type="text"
          id="group"
          v-model="user.group"
          required
          placeholder="Digite o grupo"
        />
      </div>

      <div class="form-actions">
        <button type="button" @click="cancel" class="cancel-btn">
          Cancelar
        </button>
        <button type="submit" :disabled="!isFormValid" class="submit-btn">
          Salvar Usuário
        </button>
      </div>
    </form>
  </ContentContainer>
</template>

<script setup>

const router = useRouter();
const route = useRoute();

const userId = route.params.userId;

const user = ref({
  name: "",
  cpf: "",
  username: "",
  email: "",
  group: "",
});

const emailError = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return user.value.email && !emailRegex.test(user.value.email);
});

const cpfError = computed(() => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return user.value.cpf && !cpfRegex.test(user.value.cpf);
});

const isFormValid = computed(() => {
  return (
    user.value.name &&
    user.value.cpf &&
    !cpfError.value &&
    user.value.username &&
    user.value.email &&
    !emailError.value &&
    user.value.group
  );
});

const maskCPF = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  event.target.value = value.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );
  user.value.cpf = event.target.value;
};

const loadUserData = async () => {
  try {
    const response = await $fetch(
      `https://6750fdd769dc1669ec1ccd01.mockapi.io/Users/${userId}`
    );
    user.value = response;
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
};

const handleSubmit = async () => {
  try {
    await $fetch(
      `https://6750fdd769dc1669ec1ccd01.mockapi.io/Users/${userId}`,
      {
        method: "PUT",
        body: user.value,
      }
    );
    router.push("/");
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
};

const cancel = () => {
  router.push("/");
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.user-form {
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
}

.submit-btn {
  background-color: #322b50;
  color: white;
}

.submit-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
