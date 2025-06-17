<template>
  <div class="p-4">
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Categories`">X</router-link>
    <h2 class="text-2xl font-bold mb-4">Add new category</h2>
    <form @submit.prevent="addCategory">
      <div>
        <label class="block mx-2">Name</label>
        <input v-model="name" class="border p-2 w-full" required />
      </div>
      <button type="submit" class="btn btn-outline-success px-4 mt-4">Add category</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  }, 
  methods: {
    async addCategory() {

        const response = await this.$api.post('Category/addCategory', {
              name: this.name,
          });

        if (response.status === 200) {
          alert("✅ category added successfully.");
          this.$router.push("/categories");
        } else {
          alert("⚠️ Unexpected response status: " + response.status);
        }
    },
  },
};
</script>