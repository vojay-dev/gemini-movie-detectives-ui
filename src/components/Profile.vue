<template>
  <pre>{{ user }}</pre>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useCurrentUser} from "vuefire";

const router = useRouter()
const route = useRoute()

const user = useCurrentUser()

console.log(route.query)

onMounted(() => {
  getUrlQueryParams()
});

const getUrlQueryParams = async () => {
  await router.isReady()
  console.log(route.query)
}
</script>
