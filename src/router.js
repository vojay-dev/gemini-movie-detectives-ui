import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'
import Sessions from './components/Sessions.vue'
import About from './components/About.vue'
import Stats from './components/Stats.vue'

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
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
