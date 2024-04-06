<template>
  <div>
    <div v-if="loading" class="text-center"><span class="loading loading-spinner text-info"></span></div>
    <div v-else-if="limitStats">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Daily Limit</td>
            <td>{{ limitStats.daily_limit }}</td>
          </tr>
          <tr>
            <td>Daily Quiz Count</td>
            <td>{{ limitStats.quiz_count }}</td>
          </tr>
          <tr>
            <td>Last Reset Time</td>
            <td>{{ limitStats.last_reset_time }}</td>
          </tr>
          <tr>
            <td>Last Reset Date</td>
            <td>{{ limitStats.last_reset_date }}</td>
          </tr>
          <tr>
            <td>Current Date</td>
            <td>{{ limitStats.current_date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>No stats available.</div>
  </div>
</template>

<script>
import { API_BASE_URI } from '../config.js'

export default {
  name: 'Stats',
  data() {
    return {
      limitStats: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchLimitStats()
  },
  methods: {
    async fetchLimitStats() {
      this.loading = true
      try {
        const response = await fetch(`${API_BASE_URI}/limit`, {redirect: 'follow'})
        if (!response.ok) {
          throw new Error('Failed to fetch limit stats')
        }
        this.limitStats = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
