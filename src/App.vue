<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Gemini Movie Detectives</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/quiz">Quiz</router-link></li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>
