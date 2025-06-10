import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import BookList from '../views/Books/BookList.vue'
import BookDetails from '../views/Books/BookDetails.vue'
import AddBook from '../views/Books/AddBook.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  { path: '/books', component: BookList },
  { path: '/books/:id', component: BookDetails },
  { path: '/books/add', component: AddBook },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
