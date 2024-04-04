import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'
import Sessions from './components/Sessions.vue'

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
  },
  {
    path: '/sessions',
    name: 'Sessions',
    component: Sessions
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
