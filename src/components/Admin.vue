<template>
  <div>
    <div class="flex w-3/4 flex-col border-opacity-50 mx-auto pt-10">

      <div class="divider">Reset Limits</div>

      <!-- normal state -->
      <div v-if="!error && !success && !loading">

        <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
          <div role="alert" class="alert alert-info">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              Limits prevent high Vertex AI costs to keep the prototype free to use. Resetting the daily limits is meant
              for the judges in order to be able to explore Movie Detectives without limitation. <strong>Please use this feature
              carefully as it will create additional costs</strong>. The judges should have received the password with the submission
              of the project, enter it below and submit the form to reset the daily limits.
            </span>
          </div>
        </div>
        <div class="card bg-base-300 rounded-box flex flex-row flex-wrap gap-4 justify-center items-center py-5">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg>
            <input type="password" class="grow" v-model="password" @keyup.enter="resetLimits" />
          </label>
          <button class="btn btn-outline btn-primary" @click="resetLimits">Reset</button>
        </div>
      </div>

      <!-- loading state -->
      <div v-if="loading" class="text-center"><span class="loading loading-lg loading-spinner text-info"></span></div>

      <!-- error state -->
      <div v-if="error" class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <div role="alert" class="alert alert-error">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>

      <!-- success state -->
      <div v-if="success" class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <div role="alert" class="alert alert-success">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>The limits for today have been successfully reset</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {API_BASE_URI} from "../config.js";
import {ref} from "vue";

const password = ref(null)
const loading = ref(false)
const error = ref(null)
const success = ref(false)

async function resetLimits() {
  if (!password.value) {
    return
  }

  const url = `${API_BASE_URI}/limits/reset`
  const body = { password: password.value }

  try {
    loading.value = true
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      throw new Error('Failed to reset limits')
    }

    password.value = null
    success.value = true
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
</script>
