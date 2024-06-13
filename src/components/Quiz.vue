<template>
  <vue-particles
      v-if="answerData && answerData.result.points > 0"
      id="tsparticles"
      :options=particleSettings
  />
  <div v-if="!gameStarted && !loading" class="hero h-[calc(100vh-68px)]" :style="{ 'background-image': `url(${backgroundImg})` }">
    <div class="hero-overlay bg-opacity-95"></div>
    <div class="hero-content text-center text-neutral-content mb-16">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold"><span class="gemini">Movie</span> Quiz</h1>
        <p class="mb-5">When you click on Start Game, a random movie will be selected and Gemini will think about a proper riddle for you. Your task is to guess the movie. Give it a try and see how many points you can get!</p>
        <div class="collapse bg-neutral-900">
          <input type="checkbox" class="peer" />
          <div class="text-left collapse-title bg-neutral-900 peer-checked:bg-info peer-checked:text-info-content">
            Toggle quiz configuration
          </div>
          <div class="collapse-content bg-neutral-900 peer-checked:bg-neutral-800">
            <p class="text-left py-3">With the following settings you can customize the quiz and adjust the difficulty. The default settings ensure that you have a balanced experienced, adjust them with care.</p>
            <div class="label">
              <span class="label-text">Minimum number of votes: </span><span class="badge badge-secondary badge-outline">{{ minVotes }}</span>
            </div>
            <input type="range" min="100" max="5000" value="1000" class="range range-secondary" v-model="minVotes"/>
            <div class="label">
              <span class="label-text">Minimum average rating:</span><span class="badge badge-info badge-outline">{{ minAvgRating }}</span>
            </div>
            <input type="range" min="1" max="8" value="5" step="1" class="range range-info" v-model="minAvgRating" />
            <div class="label">
              <span class="label-text">Popularity:</span>
            </div>
            <input type="range" min="1" max="3" value="3" step="1" class="range range-warning" v-model="popularity" />
            <div class="w-full flex justify-between text-xs px-2">
              <span>I know them all, challenge me</span>
              <span>Mostly popular</span>
            </div>
            <div class="grid grid-cols-2 gap-2 items-end mt-4">
              <div>
                <div class="label"><span class="label-text">AI Personality (<i>experimental</i>)</span></div>
                <select v-model="personality" class="select select-primary w-full max-w-xs">
                  <option value="default">Default</option>
                  <option value="christmas">Santa Claus</option>
                  <option value="scientist">Scientist</option>
                  <option value="dad">Dad Jokes</option>
                </select>
              </div>
              <div>
                <div class="label"><span class="label-text">Language (<i>experimental</i>)</span></div>
                <select v-model="language" class="select select-primary w-full max-w-xs">
                  <option value="default">English</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button @click="startQuiz" class="btn btn-outline btn-success mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M464.7 221.5L86.1 7.3C52.5-11.7 25 7.5 25 50v412c0 42.5 27.5 61.7 61.1 42.7l378.6-214.1c33.5-19.1 33.5-50.1 0-69.1"/></svg>
          Start Game
        </button>
      </div>
    </div>
  </div>

  <div v-if="gameStarted || loading" class="container mx-auto flex justify-center py-4 px-4">
    <div v-if="loading" class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>
    <div v-if="gameStarted && !loading" class="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div class="md:row-span-2">
        <div class="divider divider-info py-4 my-6 md:hidden">Movie Poster</div>
        <figure class="max-w-lg">
          <img
              ref="posterImage"
              class="h-auto max-w-full rounded-lg opacity-0"
              :src="quizData.movie.poster_url"
              @load="pixelatePoster"
          >
        </figure>
        <div ref="posterCanvasContainer"><canvas ref="posterCanvas" class="h-auto max-w-full rounded-lg"></canvas></div>
      </div>

      <!-- Game running -->
      <div v-if="!processingAnswer && !gameFinished" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">
        <div class="grid grid-cols-1 gap-4 px-4 py-4">

          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
              </div>
            </div>
            <div class="chat-header">
              Gemini
            </div>
            <div class="chat-bubble">{{ quizData.question.question }}</div>
            <div class="chat-footer opacity-50">
              Session: {{ quizData.quiz_id }}
            </div>
          </div>

          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
              </div>
            </div>
            <div class="chat-header">
              Gemini
            </div>
            <div class="chat-bubble">{{ quizData.question.hint1 }}</div>
            <div class="chat-footer opacity-50">
              Hint 1
            </div>
          </div>

          <div
              class="content-center"
              :class="{ blurred: !showHint2 }"
              @mouseover="showHint2 = true"
              @mouseleave="showHint2 = false"
          >
            <div class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
                </div>
              </div>
              <div class="chat-header">
                Gemini
              </div>
              <div class="chat-bubble">{{ quizData.question.hint2 }}</div>
              <div class="chat-footer opacity-50">
                Hint 2
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Processing Answer -->
      <div v-if="processingAnswer && !gameFinished" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">
        <div class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>
      </div>

      <!-- Game finished -->
      <div v-if="!processingAnswer && gameFinished && answerData" class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">

        <div class="chat chat-end px-3">
          <div class="chat-header">
            You
          </div>
          <div class="chat-bubble chat-bubble-info">{{ answerData.user_answer }}</div>
        </div>

        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
            </div>
          </div>
          <div class="chat-header">
            Gemini
          </div>
          <div class="chat-bubble">{{ answerData.result.answer }}</div>
          <div class="chat-footer opacity-50">
            Session: {{ quizData.quiz_id }}
          </div>
        </div>

        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
            </div>
          </div>
          <div class="chat-header">
            Gemini
          </div>
          <div class="chat-bubble">
            The movie I was looking for is: <strong class="gemini">{{ answerData.movie.title }}</strong>. It was released
            at <strong class="text-primary">{{ answerData.movie.release_date }}</strong>, was produced with a budget of <strong class="text-primary">${{ answerData.movie.budget.toLocaleString() }}</strong>
            and has an average rating of <strong class="text-primary">{{ answerData.movie.vote_average }}</strong> with <strong class="text-primary">{{ answerData.movie.vote_count }}</strong>
            votes on <a class="link link-hover font-bold text-white underline decoration-sky-600 hover:decoration-2" href="#" target="_blank">TMDB</a>.
          </div>
          <div class="chat-footer opacity-50">
            Session: {{ quizData.quiz_id }}
          </div>
        </div>

        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" :src="generateRoboHash()" />
            </div>
          </div>
          <div class="chat-header">
            Gemini
          </div>
          <div class="chat-bubble">I give you <strong class="text-warning">{{ answerData.result.points }} point(s)</strong>!</div>
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
          <a :href="'https://www.imdb.com/title/' + quizData.movie.imdb_id" target="_blank" class="btn btn-outline btn-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="m7.671 2.743l-.964.964a1 1 0 0 1-1.414-1.414l.964-.965a4.536 4.536 0 0 1 6.415 6.415l-.965.964a1 1 0 1 1-1.414-1.414l.964-.965a2.536 2.536 0 0 0-3.585-3.585Zm-3.964 2.55a1 1 0 0 1 0 1.414l-.964.965a2.536 2.536 0 0 0 3.585 3.585l.965-.964a1 1 0 0 1 1.414 1.414l-.964.964a4.536 4.536 0 0 1-6.415-6.414l.965-.964a1 1 0 0 1 1.414 0m5.5.914a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 1.414 1.414z" clip-rule="evenodd"/></svg>
            IMDB
          </a>
          <a :href="'https://www.themoviedb.org/movie/' + quizData.movie.id" target="_blank" class="btn btn-outline btn-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="m7.671 2.743l-.964.964a1 1 0 0 1-1.414-1.414l.964-.965a4.536 4.536 0 0 1 6.415 6.415l-.965.964a1 1 0 1 1-1.414-1.414l.964-.965a2.536 2.536 0 0 0-3.585-3.585Zm-3.964 2.55a1 1 0 0 1 0 1.414l-.964.965a2.536 2.536 0 0 0 3.585 3.585l.965-.964a1 1 0 0 1 1.414 1.414l-.964.964a4.536 4.536 0 0 1-6.415-6.414l.965-.964a1 1 0 0 1 1.414 0m5.5.914a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 1.414 1.414z" clip-rule="evenodd"/></svg>
            TMDB
          </a>
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
</template>

