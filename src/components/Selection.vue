<template>
  <div>
    <div ref="vantaRef" class="h-[calc(100vh-68px)]">
      <div class="flex flex-row justify-center pt-10">
        <div class="w-full selection-title text-center">
          Time for a quiz
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-10">
        <div>
          <kinesis-container>
            <kinesis-element :strength="20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-primary transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type1.jpg" alt="Title Detectives" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Title Detectives</h2>
                  <p>Guess the title of a movie based on AI generated hints</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'title-detectives' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                    >Start</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-green-600 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type2.jpg" alt="AI Sequel Salad" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">AI Sequel Salad</h2>
                  <p>The AI generates a sequel, can you guess the franchise?</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'sequel-salad' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                    >Start</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-orange-600 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type4.jpg" alt="Back to the Future Trivia" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Back to the Future Trivia</h2>
                  <p>Ready for an AI adventure with Doc and Marty McFly?</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'bttf-trivia' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                    >Start</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 hover:ring-yellow-300 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type3.jpg" alt="Movie Fun Facts" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Movie Fun Facts</h2>
                  <p>Prove your movie knowledge with AI generated questions</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'trivia' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                    >Start</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useCurrentUser} from 'vuefire'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
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
  vantaEffect = CLOUDS({
    el: vantaRef.value,
    THREE: THREE,
    skyColor: 0xfaa382
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
