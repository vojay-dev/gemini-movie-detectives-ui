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

<script>
import { API_BASE_URI } from '../config.js'

export default {
  name: 'Sessions',
  data() {
    return {
      sessions: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchSessions()
  },
  methods: {
    async fetchSessions() {
      this.loading = true
      try {
        const response = await fetch(`${API_BASE_URI}/sessions`, {redirect: 'follow'})
        if (!response.ok) {
          throw new Error('Failed to fetch sessions')
        }
        this.sessions = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
