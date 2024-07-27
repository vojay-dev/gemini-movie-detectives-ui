<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="h-[calc(100vh-68px)]">
      <div class="flex flex-row justify-center pt-10">
        <div class="w-full selection-title text-center">
          Time for a quiz
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-20">
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all tooltip tooltip-bottom tooltip-primary', getHoverClass('title-detectives'), getTooltipClass('title-detectives')]" :data-tip="getUsageTip('title-detectives')" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type1.jpg" alt="Title Detectives" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Title Detectives</h2>
                  <p class="text-left">Guess the title of a movie based on AI generated hints</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'title-detectives' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                        v-bind:disabled="limitReached('title-detectives') || null"
                    >{{ getStartLabel('title-detectives') }}</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all tooltip tooltip-bottom tooltip-primary', getHoverClass('sequel-salad'), getTooltipClass('sequel-salad')]" :data-tip="getUsageTip('sequel-salad')" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type2.jpg" alt="AI Sequel Salad" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">AI Sequel Salad</h2>
                  <p class="text-left">The AI generates a sequel, can you guess the franchise?</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'sequel-salad' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                        v-bind:disabled="limitReached('sequel-salad') || null"
                    >{{ getStartLabel('sequel-salad') }}</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all tooltip tooltip-bottom tooltip-primary', getHoverClass('bttf-trivia'), getTooltipClass('bttf-trivia')]" :data-tip="getUsageTip('bttf-trivia')" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type4.jpg" alt="Back to the Future Trivia" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Back to the Future Trivia</h2>
                  <p class="text-left">Ready for an AI adventure with Doc and Marty McFly?</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'bttf-trivia' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                        v-bind:disabled="limitReached('bttf-trivia') || null"
                    >{{ getStartLabel('bttf-trivia') }}</router-link>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
              <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all tooltip tooltip-bottom tooltip-primary', getHoverClass('trivia'), getTooltipClass('trivia')]" :data-tip="getUsageTip('trivia')" @mouseenter="play" @mouseleave="stop">
                <figure><img src="../assets/type3.jpg" alt="Movie Fun Facts" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">Movie Fun Facts</h2>
                  <p class="text-left">Prove your movie knowledge with AI generated questions</p>
                  <div class="card-actions justify-end">
                    <router-link
                        :to="{ name: 'Configuration', params: { mode: 'trivia' }}"
                        tag="button"
                        class="btn btn-outline btn-primary btn-block"
                        v-bind:disabled="limitReached('trivia') || null"
                    >{{ getStartLabel('trivia') }}</router-link>
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
import {useRouter} from 'vue-router'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'
import { useSound } from '@vueuse/sound'
import selectionSfx from '../assets/selection.mp3'
import {isMobile} from 'mobile-device-detect'
import {API_BASE_URI} from "../config.js"

const { play, stop } = useSound(selectionSfx)
const router = useRouter()

const vantaRef = ref(null)
let vantaEffect

const loadingLimits = ref(true)
const limits = ref(null)
const usageCounts = ref(null)

onMounted(() => {
  getUrlQueryParams()
})

const getUrlQueryParams = async () => {
  await router.isReady()
}

async function fetchLimits() {
  loadingLimits.value = true
  try {
    const response = await fetch(`${API_BASE_URI}/limits`, {redirect: 'follow'})
    if (!response.ok) {
      throw new Error('Failed to fetch limits')
    }
    const response_json = await response.json()
    limits.value = response_json['limits']
    usageCounts.value = response_json['usage_counts']
  } catch (err) {
    console.log(err)
  } finally {
    loadingLimits.value = false
  }
}

function getUsageTip(mode) {
  return loadingLimits.value ?
      'Loading usage counts...' :
      `Daily usage: ${usageCounts.value[mode]}/${limits.value[mode]}`
}

function getStartLabel(mode) {
  return limitReached(mode) ? 'Daily Limit Reached' : 'Start'
}

function getHoverClass(mode) {
  switch (mode) {
    case 'title-detectives': return 'hover:ring-primary'
    case 'sequel-salad': return 'hover:ring-accent'
    case 'bttf-trivia': return 'hover:ring-orange-600'
    case 'trivia': return 'hover:ring-yellow-300'
    default: return 'hover:ring-primary'
  }
}

function getTooltipClass(mode) {
  return limitReached(mode) ? 'tooltip-error' : 'tooltip-success'
}

function limitReached(mode) {
  return usageCounts.value &&
      limits.value &&
      usageCounts.value[mode] >= limits.value[mode]
}

onMounted(() => {
  vantaEffect = CLOUDS({
    el: vantaRef.value,
    THREE: THREE,
    skyColor: 0xfaa382
  })

  fetchLimits()
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