<script setup>
import Pixelate from 'pixelate'
import {API_BASE_URI, PARTICLE_SETTINGS} from '../config.js'
import backgroundImg from '../assets/bg-quiz.webp'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const gameStarted = ref(false)
const gameFinished = ref(false)
const loading = ref(false)
const quizData = ref(null)
const showHint2 = ref(false)
const userInput = ref('')
const processingAnswer = ref(false)
const answerData = ref(null)
const randomRobot = ref(Math.floor(Math.random() * 1000))
const minVotes = ref(1000)
const minAvgRating = ref(5)
const popularity = ref(3)
const personality = ref('default')
const language = ref('default')
const errorMessage = ref('')
const particleSettings = PARTICLE_SETTINGS
const pixelate = ref(null)
const router = useRouter()

const posterImage = ref(null)
const posterCanvas = ref(null)

function showModal() {
  const modal = document.getElementById('errorModal')
  modal.showModal()
}

function closeModal() {
  const modal = document.getElementById('errorModal')
  modal.close()
  router.push('/')
}

async function startQuiz() {
  try {
    const url = `${API_BASE_URI}/quiz`
    const requestBody = {
      vote_avg_min: minAvgRating.value,
      vote_count_min: minVotes.value,
      popularity: popularity.value,
      personality: personality.value,
      language: language.value
    }

    loading.value = true
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      redirect: 'follow'
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error)
    }
    quizData.value = await response.json()
    gameStarted.value = true
  } catch (error) {
    errorMessage.value = error.toString().substring(0, 500)
    showModal()
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function submitAnswer() {
  if (gameFinished.value || !userInput.value.trim()) {
    return
  }

  try {
    const url = `${API_BASE_URI}/quiz/${quizData.value.quiz_id}/answer`
    const requestBody = {
      answer: userInput.value.trim()
    }

    processingAnswer.value = true
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      redirect: 'follow'
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error)
    }
    answerData.value = await response.json()
    userInput.value = ''
  } catch (error) {
    errorMessage.value = error.toString().substring(0, 500)
    showModal()
    console.error(error)
  } finally {
    processingAnswer.value = false
    gameFinished.value = true
    revealPoster()
  }
}

function generateRoboHash() {
  return `https://robohash.org/${randomRobot.value}`
}

async function pixelatePoster() {
  const imageElement = posterImage.value
  const canvasElement = posterCanvas.value

  // Ensure image respects CORS
  if (imageElement.complete) {
    setupPixelate()
  } else {
    imageElement.crossOrigin = 'Anonymous'
    imageElement.onload = setupPixelate
    imageElement.src = `${imageElement.src}?${new Date().getTime()}`
  }
}

function setupPixelate() {
  const imageElement = posterImage.value
  const canvasElement = posterCanvas.value

  pixelate.value = new Pixelate(imageElement, { amount: 0.99, canvas: canvasElement })
  imageElement.classList.toggle("hidden")
}

function revealPoster() {
  const imageElement = posterImage.value

  imageElement.classList.toggle("hidden")
  imageElement.classList.toggle("opacity-0")
  pixelate.value.canvas.classList.toggle("hidden")
}
</script>

<style scoped>
.blurred {
  filter: blur(5px);
  cursor: pointer;
}
</style>
