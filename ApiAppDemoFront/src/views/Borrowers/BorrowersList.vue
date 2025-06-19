<template>
  <div>
    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>
    <h2 class="fw-bold mb-2 text-uppercase">List of Borrowers</h2>
    <hr>
    <div class="mt-4">
      <table class="table" v-if="borrowers.length > 0">
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
          <tr v-for="(borrower, index) in borrowers" :key="borrower.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ borrower.firstName }}</td>
            <td>{{ borrower.lastName }}</td>
            <td>{{ formatDate(borrower.birthDate) }}</td>
            <td v-if="isAuthenticated">
              <router-link class="me-3 btn btn-outline-secondary" :to="`/Borrowers/edit/${borrower.id}`">Edit</router-link>
              <button size="sm" @click="deleteBorrower(borrower.id)" class="btn btn-outline-danger">Delete</button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>No Borrowers FOUND</h1>
      </div> 
      
    </div>
    <router-link class="btn btn-outline-success px-3 mt-3" :to="`/Borrowers/add`"  v-if="isAuthenticated">+ Add Borrower</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      borrowers: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['UserIsAuthenticated']),
    isAuthenticated() {
      return this.UserIsAuthenticated;
    }
  },
  mounted() {
    this.getBorrowers();
  },
  methods:{
    async getBorrowers(){
      const data = await this.$api.get('Borrowers/getBorrowers');
    
      if(data.success)
        this.borrowers = data.borrowers;
    },
    async deleteBorrower(BorrowerId){
      const data = await this.$api.post('Borrowers/removeBorrower',{
        BorrowerId: BorrowerId
      });
      
        if(data.success)
          this.getBorrowers();
    },
    formatDate(date){
      return new Date(date).toISOString().split('T')[0]
    },
  }
};
</script>