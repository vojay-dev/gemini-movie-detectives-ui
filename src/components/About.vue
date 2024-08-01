<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="flex w-4/5 lg:w-3/5 flex-col border-opacity-50 mx-auto pt-10">
      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <h1 class="mb-5 text-5xl font-bold">About <span class="gemini">Movie Detectives</span></h1>
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <p class="mb-2 text-justify">
          Gemini Movie Detectives harnesses Google's AI to revolutionize educational gaming, transforming movie trivia
          into a proof-of-concept gateway for AI-driven, adaptive learning across all subjects, challenging your inner
          movie nerd while showcasing how AI can reshape education in schools and universities.
        </p>

        <div role="alert" class="alert">
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
          <span>
            To manage costs and maintain the prototype as a free-to-use service, I've implemented daily limits for each
            game mode. You can find these limits displayed on the game mode selection screen. They reset automatically at
            midnight, ensuring a fresh start each day.
          </span>
        </div>

      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <img src="../assets/competition-star.svg" alt="Gemini API Developer Competition" />
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <p class="mb-2 text-justify">
          This project was created as part of the <a href="https://ai.google.dev/competition" class="link link-hover font-bold text-white underline decoration-sky-600 hover:decoration-2" target="_blank">Gemini API Developer Competition 2024</a>.
        </p>
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <img src="../assets/system-overview.png" @click="showSystemOverview = !showSystemOverview" alt="system overview" width="1200" />
        <FsLightbox
              :toggler="showSystemOverview"
              :sources="[systemOverview]"
        />
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-20">
          <h2 class="text-2xl gemini">Backend</h2>
          <p class="mb-2 text-justify">
            The backend infrastructure is built with FastAPI and Python, employing the Retrieval-Augmented Generation (RAG)
            methodology to enrich queries with real-time metadata. Utilizing Jinja templating, the backend modularizes
            prompt generation into base, personality, and data enhancement templates, enabling the generation of accurate
            and engaging quiz questions in different game modes. Each game mode uses a different combination of data source
            showcasing the broad range of possibilities how to employ advanced Gemini applications.
          </p>
          <p class="mb-2 text-justify">
            In addition to Gemini, the application leverages Google's state-of-the-art Text-to-Speech AI to synthesize quiz
            questions, dramatically enhancing the immersive atmosphere of a professional trivia game show. Moreover, the
            Sequel Salad game mode demonstrates the power of AI integration by utilizing Gemini to generate creative prompts.
            These prompts are then seamlessly fed into Google's cutting-edge Imagen text-to-image diffusion model, producing
            fake movie posters. This sophisticated interplay of various AI models showcases the limitless potential for
            creating captivating and dynamic game experiences, pushing the boundaries of what's possible in interactive
            entertainment.
          </p>
          <p class="mb-2 text-justify">
            The application's infrastructure is further strengthened by the integration of Google Firebase. This integration
            enables secure user authentication, facilitating personalized interactions within the app. Firestore is used to
            store and manage essential user data, powering the dynamic rendering of user profiles with game statistics.
            Additionally, it handles crucial metadata, including movie franchise information and game mode usage metrics
            together with configurable limits, allowing for precise control over daily operational costs.
          </p>
          <h2 class="text-2xl gemini">Frontend</h2>
          <p class="mb-2 text-justify">
            The frontend is powered by Vue 3 and Vite, supported by daisyUI and Tailwind CSS for efficient frontend
            development. Together, these tools provide users with a sleek and modern interface for seamless interaction
            with the backend.
          </p>
          <h2 class="text-2xl gemini">Conclusion</h2>
          <p class="mb-2 text-justify">
            In Movie Detectives, quiz answers are interpreted by the Language Model (LLM) once again, allowing for dynamic
            scoring and personalized responses. This showcases the potential of integrating LLM with RAG in game design and
            development, paving the way for truly individualized gaming experiences. Furthermore, it demonstrates the
            potential for creating engaging quiz trivia or educational games by involving LLM. Adding and changing personalities
            is as easy as adding more Jinja template modules. With very little effort, this can change the full game experience,
            reducing the effort for developers. Try it yourself and change the AI personality in the quiz configuration.
          </p>
          <p class="mb-2 text-justify">
            Movie Detectives tackles the challenge of maintaining student interest, improving knowledge retention, and making
            learning enjoyable. It's not just a movie quiz; it’s a glimpse into AI-enhanced education, pushing boundaries
            for accessible, engaging, and effective learning experiences.
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import FsLightbox from "fslightbox-vue/v3"
import {onBeforeUnmount, onMounted, ref} from "vue"
import systemOverview from '../assets/system-overview.png'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'

const showSystemOverview = ref(false)

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

<style scoped>
.vanta-bg {
  opacity: 0.2;
}
</style>
