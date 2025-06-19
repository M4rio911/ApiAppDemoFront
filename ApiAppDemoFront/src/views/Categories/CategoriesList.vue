<template>
  <div>
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>
    <h2 class="fw-bold mb-2 text-uppercase">List of Categories</h2>
    <hr>
    <div class="mt-4">
      <table class="table" v-if="categories.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="category.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ category.name }}</td>
            <td v-if="isAuthenticated">
              <router-link class="me-3 btn btn-outline-secondary" :to="`/categories/edit/${category.id}`">Edit</router-link>
              <button size="sm" @click="deleteCategory(category.id)" class="btn btn-outline-danger">Delete</button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>No categories FOUND</h1>
      </div> 
      
    </div>
    <router-link class="btn btn-outline-success px-3 mt-3" :to="`/categories/add`" v-if="isAuthenticated">+ Add category</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['UserIsAuthenticated']),
    isAuthenticated() {
      return this.UserIsAuthenticated;
    }
  },
  mounted() {
    this.getCategories();
  },
  methods:{
    async getCategories(){
      const data = await this.$api.get('Category/getCategories');
    
      if(data.success)
        this.categories = data.categories;
    },
    async deleteCategory(categoryId){
      const data = await this.$api.post('Category/removeCategory',{
        categoryId: categoryId
      });
      
        if(data.success)
          this.getCategories();
    },
    formatDate(date){
      return new Date(date).toISOString().split('T')[0]
    },
  }
};
</script>