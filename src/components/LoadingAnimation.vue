<template>
  <div class="gemini-loading-wrapper">
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-shadow"></div>
    <div class="gemini-loading-shadow"></div>
    <div class="gemini-loading-shadow"></div>
    <span :class="{ 'fade-out': !isActive, 'fade-in': isActive }">{{ loadingText }}</span>
  </div>
</template>

<script setup>
import {defineProps, ref, onMounted, onUnmounted, computed} from 'vue'

defineProps({
  loadingText: {
    type: String,
    default: 'Loading...'
  },
})

const words = [
  'Brewing AI magic...',
  'The robots are working hard...',
  'Just a sec, training 1000 neural networks...',
  'AI elves are crafting your request...',
  'Crunching the data cookies...',
  'Teaching the AI to juggle...',
  'Calculating pi...',
  'Waking up the coffee-driven algorithms...',
  'Summoning the AI wizards...',
  'Loading the thinking cap...',
  'Optimizing slightly terribly puns...',
  'Giving the hamster wheel a spin...',
  'Cloning some thinking synapses...',
  'Feeding the server squirrels...',
  'Juggling bits and bytes...',
  'Adding some extra sparkle to the AI...',
  'Brewing the perfect cup of code...',
]
const currentIndex = ref(0)
const isActive = ref(true)

const loadingText = computed(() => words[currentIndex.value])

const intervalId = ref(null)

const startRotating = () => {
  intervalId.value = setInterval(() => {
    isActive.value = false
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % words.length
      isActive.value = true
    }, 500)
  }, 2000)
}

onMounted(startRotating)

onUnmounted(() => clearInterval(intervalId.value))
</script>

<style scoped>
.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
</style>
