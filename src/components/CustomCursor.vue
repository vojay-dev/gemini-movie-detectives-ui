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

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

// linear interpolation to smooth the motion
function lerp(start, end, factor) {
  return start + (end - start) * factor
}

// update the cursor position smoothly
function updateCursorPosition(e) {
  targetX = e.clientX
  targetY = e.clientY

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
}

// animate the cursor
function animateCursor() {
  currentX = lerp(currentX, targetX, 0.2)
  currentY = lerp(currentY, targetY, 0.2)

  cursorStyle.value.left = `${currentX}px`
  cursorStyle.value.top = `${currentY}px`

  // call animateCursor recursively
  requestAnimationFrame(animateCursor)
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursorPosition)
  animateCursor()
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
