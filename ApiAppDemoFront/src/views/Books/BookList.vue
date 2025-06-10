<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Lista książek</h1>
    <router-link to="/add" class="text-blue-500">+ Dodaj nową książkę</router-link>
    <ul class="mt-4">
      <li v-for="book in books" :key="book.id" class="mb-2">
        <router-link :to="`/books/${book.id}`" class="text-lg text-blue-700 hover:underline">
          {{ book.title }} – {{ book.author }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookList",
  data() {
    return {
      books: [
        { id: 1, title: "Pan Tadeusz", author: "Adam Mickiewicz" },
        { id: 2, title: "Lalka", author: "Bolesław Prus" },
      ],
    };
  },
};
</script>