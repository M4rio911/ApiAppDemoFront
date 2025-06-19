<template>
  <div class="p-4">
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Books`">X</router-link>
    <h2 class="text-2xl font-bold mb-4">Edit new book</h2>
    <form @submit.prevent="editBook">
      <div>
        <label class="block mx-2">Title</label>
        <input v-model="title" class="border p-2 w-full" required />
      </div>
      <div class="mt-3 d-flex justify-content-center align-items-center">
          <label class="block mx-2">Author</label>
          <select class="form-select w-25 form-select-lg" v-model="authorId" required>
              <option disabled selected>Choose option</option>
              <option v-for="author in authors" :value="author.id" :key="author.id">{{author.firstName + ' ' + author.lastName}}</option>
          </select>
      </div>
      <div class="mt-3 d-flex justify-content-center align-items-center">
          <label class="block mx-2">Category</label>
          <select class="form-select w-25 form-select-lg" v-model="categoryId" required>
              <option disabled selected>Choose option</option>
              <option v-for="category in categories" :value="category.id" :key="category.id">{{category.name}}</option>
          </select>
      </div>
      <div class="mt-3 d-flex justify-content-center align-items-center">
          <label class="block mx-2">Description</label>
          <textarea v-model="description" class="border p-2 w-25" required maxlength="255" ></textarea>
      </div>

      <button type="submit" class="btn btn-outline-success px-4 mt-4">Save changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      authorId: "",
      categoryId: "",
      description: "",

      authors: [],
      categories: []
    };
  },
  mounted(){
    this.getAuthors();
    this.getCategories();
    this.getBookData();
  },
  methods: {
    async editBook() {

      const data = await this.$api.post('Books/editBook', {
                title: this.title, 
                authorId: this.authorId,
                categoryId: this.categoryId,
                description: this.description
            });

       alert(`Book Edited: ${this.title}`);
      this.$router.push("/Books");
    },
    async getAuthors(){
      const data = await this.$api.get('Authors/getAuthors');

      if(data.success)
          this.authors = data.authors || [];
    },
    async getCategories(){
      const data = await this.$api.get('Category/getCategories');

      if(data.success)
          this.categories = data.categories || [];
    },
    async getBookData(){
      const data = await this.$api.get('Books/getBook',{
          id: this.$route.params.id
      });

      if(data.success){
          var fetchBook = data.book;
          this.title = fetchBook.title;
          this.categoryId = fetchBook.categoryId;
          this.authorId = fetchBook.authorId;
          this.description = fetchBook.description;
      }
    }
  },
};
</script>