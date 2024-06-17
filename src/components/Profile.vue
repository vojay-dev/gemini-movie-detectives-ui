<template>
  <div>
    <div ref="vantaRef" class="h-[calc(100vh-68px)]">
      <div class="flex flex-row justify-center pt-10">
        <div class="avatar">
          <div v-if="userDoc" class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="userDoc.photo" />
          </div>
        </div>
      </div>

      <div v-if="userDoc" class="flex flex-row justify-center pt-3">
        <div class="profile-user">{{ userDoc.name }}</div>
      </div>

      <div v-if="userDoc" class="flex flex-row justify-center pt-3 pb-10">
        <div class="stats shadow z-50">

          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M44 28H28v16h16zM13 4l9 16H4zm23 16a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z"/><path stroke-linecap="round" d="m4 28l16 16m0-16L4 44"/></g></svg>
            </div>
            <div class="stat-title">Games played</div>
            <div class="stat-value">{{ userDoc.gamesTotal }}</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="M13 42h22l6-21l-10 5l-7-14l-7 14l-10-5z"/><circle cx="7" cy="18" r="3"/><circle cx="24" cy="9" r="3"/><circle cx="41" cy="18" r="3"/></g></svg>
            </div>
            <div class="stat-title">Total score</div>
            <div class="stat-value">{{ userDoc.scoreTotal }}</div>
          </div>

        </div>
      </div>

      <div class="flex flex-row justify-center pt-3">
        <router-link to="/" tag="button" class="btn btn-neutral btn-wide">
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
import {getCurrentUserDocument} from "../main.js";

const vantaRef = ref(null)
let vantaEffect

const userDoc = ref(null)
const error = ref(null)

async function fetchUserDocument() {
  try {
    userDoc.value = await getCurrentUserDocument()
  } catch (err) {
    console.error('Error fetching user document:', err.message)
    error.value = err.message
  }
}

onMounted(async () => {
  vantaEffect = WAVES({
    el: vantaRef.value,
    THREE: THREE
  })

  await fetchUserDocument()
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
