<template>
  <div>
    <div ref="vantaRef" class="vanta-bg opacity-50"></div>
    <div>
    <!-- particles for correct answers -->
    <vue-particles
        v-if="quizResult && quizResult.result.points > 1"
        id="tsparticles"
        :options=particleSettings
    />

    <div v-if="gameStarted || loading" class="container mx-auto flex justify-center py-4 px-4">
      <!-- loading -->
      <div v-if="loading" class="text-center"><LoadingAnimation loadingText="Loading" /></div>

      <!-- game started -->
      <div v-if="gameStarted && !loading" class="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div class="md:row-span-2">
          <div class="divider divider-info py-4 my-6 md:hidden">AI generated Movie Poster</div>
          <kinesis-container>
            <kinesis-element :strength="20" type="depth">
              <figure class="max-w-lg tooltip tooltip-open tooltip-bottom tooltip-secondary" data-tip="This is an AI generated movie poster">
                <img
                    v-if="!imageError"
                    ref="posterImage"
                    class="h-auto max-w-full rounded-lg"
                    :src="`${API_BASE_URI}${quizData.poster}`"
                    @error="handleImageError"
                >
                <div v-else class="h-[calc(100vh-50vh)] max-w-full rounded-lg skeleton flex items-center justify-center p-8">
                  <span class="text-center text-gray-500">
                    The AI could not generate a poster for this sequel, but no worries—you can surely figure it out without one!
                  </span>
                </div>
              </figure>
            </kinesis-element>
          </kinesis-container>
        </div>

        <!-- Game running -->
        <div v-if="!processingAnswer && !gameFinished" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">
          <div class="grid grid-cols-1 gap-4 px-4 py-4">

            <div class="w-full quiz-mode-title text-center">
              Sequel Salad
            </div>

            <div class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-16 rounded-full">
                  <img alt="Chat" :src="getBotAvatar(props.personality)" />
                </div>
              </div>
              <div class="chat-header">
                Gemini
              </div>
              <div class="chat-bubble">
                I have come up with a new movie for an existing movie franchise; your task is to find out which franchise it is. Here comes my plot...
              </div>
              <div class="chat-footer opacity-50">
                Session: {{ quizId }}
              </div>
            </div>

            <div class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-16 rounded-full">
                  <img alt="Chat" :src="getBotAvatar(props.personality)" />
                </div>
              </div>
              <div class="chat-header">
                Gemini
              </div>
              <div class="chat-bubble">{{ quizData.question.sequel_plot }}</div>
              <div class="chat-footer opacity-50">
                Session: {{ quizId }}
              </div>
            </div>

            <div class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-16 rounded-full">
                  <img alt="Chat" :src="getBotAvatar(props.personality)" />
                </div>
              </div>
              <div class="chat-header">
                Gemini
              </div>
              <div class="chat-bubble">The title of the sequel is: <strong class="gemini">{{ quizData.question.sequel_title }}</strong></div>
              <div class="chat-footer opacity-50">
                Session: {{ quizId }}
              </div>
            </div>

          </div>
        </div>

        <!-- Processing Answer -->
        <div v-if="processingAnswer && !gameFinished" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">
          <div class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>
        </div>

        <!-- Game finished -->
        <div v-if="!processingAnswer && gameFinished && quizResult" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">

          <div class="chat chat-end px-3">
            <div v-if="profile && profile.photo_url" class="chat-image avatar">
              <div class="w-16 rounded-full">
                <img alt="You" :src="profile.photo_url" />
              </div>
            </div>
            <div class="chat-header">
              You
            </div>
            <div class="chat-bubble chat-bubble-info">{{ quizResult.user_answer }}</div>
          </div>

          <div class="chat chat-start px-3">
            <div class="chat-image avatar">
              <div class="w-16 rounded-full">
                <img alt="Chat" :src="getBotAvatar(props.personality)" />
              </div>
            </div>
            <div class="chat-header">
              Gemini
            </div>
            <div class="chat-bubble">{{ quizResult.result.answer }}</div>
            <div class="chat-footer opacity-50">
              Session: {{ quizId }}
            </div>
          </div>

          <div class="chat chat-start px-3">
            <div class="chat-image avatar">
              <div class="w-16 rounded-full">
                <img alt="Chat" :src="getBotAvatar(props.personality)" />
              </div>
            </div>
            <div class="chat-header">
              Gemini
            </div>
            <div class="chat-bubble">
              The franchise I was looking for is: <strong class="gemini">{{ quizResult.franchise }}</strong>.
            </div>
            <div class="chat-footer opacity-50">
              Session: {{ quizId }}
            </div>
          </div>

          <div class="chat chat-start px-3">
            <div class="chat-image avatar">
              <div class="w-16 rounded-full">
                <img alt="Chat" :src="getBotAvatar(props.personality)" />
              </div>
            </div>
            <div class="chat-header">
              Gemini
            </div>
            <div class="chat-bubble">I give you <strong class="text-warning">{{ quizResult.result.points }} point(s)</strong>!</div>
            <div class="chat-footer opacity-50">
              Points
            </div>
          </div>

        </div>

        <div class="md:col-span-2 md:col-start-2 row-start-2">
          <div v-if="!gameFinished" class="flex flex-row gap-2">
            <div class="basis-3/4">
              <input type="text" v-model="userInput" @keyup.enter="submitAnswer" placeholder="Type your answer here" class="input input-bordered input-info w-full" />
            </div>
            <div class="basis-1/4">
              <button @click="submitAnswer" class="btn btn-outline btn-success w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1792 1792"><path fill="currentColor" d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45q-14 8-31 8q-11 0-24-5l-453-185l-242 295q-18 23-49 23q-13 0-22-4q-19-7-30.5-23.5T640 1728v-349l864-1059l-1069 925l-395-162q-37-14-40-55q-2-40 32-59L1696 9q15-9 32-9q20 0 36 11"/></svg>
                Send
              </button>
            </div>
          </div>
          <div v-if="!gameFinished" class="my-2">Press <kbd class="kbd">enter ↵</kbd> or click <span class="text-success">Send</span> to submit your answer, hover text to see second hint</div>
          <div v-if="gameFinished" class="flex flex-row justify-end gap-2">
            <router-link to="/" tag="button" class="btn btn-outline btn-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z" clip-rule="evenodd"/></svg>
              Back home
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- modal for API errors -->
    <dialog id="errorModal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-neutral-900">
        <h3 class="font-bold text-lg gemini">API Error</h3>
        <p class="py-2">Oops! Something went wrong. Keep in mind, this is a prototype. Take a break, watch a movie, and come back for another round!</p>
        <p class="py-2 font-bold text-lg">Error:</p>
        <pre class="bg-neutral-950 rounded p-3 py-2 text-xs" style="white-space: pre-wrap; overflow-wrap: anywhere;">{{ errorMessage }}</pre>
        <div class="modal-action">
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </dialog>
  </div>
  </div>
