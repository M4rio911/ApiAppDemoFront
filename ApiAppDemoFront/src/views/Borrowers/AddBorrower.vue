<template>
  <div class="p-4">
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Borrowers`">X</router-link>
    <h2 class="text-2xl font-bold mb-4">Add new borrower</h2>
    <form @submit.prevent="addBorrower">
      <div>
        <label class="block mx-2">First name</label>
        <input v-model="firstName" class="border p-2 w-full" required />
      </div>
      <div class="mt-3">
        <label class="block mx-2">Last name</label>
        <input v-model="lastName" class="border p-2 w-full" required />
      </div>
      <div class="mt-3 d-flex justify-content-center align-items-center">
        <label class="mx-2">Date of birth</label>
        <input 
          type="date" 
          class="form-control w-50 fs-5 border p-2" 
          v-model="selectedDate" 
        />
      </div>
      <button type="submit" class="btn btn-outline-success px-4 mt-4">Add borrower</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      selectedDate: new Date().toISOString().split('T')[0]
    };
  }, 
  methods: {
    async addBorrower() {

        const response = await this.$api.post('Borrowers/addBorrower', {
              firstName: this.firstName,
              lastName: this.lastName,
              dateOfBirth: new Date(this.selectedDate).toISOString()
          });

        if (response.status === 200) {
          alert("✅ Borrower added successfully.");
          this.$router.push("/Borrowers");
        } else {
          alert("⚠️ Unexpected response status: " + response.status);
        }
    },
  },
};
</script>