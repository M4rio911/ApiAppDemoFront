<template>
  <div>
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>
    <h2 class="fw-bold mb-2 text-uppercase">List of Authors</h2>
    <hr>
    <div class="mt-4">
      <table class="table" v-if="authors.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Date of birth</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in authors" :key="author.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ author.firstName }}</td>
            <td>{{ author.lastName }}</td>
            <td>{{ formatDate(author.birthDate) }}</td>
            <td v-if="isAuthenticated">
              <router-link class="me-3 btn btn-outline-secondary" :to="`/Authors/edit/${author.id}`">Edit</router-link>
              <button size="sm" @click="deleteAuthor(author.id)" class="btn btn-outline-danger">Delete</button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO AUTHORS FOUND</h1>
      </div> 
      
    </div>
    <router-link class="btn btn-outline-success px-3 mt-3" :to="`/Authors/add`" v-if="isAuthenticated">+ Add author</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      authors: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['UserIsAuthenticated']),
    isAuthenticated() {
      return this.UserIsAuthenticated;
    }
  },
  mounted() {
    this.getAuthors();
  },
  methods:{
    async getAuthors(){
      const data = await this.$api.get('Authors/getAuthors');
    
      if(data.success)
        this.authors = data.authors;
    },
    async deleteAuthor(AuthorId){
      const data = await this.$api.post('Authors/removeAuthor',{
        AuthorId: AuthorId
      });
      
        if(data.success)
          this.getAuthors();
    },
    formatDate(date){
      return new Date(date).toISOString().split('T')[0]
    },
  }
};
</script>