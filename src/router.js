import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import TitleDetectives from './components/quiz/TitleDetectives.vue'
import SequelSalad from "./components/quiz/SequelSalad.vue"
import BttfTrivia from "./components/quiz/BttfTrivia.vue"
import Trivia from "./components/quiz/Trivia.vue"
import About from './components/About.vue'
import System from './components/System.vue'
import Profile from './components/Profile.vue'
import Selection from './components/Selection.vue'
import Configuration from './components/Configuration.vue'
import Admin from './components/Admin.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/title-detectives/:personality',
    name: 'TitleDetectives',
    component: TitleDetectives,
    props: true
  },
  {
    path: '/sequel-salad/:personality',
    name: 'SequelSalad',
    component: SequelSalad,
    props: true
  },
  {
    path: '/bttf-trivia/:personality',
    name: 'BttfTrivia',
    component: BttfTrivia,
    props: true
  },
  {
    path: '/trivia/:personality',
    name: 'Trivia',
    component: Trivia,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/system',
    name: 'System',
    component: System
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
  },
  {
    path: '/configuration/:mode',
    name: 'Configuration',
    component: Configuration,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
