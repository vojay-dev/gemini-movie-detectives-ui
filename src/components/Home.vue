<template>
  <div class="hero min-h-screen" :style="{ 'background-image': `url(${this.backgroundImg})` }">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold">Welcome to the <span class="gemini">Gemini</span> Movie Detectives</h1>
        <p class="mb-5">Test your movie knowledge, powered by AI!</p>
        <router-link to="/quiz" tag="button" class="btn">Get started</router-link>
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
