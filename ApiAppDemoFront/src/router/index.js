import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
  
  { path: '/Books', component: BookList },
  { path: '/Books/add', component: AddBook },
  { path: '/Books/edit/:id', component: EditBook },
  { path: '/Books/borrow/:id', component: BorrowBook },

  { path: '/Authors', component: AuthorList },
  { path: '/Authors/add', component: AddAuthor },
  { path: '/Authors/edit/:id', component: EditAuthor },

  { path: '/Borrowers', component: BorrowersList },
  { path: '/Borrowers/:id', component: EditBorrower },
  { path: '/Borrowers/add', component: AddBorrower },
  { path: '/Borrowers/edit/:id', component: EditBorrower },
  
  { path: '/Categories', component: CategoriesList },
  { path: '/Categories/add', component: AddCategory },
  { path: '/Categories/edit/:id', component: EditCategory },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
