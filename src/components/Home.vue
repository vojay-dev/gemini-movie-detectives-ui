<template>
  <div class="hero h-[calc(100vh-68px)]" :style="{ 'background-image': `url(${this.backgroundImg})` }">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold">Welcome to the <span class="gemini">Gemini</span> Movie Detectives</h1>
        <p class="mb-5">Test your movie knowledge, powered by <span class="badge badge-info badge-outline">AI</span>!</p>
        <div class="flex flex-wrap gap-4 items-center justify-center">
          <div><router-link to="/quiz" tag="button" class="btn">Get started</router-link></div>
          <div><a href="https://www.buymeacoffee.com/vojay" target="_blank"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=vojay&button_colour=191e24&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" /></a></div>
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
