<template>
  <div class="custom-cursor" :style="cursorStyle"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorStyle = ref({
  left: '0px',
  top: '0px',
  width: '30px',
  height: '30px'
})

function updateCursorPosition(e) {
  requestAnimationFrame(() => {
    cursorStyle.value.left = `${e.clientX}px`
    cursorStyle.value.top = `${e.clientY}px`

    const target = e.target
    const isClickable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.clickable === 'true'

    if (isClickable) {
      cursorStyle.value.width = '50px'
      cursorStyle.value.height = '50px'
    } else {
      cursorStyle.value.width = '30px'
      cursorStyle.value.height = '30px'
    }
  })
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursorPosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}
</style>
