<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="h-[calc(100vh-68px)]">

      <div v-if="loading" class="flex flex-row justify-center pt-10">
        <div class="text-center"><span class="loading loading-lg loading-spinner text-white pt-10 z-10"></span></div>
      </div>

      <div v-if="signedOut" class="flex flex-row justify-center pt-10">
        <div role="alert" class="alert alert-info shadow w-1/2 z-50">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please sign in to see your profile.</span>
        </div>
      </div>

      <div class="flex flex-row justify-center pt-10">
        <div class="avatar">
          <div v-if="profile" class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="profile.photo_url" />
          </div>
        </div>
      </div>

      <div v-if="profile" class="flex flex-row justify-center pt-3">
        <div class="profile-user">{{ profile.display_name }}</div>
      </div>

      <div v-if="profile" class="flex flex-row justify-center pt-3 pb-3">
        <div class="stats bg-opacity-70 backdrop-blur shadow z-50">

          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M44 28H28v16h16zM13 4l9 16H4zm23 16a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z"/><path stroke-linecap="round" d="m4 28l16 16m0-16L4 44"/></g></svg>
            </div>
            <div class="stat-title">Games played</div>
            <div class="stat-value">{{ profile.games_total }}</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="M13 42h22l6-21l-10 5l-7-14l-7 14l-10-5z"/><circle cx="7" cy="18" r="3"/><circle cx="24" cy="9" r="3"/><circle cx="41" cy="18" r="3"/></g></svg>
            </div>
            <div class="stat-title">Total score</div>
            <div class="stat-value">{{profile.score_total }}</div>
          </div>

        </div>
      </div>

      <div v-if="profile" class="flex flex-row justify-center pt-1 pb-3">
        <div class="overflow-x-auto z-50">
          <table class="table table-xs bg-primary-content/30 bg-opacity-80 backdrop-blur rounded-lg">
            <thead>
            <tr class="border-none">
              <th></th>
              <th>Games played</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-none">
              <th>Title Detectives</th>
              <td>{{ profile.games_title_detectives }}</td>
              <td>{{ profile.score_title_detectives }}</td>
            </tr>
            <tr class="border-none">
              <th>AI Sequel Salad</th>
              <td>{{ profile.games_sequel_salad }}</td>
              <td>{{ profile.score_sequel_salad }}</td>
            </tr>
            <tr class="border-none">
              <th>Back to the Future Trivia</th>
              <td>{{ profile.games_bttf_trivia }}</td>
              <td>{{ profile.score_bttf_trivia }}</td>
            </tr>
            <tr class="border-none">
              <th>Movie Fun Facts</th>
              <td>{{ profile.games_trivia }}</td>
              <td>{{ profile.score_trivia }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-row justify-center pt-3">
        <router-link to="/" tag="button" class="btn btn-neutral btn-wide">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M249.38 336L170 256l79.38-80m-68.35 80H342"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"/></svg>
          Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import WAVES from 'vanta/dist/vanta.waves.min.js'
import * as THREE from 'three'
import {fetchProfile} from "../main.js"

const vantaRef = ref(null)
let vantaEffect

const loading = ref(true)
const profile = ref(null)
const error = ref(null)
const signedOut = ref(false)

onMounted(async () => {
  vantaEffect = WAVES({
    el: vantaRef.value,
    THREE: THREE
  })

  const result = await fetchProfile()

  profile.value = result.profile
  error.value = result.error
  signedOut.value = result.signedOut

  loading.value = false
  console.log(profile.value)
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
