<template>
  <div class="hero h-[calc(100vh-68px)]" :style="{ 'background-image': `url(${backgroundImg})`, 'background-position': 'top' }">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-center text-neutral-content">
      <kinesis-container>
        <kinesis-element :strength="30">
          <div class="max-w-screen-md bg-neutral-900 bg-opacity-80 p-5 rounded-2xl">
            <kinesis-element :strength="20">
              <h1 class="mb-5 text-5xl font-bold">Welcome to <span class="gemini">Gemini</span> Movie Detectives</h1>
            </kinesis-element>
            <kinesis-element :strength="10">
              <p class="mb-5"><span v-if="user">Hi, <span class="text-primary">{{ user.displayName }}!</span></span> Test your movie knowledge, powered by <span class="badge badge-info badge-outline">AI</span>!</p>
              <div class="flex flex-wrap gap-4 items-center justify-center">
                <div><router-link to="/quiz" tag="button" class="btn btn-primary w-48">Get started</router-link></div>
                <div>
                  <router-link v-if="user" to="/quiz" tag="button" class="btn btn-success w-48">Your Profile</router-link>
                  <button v-else tag="button" class="btn btn-secondary w-48" @click="signinRedirect()">Sign in</button>
                </div>
              </div>
            </kinesis-element>
          </div>
        </kinesis-element>
      </kinesis-container>
    </div>
  </div>
</template>

<script setup>
import backgroundImg from '../assets/bg-home.webp'
import {useCurrentUser, useFirebaseAuth} from "vuefire";
import {onMounted, ref} from "vue";
import {getRedirectResult, signInWithRedirect} from "firebase/auth";
import {googleAuthProvider} from "../main.js";

const auth = useFirebaseAuth()
const user = useCurrentUser()
const error = ref(null)

function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('failed signin redirect', reason)
    error.value = reason
  })
}

onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('failed redirect result', reason)
    error.value = reason
  })
})
</script>