</template>

<script setup>
import {API_BASE_URI, PARTICLE_SETTINGS} from '../../config.js'
import {defineProps, onBeforeUnmount, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {fetchProfile} from "../../main.js"
import {finishQuiz, startQuiz} from "../../quiz.js"
import {getBotAvatar, playAudio} from "../../util.js"
import LoadingAnimation from "../LoadingAnimation.vue"
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import {isMobile} from "mobile-device-detect";

const props = defineProps({
  personality: String
})

const gameStarted = ref(false)
const gameFinished = ref(false)
const loading = ref(false)

const quizId = ref(null)
const quizData = ref(null)

const userInput = ref('')
const processingAnswer = ref(false)
const quizResult = ref(null)

const errorMessage = ref('')
const particleSettings = PARTICLE_SETTINGS
const router = useRouter()

const profile = ref(null)
const imageError = ref(false)

const vantaRef = ref(null)
let vantaEffect

function showModal() {
  const modal = document.getElementById('errorModal')
  modal.showModal()
}

function closeModal() {
  const modal = document.getElementById('errorModal')
  modal.close()
  router.push('/')
}

function handleImageError() {
  imageError.value = true
}

async function submitAnswer() {
  if (gameFinished.value || !userInput.value.trim()) {
    return
  }

  if (isMobile) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  processingAnswer.value = true

  const finishQuizData = await finishQuiz(quizId.value, userInput.value.trim())
  userInput.value = ''
  quizResult.value = finishQuizData.quiz_result

  processingAnswer.value = false
  gameFinished.value = true

  await playAudio(`${API_BASE_URI}${quizResult.value.speech}`)
}

onMounted(async () => {
  vantaEffect = HALO({
    el: vantaRef.value,
    THREE: THREE,
    size: 2
  })

  loading.value = true

  const startQuizData = await startQuiz(props.personality, 'sequel-salad')

  if (startQuizData.error) {
    errorMessage.value = startQuizData.error.substring(0, 500)
    showModal()
    return
  }

  quizId.value = startQuizData.quiz_id
  quizData.value = startQuizData.quiz_data

  const fetchProfileResult = await fetchProfile()

  profile.value = fetchProfileResult.profile
  loading.value = false
  gameStarted.value = true

  await playAudio(`${API_BASE_URI}${quizData.value.speech}`)
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
