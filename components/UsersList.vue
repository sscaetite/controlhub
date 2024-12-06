<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Username</th>
        <th>Email</th>
        <th>Grupo</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in currentUsers" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.group }}</td>
        <td>
          <button @click="checkUserDetails(user.id)">
            <IconDetails />
          </button>
          <button @click="editUser(user.id)">
            <IconEdit />
          </button>
          <button @click="confirmDelete(user)">
            <IconDelete />
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <Modal v-if="showModal" @close="closeModal">
    <h3>Confirmar Exclusão?</h3>

    <p>
      Tem certeza de que deseja excluir o usuário
      <strong>{{ userNameToDelete }}</strong
      >?
    </p>

    <button @click="closeModal">Cancelar</button>
    <button @click="deleteUser">Confirmar</button>
  </Modal>
</template>

<script setup lang="ts">
import "~/assets/css/UsersList.css";

interface User {
  id: string;
  name: string;
  cpf: string;
  username: string;
  email: string;
  group: string;
}

const props = defineProps<{
  users: User[];
}>();

const router = useRouter();
const currentUsers = ref<User[]>([...props.users]);
const showModal = ref(false);
const userToDelete = ref<User | null>(null);

const userNameToDelete = computed(() => userToDelete.value?.name || "");

const checkUserDetails = (userId: string) => {
  router.push(`/details/${userId}`);
};

const editUser = (userId: string) => {
  router.push(`/edit/${userId}`);
};

const confirmDelete = (user: User) => {
  userToDelete.value = user;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  userToDelete.value = null;
};

const deleteUser = async () => {
  if (!userToDelete.value) return;

  try {
    await $fetch(
      `https://6750fdd769dc1669ec1ccd01.mockapi.io/Users/${userToDelete.value.id}`,
      {
        method: "DELETE",
      }
    );

    showModal.value = false;
    userToDelete.value = null;

    refreshUsers();

    alert("Cadastro excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    alert("Erro ao excluir usuário.");
  }
};

const refreshUsers = () => {
  window.location.reload();
};
</script>
