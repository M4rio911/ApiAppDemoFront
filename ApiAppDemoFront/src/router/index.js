import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index.js"

import HomeView from '../views/HomeView.vue'
import Login from '../views/Auth/Login.vue'

import BookList from '../views/Books/BookList.vue'
import EditBook from '../views/Books/EditBook.vue'
import AddBook from '../views/Books/AddBook.vue'
import BorrowBook from '../views/Books/BorrowBook.vue'

import AuthorList from '../views/Authors/AuthorList.vue'
import EditAuthor from '../views/Authors/EditAuthor.vue'
import AddAuthor from '../views/Authors/AddAuthor.vue'

import BorrowersList from '../views/Borrowers/BorrowersList.vue'
import EditBorrower from '../views/Borrowers/EditBorrower.vue'
import AddBorrower from '../views/Borrowers/AddBorrower.vue'

import CategoriesList from '../views/Categories/CategoriesList.vue'
import AddCategory from '../views/Categories/AddCategory.vue'
import EditCategory from '../views/Categories/EditCategory.vue'

const routes = [
  { path: '/', name: 'home',component: HomeView,},

  { path: '/Login', component: Login,},
  
  { path: '/Books', component: BookList },
  { path: '/Books/add', component: AddBook, meta: { requiresAuth: true}},
  { path: '/Books/edit/:id', component: EditBook, meta: { requiresAuth: true}},
  { path: '/Books/borrow/:id', component: BorrowBook, meta: { requiresAuth: true}},

  { path: '/Authors', component: AuthorList },
  { path: '/Authors/add', component: AddAuthor, meta: { requiresAuth: true}},
  { path: '/Authors/edit/:id', component: EditAuthor, meta: { requiresAuth: true}},

  { path: '/Borrowers', component: BorrowersList },
  { path: '/Borrowers/:id', component: EditBorrower, meta: { requiresAuth: true}},
  { path: '/Borrowers/add', component: AddBorrower, meta: { requiresAuth: true}},
  { path: '/Borrowers/edit/:id', component: EditBorrower, meta: { requiresAuth: true}},
  
  { path: '/Categories', component: CategoriesList },
  { path: '/Categories/add', component: AddCategory, meta: { requiresAuth: true}},
  { path: '/Categories/edit/:id', component: EditCategory, meta: { requiresAuth: true}},

]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("https://localhost:7221/"),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters['auth/UserIsAuthenticated'];

  if (!isAuthenticated) {
    await store.dispatch('auth/TryLogin');
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/Login');
  }

  next();
});

export default router
