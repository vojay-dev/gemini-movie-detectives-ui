<template>
  <div class="container mx-auto justify-center gap-2 grid lg:grid-cols-3 grid-cols-1 mb-10">
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold">About <span class="gemini">Movie Detectives</span></h1>
        <p class="mb-2 text-justify">
          Gemini Movie Detectives is a project aimed at leveraging the power of the Gemini Pro model via VertexAI to
          create an engaging quiz game using the latest movie data from The Movie Database (TMDB).
          <br /><br />
          This project was created as part of the <a href="https://googleai.devpost.com/" class="link link-hover link-info" target="_blank">Google AI Hackathon 2024</a>.
        </p>
        <h2 class="text-2xl gemini">Backend</h2>
        <p class="mb-2 text-justify">
          The backend infrastructure is built with FastAPI and Python, employing the Retrieval-Augmented Generation (RAG)
          methodology to enrich queries with real-time metadata. Utilizing Jinja templating, the backend modularizes
          prompt generation into base, personality, and data enhancement templates, enabling the generation of accurate
          and engaging quiz questions.
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
          or languages is as easy as adding more Jinja template modules. With very little effort, this can change the
          full game experience, reducing the effort for developers. Try it yourself and change the AI personality
          in the quiz configuration.
        </p>
      </div>
    </div>
    <div class="col-span-2 card bg-base-300 shadow-xl m-5">
      <div class="card-body">
        <img src="../assets/system-overview.png" alt="system overview" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
