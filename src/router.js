import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'
import Sessions from './components/Sessions.vue'
import About from './components/About.vue'
import Stats from './components/Stats.vue'
import Profile from "./components/Profile.vue";
import Selection from "./components/Selection.vue";

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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/selection',
    name: 'Selection',
    component: Selection
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
