<template>
  <header>
    <div class="navbar bg-neutral-900 shadow-lg text-neutral-content">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 bg-opacity-80 rounded-box w-52">
            <li class="px-1"><router-link to="/" v-bind:class="{ 'active': currentRouteName === 'Home' }">Home</router-link></li>
            <li class="px-1"><router-link to="/about" v-bind:class="{ 'active': currentRouteName === 'About' }">About</router-link></li>
            <li class="px-1"><router-link to="/sessions" v-bind:class="{ 'active': currentRouteName === 'Sessions' }">Sessions</router-link></li>
            <li class="px-1"><router-link to="/stats" v-bind:class="{ 'active': currentRouteName === 'Stats' }">Stats</router-link></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-lg gemini">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 20h8v2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.96 9.96 0 0 1-2 6h-2.708A8 8 0 1 0 12 20m0-10a2 2 0 1 1 0-4a2 2 0 0 1 0 4m-4 4a2 2 0 1 1 0-4a2 2 0 0 1 0 4m8 0a2 2 0 1 1 0-4a2 2 0 0 1 0 4m-4 4a2 2 0 1 1 0-4a2 2 0 0 1 0 4"/></svg>
          Movie Detectives
        </a>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full bg-base-100">
              <img :src="user ? user.photoURL : generateRoboHash()" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 bg-opacity-80 rounded-box w-52">
            <li v-if="user"><a @click="signOut">Logout</a></li>
            <li v-else><a @click="signinRedirect()">Sign in</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="footer footer-center p-1 px-2 bg-base-100 bg-opacity-70 text-neutral-content fixed bottom-0">
    <aside class="items-center grid-flow-col">
      <p>© 2024 Volker Janz</p>
      <nav class="grid-flow-col gap-1 md:place-self-center md:justify-self-end">
        <a class="btn btn-ghost text-xl" href="https://www.vojay.de/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 6H5v7a1 1 0 0 0 .883.993L6 18h12a1 1 0 0 0 .993-.883L19 17zM6 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2"/></g></svg>
        </a>
        <a class="btn btn-ghost text-xl" href="https://github.com/vojay-dev" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="-2 -2 24 24"><path fill="currentColor" d="M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099C.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647c.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091a2.026 2.026 0 0 1-.872-.39a1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156a.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15c.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813c.282.186.566.28.852.28c.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234a5.314 5.314 0 0 1-1.223-.507a3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365c-.177-.564-.266-1.215-.266-1.952c0-1.049.342-1.942 1.027-2.68c-.32-.788-.29-1.673.091-2.652c.252-.079.625-.02 1.119.175c.494.195.856.362 1.086.5c.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143c.39.98.424 1.864.103 2.653c.685.737 1.028 1.63 1.028 2.68c0 .737-.089 1.39-.267 1.957c-.177.568-.407 1.023-.689 1.366a3.65 3.65 0 0 1-1.053.865c-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064c.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099c.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z"/></svg>
        </a>
        <a class="btn btn-ghost text-xl" href="https://www.linkedin.com/in/vjanz/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm1.102 4.297a1.195 1.195 0 1 0 0-2.39a1.195 1.195 0 0 0 0 2.39m1 7.516V6.234h-2v6.579zM6.43 6.234h2v.881c.295-.462.943-1.084 2.148-1.084c1.438 0 2.219.953 2.219 2.766c0 .087.008.484.008.484v3.531h-2v-3.53c0-.485-.102-1.438-1.18-1.438c-1.079 0-1.17 1.198-1.195 1.982v2.986h-2z" clip-rule="evenodd"/></svg>
        </a>
        <a class="btn btn-ghost text-xl" href="https://vojay.medium.com/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 0 1 1.5 0h12A1.5 1.5 0 0 1 15 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 13.5zM4 5H3V4h1.5a.5.5 0 0 1 .4.2l2.6 3.467l2.593-3.458A.5.5 0 0 1 10.5 4H12v1h-1v5h1v1H9v-1h1V6L7.5 9.333L5 6v4h1v1H3v-1h1z" clip-rule="evenodd"/></svg>
        </a>
      </nav>
    </aside>
  </footer>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import {useCurrentUser, useFirebaseAuth} from 'vuefire'
import {googleAuthProvider} from './main.js'
import {getRedirectResult, signInWithRedirect} from 'firebase/auth'

const route = useRoute()
const currentRouteName = computed(() => route.name)

const auth = useFirebaseAuth()
const user = useCurrentUser()

const randomRobot = ref(Math.floor(Math.random() * 1000))
const error = ref(null)

function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('failed signin redirect', reason)
    error.value = reason
  })
}

function signOut() {
  auth.signOut()
}

function generateRoboHash() {
  return `https://robohash.org/${randomRobot.value}`
}

onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('failed redirect result', reason)
    error.value = reason
  })
})
</script>
