<template>
  <div ref="vantaRef" class="h-[calc(100vh-68px)]">
    <div class="flex flex-row justify-center pt-10">
      <div class="w-full selection-title text-center">
        Choose a personality
      </div>
    </div>
    <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-10">
      <div>
        <kinesis-container>
          <kinesis-element :strength="20" type="depth">
            <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
              <figure><img src="../assets/cool.jpg" alt="The cool kid" /></figure>
              <div class="card-body">
                <h2 class="card-title selection-card-title">The cool kid</h2>
                <div class="card-actions justify-end">
                  <router-link to="/configuration" tag="button" class="btn btn-outline btn-secondary btn-block">Choose</router-link>
                </div>
              </div>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
      <div>
        <kinesis-container>
          <kinesis-element :strength="20" type="depth">
            <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
              <figure><img src="../assets/dad.jpg" alt="Dad jokes dad" /></figure>
              <div class="card-body">
                <h2 class="card-title selection-card-title">Dad jokes dad</h2>
                <div class="card-actions justify-end">
                  <button class="btn btn-outline btn-secondary btn-block">Choose</button>
                </div>
              </div>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
      <div>
        <kinesis-container>
          <kinesis-element :strength="20" type="depth">
            <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
              <figure><img src="../assets/santa.jpg" alt="Santa Claus" /></figure>
              <div class="card-body">
                <h2 class="card-title selection-card-title">Santa Claus</h2>
                <div class="card-actions justify-end">
                  <button class="btn btn-outline btn-secondary btn-block">Choose</button>
                </div>
              </div>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
      <div>
        <kinesis-container>
          <kinesis-element :strength="20" type="depth">
            <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
              <figure><img src="../assets/prof.jpg" alt="The professor" /></figure>
              <div class="card-body">
                <h2 class="card-title selection-card-title">The professor</h2>
                <div class="card-actions justify-end">
                  <button class="btn btn-outline btn-secondary btn-block">choose</button>
                </div>
              </div>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useCurrentUser} from 'vuefire'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'
import { useSound } from '@vueuse/sound'
import selectionSfx from '../assets/selection.mp3'

const { play, stop } = useSound(selectionSfx)

const router = useRouter()
const route = useRoute()

const user = useCurrentUser()

const vantaRef = ref(null)
let vantaEffect

console.log(route.query)

onMounted(() => {
  getUrlQueryParams()
})

const getUrlQueryParams = async () => {
  await router.isReady()
  console.log(route.query)
}

onMounted(() => {
  vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
    color: 0xb778ff
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
