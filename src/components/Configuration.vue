<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div>
      <div class="flex flex-row justify-center pt-10">
        <div class="w-full selection-title text-center">
          Choose a personality
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-20">
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-35 backdrop-blur hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/cool.jpg" alt="The cool kid" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">The cool kid</h2>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: getComponent(props.mode), params: { personality: 'default' }}"
                        tag="button"
                        class="btn btn-outline btn-secondary btn-block"
                    >Select
                    </router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-35 backdrop-blur hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/dad.jpg" alt="Dad jokes dad" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Dad jokes dad</h2>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: getComponent(props.mode), params: { personality: 'dad' }}"
                        tag="button"
                        class="btn btn-outline btn-secondary btn-block"
                    >Select
                    </router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-35 backdrop-blur hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/santa.jpg" alt="Santa Claus" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Santa Claus</h2>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: getComponent(props.mode), params: { personality: 'christmas' }}"
                        tag="button"
                        class="btn btn-outline btn-secondary btn-block"
                    >Select
                    </router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div class="card w-72 bg-base-100 shadow-xl bg-opacity-35 backdrop-blur hover:bg-opacity-85 hover:ring-4 hover:ring-purple-500 transition-all" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/prof.jpg" alt="The scientist" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">The scientist</h2>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: getComponent(props.mode), params: { personality: 'scientist' }}"
                        tag="button"
                        class="btn btn-outline btn-secondary btn-block"
                    >Select
                    </router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
      </div>
    </div>
    <div class="hidden lg:block toast pt-20 toast-bottom opacity-70 hover:opacity-90 transition-all">
      <div role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M44 28H28v16h16zM13 4l9 16H4zm23 16a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z"/><path stroke-linecap="round" d="m4 28l16 16m0-16L4 44"/></g></svg>
        <span class="text-lg">Game mode: <span class="badge badge-lg badge-outline badge-accent">{{ formatMode(props.mode) }}</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onBeforeUnmount, onMounted, ref} from 'vue'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'
import {useSound} from '@vueuse/sound'
import selectionSfx from '../assets/selection.mp3'
import {isMobile} from 'mobile-device-detect'

const props = defineProps({
  mode: String
})

const { play, stop } = useSound(selectionSfx)

const vantaRef = ref(null)
let vantaEffect

function formatMode(mode) {
  switch (mode) {
    case 'title-detectives': return 'Title Detectives'
    case 'sequel-salad': return 'AI Sequel Salad'
    case 'bttf-trivia': return 'Back to the Future Trivia'
    case 'trivia': return 'Movie Fun Facts'
    default: return mode
  }
}

function getComponent(mode) {
  switch (mode) {
    case 'title-detectives': return 'TitleDetectives'
    case 'sequel-salad': return 'SequelSalad'
    case 'bttf-trivia': return 'BttfTrivia'
    case 'trivia': return 'Trivia'
    default: return mode
  }
}

onMounted(() => {
  vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
    color: 0xb778ff
  })

  console.log(props.mode)
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
