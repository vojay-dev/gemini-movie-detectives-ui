<template>
  <div>
    <div v-if="loading" class="text-center"><span class="loading loading-spinner text-info"></span></div>
    <div v-else-if="sessions">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
          <tr>
            <th></th>
            <th>Session ID</th>
            <th>Movie title</th>
            <th>Started at</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="session in sessions">
            <th>1</th>
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
        const response = await fetch(`${API_BASE_URI}/sessions`)
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
