<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="hero h-[calc(100vh-68px)]">
      <div class="hero-overlay bg-none"></div>
      <div class="hero-content text-center text-neutral-content">
        <kinesis-container>
          <kinesis-element :strength="isMobile ? 0 : 30">
            <div class="max-w-screen-md bg-neutral-900 bg-opacity-50 p-5 rounded-2xl">
              <kinesis-element :strength="isMobile ? 0 : 20">
                <div class="divider text-lg uppercase home-title opacity-70 hover:opacity-100 transition-all">Welcome to</div>
                <h1 class="mb-5 text-5xl font-bold home-title"><span class="gemini">Gemini</span> Movie Detectives</h1>
              </kinesis-element>
              <kinesis-element :strength="isMobile ? 0 : 10">
                <p class="mb-5"><span v-if="user">Hi, <span class="gemini">{{ user.displayName }}!</span></span> Test your movie knowledge, powered by <span class="badge badge-warning badge-outline tooltip tooltip-bottom" data-tip="Using Google Gemini and Imagen">AI</span>!</p>
                <div class="flex flex-wrap gap-4 items-center justify-center">
                  <div>
                    <router-link to="/selection" tag="button" class="btn btn-primary btn-outline w-48">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="white" d="m4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4"/></svg>
                      Get started
                    </router-link>
                  </div>
                  <div>
                    <router-link v-if="user" to="/profile" tag="button" class="btn btn-success btn-outline w-48">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="white" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>
                      Your Profile
                    </router-link>
                    <button v-else tag="button" class="btn btn-secondary btn-outline w-48" @click="signInUser()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="white" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"/></svg>
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </kinesis-element>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCurrentUser} from 'vuefire'
import {onBeforeUnmount, onMounted, ref} from 'vue'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import {signInUser} from "../main.js"
import {isMobile} from 'mobile-device-detect'

const user = useCurrentUser()

const vantaRef = ref(null)
let vantaEffect

onMounted(() => {
  vantaEffect = HALO({
    el: vantaRef.value,
    THREE: THREE,
    size: 2
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
