<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Username</th>
        <th>Email</th>
        <th>Grupo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.group }}</td>
        <td>
          <button>
            <IconDetails />
          </button>
          <button @click="editUser(user.id)">
            <IconEdit />
          </button>
          <button>
            <IconDelete />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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

defineProps<{
  users: User[];
}>();

const router = useRouter();

const editUser = (userId: string) => {
  router.push(`/edit/${userId}`);
};
</script>
