<template>
  <div>

    <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>
    <h2 class="fw-bold mb-2 text-uppercase">List of Books</h2>
    <hr>
    <div class="mt-4">
      <button @click="showOnlyAvailable = !showOnlyAvailable" class="btn btn-sm btn-outline-primary mb-3">
        {{ showOnlyAvailable ? 'Show All' : 'Show only available' }}
      </button>
      <table class="table" v-if="sortedBooks.length > 0">
        <thead>
          <tr>
            <th scope="col" @click="sortBy('id')">
              <button class="btn btn-outline-info"># <span v-if="sortKey === 'id'">{{ sortAsc ? '▲' : '▼' }}</span></button>
            </th>
            <th scope="col" @click="sortBy('isBorrowed')">
              <button class="btn btn-outline-info">Available <span v-if="sortKey === 'isBorrowed'">{{ sortAsc ? '▲' : '▼' }}</span></button>
            </th>
            <th scope="col" @click="sortBy('title')">
              <button class="btn btn-outline-info">Title <span v-if="sortKey === 'title'">{{ sortAsc ? '▲' : '▼' }}</span></button>
            </th>
            <th scope="col" @click="sortBy('author')">
              <button class="btn btn-outline-info">Author <span v-if="sortKey === 'author'">{{ sortAsc ? '▲' : '▼' }}</span></button>
            </th>
            <th scope="col" @click="sortBy('borrower')">
              <button class="btn btn-outline-info">Borrowed by <span v-if="sortKey === 'borrower'">{{ sortAsc ? '▲' : '▼' }}</span></button>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in sortedBooks" :key="book.id">
            <th scope="row">{{ book.id }}</th>
            <td>{{ book.isBorrowed ? "X" : "✓" }}</td>
            <td>{{ book.title }}</td>
            <td>{{ findPersonById(authors, book.authorId) ?? "" }}</td>
            <td>{{ findPersonById(borrowers, book.borrowerId) ?? "" }}</td>
            <td>
              <router-link class="me-3 btn btn-outline-secondary" :to="`/Books/edit/${book.id}`">Edit</router-link>
              <button size="sm" @click="deleteBook(book.id)" class="btn btn-outline-danger me-3">Delete</button>

              <button v-if="book.isBorrowed" @click="returnBook(book.id)" class="btn btn-outline-primary">Return Book</button>
              <router-link v-else class="btn btn-outline-primary" :to="`/Books/borrow/${book.id}`">Borrow book</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h1>NO BOOKS FOUND</h1>
      </div> 
      
    </div>
    <router-link class="btn btn-outline-success px-3 mt-3" :to="`/Books/add`">+ Add book</router-link>
  </div>
</template>

<script>
export default {
  name: "BookList",
  data() {
    return {
      showOnlyAvailable: false,
      books: [],
      authors: [],
      borrowers: [],

      
      sortKey: '',
      sortAsc: true
    };
  },
  mounted() {
    this.getBooks();
    this.getAuthors();
    this.getBorrowers();
  },
  methods:{
      async getBooks(){
        const data = await this.$api.get('Books/getBooks');
      
        if(data.success)
          this.books = data.books;
      },
      
      async getAuthors(){
        const data = await this.$api.get('Authors/getAuthors');
      
        if(data.success)
          this.authors = data.authors;
      },
      async getBorrowers(){
        const data = await this.$api.get('Borrowers/getBorrowers');
      
        if(data.success)
          this.borrowers = data.borrowers;
      },
      async returnBook(bookId){
        const data = await this.$api.post('Books/returnBook',{
            bookId: bookId
          });
        
          if(data.success)
            this.getBooks();
      },
      async deleteBook(bookId){
        const data = await this.$api.post('Books/removeBook',{
          bookId: bookId
        });
        
          if(data.success)
            this.getBooks();
      },
      findPersonById(list, id) {
        const author = list.find((author) => author.id === id);
        return author ? (author.firstName + " " + author.lastName) : null;
      },
      sortBy(key) {
        if (this.sortKey === key) {
          this.sortAsc = !this.sortAsc;
        } else {
          this.sortKey = key;
          this.sortAsc = true;
        }
      }
  },
  computed: {
    filteredBooks() {
      return this.showOnlyAvailable
        ? this.books.filter(book => !book.isBorrowed)
        : this.books;
    },
    sortedBooks() {
      let books = [...this.filteredBooks];

      if (this.sortKey === 'author') {
        books.sort((a, b) => {
          const nameA = this.findPersonById(this.authors, a.authorId) || '';
          const nameB = this.findPersonById(this.authors, b.authorId) || '';
          return this.sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
      } else if (this.sortKey === 'borrower') {
        books.sort((a, b) => {
          const nameA = this.findPersonById(this.borrowers, a.borrowerId) || '';
          const nameB = this.findPersonById(this.borrowers, b.borrowerId) || '';
          return this.sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
      } else if (this.sortKey) {
        books.sort((a, b) => {
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];

          if (typeof valA === 'string') {
            return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
          } else {
            return this.sortAsc ? valA - valB : valB - valA;
          }
        });
      }

      return books;
    }
  },
};
</script>