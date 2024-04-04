<template>
  <div class="hero min-h-screen" style="background-image: url(https://unsplash.com/photos/evlkOfkQ5rE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bW92aWV8ZGV8MHx8fHwxNzEyMTI2OTI4fDA&force=true&w=1920);">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
        <p class="mb-5">Welcome to Gemini Movie Detectives - a movie quiz powered by Gemini API and TMDB API.</p>
        <router-link to="/quiz" tag="button" class="btn btn-info">Get started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
