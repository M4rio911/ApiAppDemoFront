<template>
  <div class="p-4">
    <router-link to="/" class="text-blue-500">&larr; Powrót do listy</router-link>
    <h2 class="text-xl font-semibold mt-4">{{ book.title }}</h2>
    <p class="text-gray-700">Autor: {{ book.author }}</p>
    <p class="mt-2 italic text-sm">ID książki: {{ book.id }}</p>
  </div>
</template>

<script>
export default {
  name: "BookDetails",
  data() {
    return {
      book: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    // Dla uproszczenia - symulacja fetchowania książki:
    const books = [
      { id: 1, title: "Pan Tadeusz", author: "Adam Mickiewicz" },
      { id: 2, title: "Lalka", author: "Bolesław Prus" },
    ];
    this.book = books.find(b => b.id == id);
  },
};
</script>