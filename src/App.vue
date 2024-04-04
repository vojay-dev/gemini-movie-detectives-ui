<template>
  <div class="navbar bg-base-300 text-neutral-content">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Gemini Movie Detectives</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-4">
        <li><router-link to="/" v-bind:class="{ 'active': currentRouteName === 'Home' }">Home</router-link></li>
        <li><router-link to="/quiz" v-bind:class="{ 'active': currentRouteName === 'Quiz' }">Quiz</router-link></li>
      </ul>
    </div>
  </div>
  <router-view class="py-4"></router-view>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'App',
  setup () {
    const route = useRoute()
    const currentRouteName = computed(() => route.name)
    return { currentRouteName }
  }
}
</script>
