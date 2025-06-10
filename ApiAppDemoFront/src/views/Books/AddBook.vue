<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Dodaj nową książkę</h2>
    <form @submit.prevent="addBook" class="space-y-4">
      <div>
        <label class="block mb-1">Tytuł</label>
        <input v-model="title" class="border p-2 w-full" required />
      </div>
      <div>
        <label class="block mb-1">Autor</label>
        <input v-model="author" class="border p-2 w-full" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Dodaj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddBook",
  data() {
    return {
      title: "",
      author: "",
    };
  },
  methods: {
    addBook() {
       alert(`Dodano książkę: ${this.title} – ${this.author}`);
      this.$router.push("/");
    },
  },
};
</script>