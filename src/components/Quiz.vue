<template>
  <div class="container mx-auto flex justify-center">
    <button v-if="!gameStarted && !loading" @click="fetchQuizData" class="btn btn-primary">Start Game</button>
    <div v-if="loading" class="text-center"><span class="loading loading-spinner text-info"></span></div>
    <div v-if="gameStarted && !loading" class="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div class="md:row-span-2">
        <figure class="max-w-lg">
          <img class="h-auto max-w-full rounded-lg" :src="quizData.movie.poster_url" alt="movie poster">
          <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Movie poster</figcaption>
        </figure>
      </div>
      <div class="md:col-span-2 md:col-start-2 row-start-1 mockup-window bg-base-300">
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
      <div class="md:col-span-2 md:col-start-2 row-start-2">
        <div class="flex flex-row gap-2">
          <div class="basis-3/4">
            <input type="text" placeholder="Type your answer here" class="input input-bordered input-info w-full" />
          </div>
          <div class="basis-1/4">
            <button class="btn btn-outline btn-success w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1792 1792"><path fill="currentColor" d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45q-14 8-31 8q-11 0-24-5l-453-185l-242 295q-18 23-49 23q-13 0-22-4q-19-7-30.5-23.5T640 1728v-349l864-1059l-1069 925l-395-162q-37-14-40-55q-2-40 32-59L1696 9q15-9 32-9q20 0 36 11"/></svg>
              Send
            </button>
          </div>
        </div>
        <div class="my-2">Press <kbd class="kbd">enter ↵</kbd> or click <span class="text-success">Send</span> to submit your answer, hover text to see second hint</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blurred {
  filter: blur(5px);
  cursor: pointer;
}
</style>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      gameStarted: false,
      loading: false,
      quizData: null,
      showHint2: false // Track hover state
    }
  },
  created() {
    this.randomRobot = Math.floor(Math.random() * 1000)
  },
  methods: {
    async fetchQuizData() {
      try {
        this.loading = true
        const response = await fetch('http://localhost:8000/quiz', {
          method: 'POST'
        })
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data')
        }
        this.quizData = await response.json()
        this.gameStarted = true
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    generateRoboHash() {
      return `https://robohash.org/${this.randomRobot}`
    }
  }
}
</script>
