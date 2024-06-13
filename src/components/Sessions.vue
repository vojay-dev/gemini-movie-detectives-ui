<template>
  <div>
    <div class="text-center py-8"><h1 class="mb-5 text-5xl font-bold"><span class="gemini">Quiz</span> Sessions</h1></div>
    <div v-if="loading" class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>
    <div v-else-if="sessions">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
          <tr>
            <th>Session ID</th>
            <th>Movie title</th>
            <th>Started at</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="session in sessions">
            <td>{{ session.quiz_id }}</td>
            <td>{{ session.movie.title }}</td>
            <td>{{ session.started_at }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>No sessions available.</div>
  </div>
</template>

<script setup>
import {API_BASE_URI} from '../config.js'
import {onMounted, ref} from 'vue'

const sessions = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchSessions() {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URI}/sessions`, {redirect: 'follow'})
    if (!response.ok) {
      throw new Error('Failed to fetch sessions')
    }
    sessions.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchSessions)
</script>
