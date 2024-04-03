import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
