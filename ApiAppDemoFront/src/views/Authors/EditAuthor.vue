<template>
  <div class="p-4">
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Authors`">X</router-link>
    <h2 class="text-2xl font-bold mb-4">Edit author</h2>
    <form @submit.prevent="editAuthor">
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
      <button type="submit" class="btn btn-outline-success px-4 mt-4">Save changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      firstName: '',
      lastName: '',
      selectedDate: ''
    };
  }, 
  mounted(){
    this.getAuthorData();
  },
  methods: {
    async editAuthor() {

        const response = await this.$api.post('Authors/editAuthor', {
              authorId: this.id,
              firstName: this.firstName,
              lastName: this.lastName,
              dateOfBirth: new Date(this.selectedDate).toISOString()
          });

        if (response.status === 200) {
          alert("✅ Author updated successfully.");
          this.$router.push("/Authors");
        } else {
          alert("⚠️ Unexpected response status: " + response.status);
        }
    },
    async getAuthorData(){
        const data = await this.$api.get('Authors/getAuthor',{
            authorId: this.$route.params.id
        });

        if(data.success){
            var fetchAuthor = data.author;
            this.id = fetchAuthor.id;
            this.firstName = fetchAuthor.firstName;
            this.lastName = fetchAuthor.lastName;

            const date = new Date(fetchAuthor.birthDate); // lub fetchAuthor.birthDate, jeśli to ta wartość
            this.selectedDate = date.toISOString().split('T')[0];
        }
    },
  },
};
</script>