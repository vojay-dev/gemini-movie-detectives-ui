<template>
  <div class="container mx-auto justify-center gap-2 grid lg:grid-cols-3 grid-cols-1 mb-10">
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-screen-md">
        <h1 class="mb-5 text-5xl font-bold">About <span class="gemini">Movie Detectives</span></h1>
        <p class="mb-2 text-justify">
          Gemini Movie Detectives is a learning project to combine the Gemini 1.0 Pro model via VertexAI with up-to-date
          data about movies from The Movie Database (TMDB) in a fun quiz game.
        </p>
        <h2 class="text-2xl gemini">Backend</h2>
        <p class="mb-2 text-justify">
          The backend is implemented using FastAPI and Python based on the Retrieval-Augmented Generation methodology to
          enrich the LLM request with up-to-date metadata. Furthermore it uses Jinja templating to modularize the prompt
          generation, splitting it into base, personality and data enhancement templates. That way the LLM can generate
          accurate movie quiz questions.
        </p>
        <h2 class="text-2xl gemini">Frontend</h2>
        <p class="mb-2 text-justify">
          The frontend uses Vue 3 as the framework with Vite for frontend tooling. Together with daisyUI and Tailwind
          CSS it delivers a modern UI experience to interact with the backend.
        </p>
        <h2 class="text-2xl gemini">Conclusion</h2>
        <p class="mb-2 text-justify">
          The answers to quiz questions are interpreted by the LLM again. That way the LLM decides on the amount of
          points and even gives fun and individualized responses to the users answers. This shows the potential or using
          LLM with RAG in game design and development to create individualized experiences.
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
