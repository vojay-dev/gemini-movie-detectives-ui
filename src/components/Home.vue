<template>
  <div class="hero h-[calc(100vh-68px)]" :style="{ 'background-image': `url(${this.backgroundImg})`, 'background-position': 'top' }">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold">Welcome to the <span class="gemini">Gemini</span> Movie Detectives</h1>
        <p class="mb-5">Test your movie knowledge, powered by <span class="badge badge-info badge-outline">AI</span>!</p>
        <div class="flex flex-wrap gap-4 items-center justify-center">
          <div><router-link to="/quiz" tag="button" class="btn btn-primary w-48">Get started</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImg from '../assets/bg-home.webp'

export default {
  name: 'Home',
  data() {
    return {
      backgroundImg: backgroundImg
    }
  }
}
</script>
