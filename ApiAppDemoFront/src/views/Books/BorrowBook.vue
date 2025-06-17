<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Borrow book</h2>
    <form @submit.prevent="borrowBook">
      <div>
        <label class="block mx-2">Title</label>
        <input v-model="book.title" class="border p-2 w-50" disabled/>
      </div>
      <div class="mt-3 d-flex justify-content-center align-items-center">
          <label class="block mx-2">Borrower</label>
          <select class="form-select w-25 form-select-lg" v-model="borrowerId" required>
              <option disabled selected>Choose option</option>
              <option v-for="borrower in borrowers" :value="borrower.id" :key="borrower.id">{{borrower.firstName + ' ' + borrower.lastName}}</option>
          </select>
      </div>

      <button type="submit" class="btn btn-outline-success px-4 mt-4">Borrow Book</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowerId: "",
      bookId: "",

      borrowers: [],
      book: []
    };
  },
  mounted(){
    this.getBook();
    this.getBorrowers();

    this.bookId = this.$route.params.id;
  },
  methods: {
    async borrowBook() {

      const data = await this.$api.post('Books/borrowBook', {
                bookId: this.bookId, 
                borrowerId: this.borrowerId
            });

       alert(`Book borrowed: ${this.title}`);
      this.$router.push("/Books");
    },
    async getBorrowers(){
      const data = await this.$api.get('Borrowers/getBorrowers');

      if(data.success)
          this.borrowers = data.borrowers || [];
    },
    async getBook(){
      const data = await this.$api.get('Books/getBook',{
                id: this.$route.params.id
            });

      if(data.success)
          this.book = data.book || [];
    },
  },
};
</script>