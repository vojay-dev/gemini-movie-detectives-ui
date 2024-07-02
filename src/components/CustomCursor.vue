<template>
  <div v-if="isDesktop">
    <div class="custom-cursor" :style="cursorStyle"></div>
    <div class="inner-cursor" :style="innerCursorStyle"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorStyle = ref({
  left: '0px',
  top: '0px',
  width: '30px',
  height: '30px'
})

const innerCursorStyle = ref({
  left: '0px',
  top: '0px',
})

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

const isDesktop = ref(!('ontouchstart' in window || navigator.maxTouchPoints > 0))

// linear interpolation to smooth the motion
function lerp(start, end, factor) {
  return start + (end - start) * factor
}

// update the cursor position smoothly
function updateCursorPosition(e) {
  targetX = e.clientX
  targetY = e.clientY

  // Update inner cursor position immediately
  innerCursorStyle.value.left = `${e.clientX}px`
  innerCursorStyle.value.top = `${e.clientY}px`

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
  if (isDesktop.value) {
    window.addEventListener('mousemove', updateCursorPosition)
    animateCursor()
  }
})

onUnmounted(() => {
  if (isDesktop.value) {
    window.removeEventListener('mousemove', updateCursorPosition)
  }
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

.inner-cursor {
  position: fixed;
  pointer-events: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #217BFE;
  z-index: 10000;
  transform: translate(-50%, -50%);
}
</style>
