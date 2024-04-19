<template>
  <div>
    <div v-if="loadingStats" class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>
    <div v-else-if="stats">
      <div class="text-center py-8">
        <div class="stats stats-vertical lg:stats-horizontal shadow">

          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div class="stat-title">Total quiz count</div>
            <div class="stat-value text-primary">{{ stats.stats.quiz_count_total }}</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div class="stat-title">Total points earned</div>
            <div class="stat-value text-secondary">{{ stats.stats.points_total }}</div>
          </div>

        </div>
      </div>
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
            <td>{{ stats.limit.daily_limit }}</td>
          </tr>
          <tr>
            <td>Daily Quiz Count</td>
            <td>{{ stats.limit.quiz_count }}</td>
          </tr>
          <tr>
            <td>Last Reset Time</td>
            <td>{{ stats.limit.last_reset_time }}</td>
          </tr>
          <tr>
            <td>Last Reset Date</td>
            <td>{{ stats.limit.last_reset_date }}</td>
          </tr>
          <tr>
            <td>Current Date</td>
            <td>{{ stats.limit.current_date }}</td>
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
      stats: null,
      loadingStats: false,
      error: null
    }
  },
  mounted() {
    this.fetchStats()
  },
  methods: {
    async fetchStats() {
      this.loadingStats = true
      try {
        const response = await fetch(`${API_BASE_URI}/stats`, {redirect: 'follow'})
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        this.stats = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loadingStats = false
      }
    }
  }
}
</script>
