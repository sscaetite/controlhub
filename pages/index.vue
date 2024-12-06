<template>
  <Header />
  <ContentContainer>
    <PageTitle title="Todos os usuários">
      <button class="add-new" @click="addUser()">Adicionar novo usuário</button>
    </PageTitle>

    <div v-if="error">
      <p>Ocorreu um erro</p>
    </div>

    <div v-else-if="loading">
      <p>Carregando...</p>
    </div>

    <UsersList v-else :users="data" />
  </ContentContainer>
</template>

<script setup>
const fetchData = async () => {
  try {
    const response = await $fetch(
      "https://6750fdd769dc1669ec1ccd01.mockapi.io/Users"
    );
    if (response) {
      return response;
    }
  } catch (err) {
    throw new Error("Erro ao buscar dados.");
  }
};

const { data, loading, error } = await useAsyncData("dataFetch", fetchData);

const router = useRouter(); 

const addUser = () => {
  router.push(`/create`);
};
</script>

<style lang="css" scoped>
button.add-new {
  color: #322b50;
  background-color: #fff;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.19);
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 0 16px;
  transition: all 0.1s ease-out;
}

button.add-new:hover {
  transform: scale(1.1);
}
</style>
