<template>
  <div class="container mx-auto h-[calc(100vh-68px)] pt-5 pb-10">
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradient-stroke" gradientUnits="objectBoundingBox" gradientTransform="rotate(100)">
          <stop offset="0%" stop-color="#217BFE"/>
          <stop offset="27%" stop-color="#078EFB"/>
          <stop offset="50%" stop-color="#A190FF"/>
          <stop offset="100%" stop-color="#BD99FE"/>
        </linearGradient>
      </defs>
    </svg>
    <VueFlow :nodes="nodes" :edges="edges" @nodeDragStop="onNodeDragStop">
      <MiniMap maskColor="rgb(7, 14, 29, 0.7)" />
      <Background />
    </VueFlow>
  </div>
</template>

<script setup>
import {VueFlow} from "@vue-flow/core"
import {Background} from '@vue-flow/background'
import {MiniMap} from '@vue-flow/minimap'
import {ref} from "vue"

const nodes = ref([
  {"id":"backend","position":{"x":542,"y":463},"data":{"label":"Movie Detectives Backend (FastAPI)"},"style":{"backgroundColor":"#4bffc8"}},
  {"id":"frontend","position":{"x":856,"y":596},"data":{"label":"Movie Detectives Frontend (VueJS)"},"style":{"backgroundColor":"#4bffc8"}},
  {"id":"gemini","position":{"x":120,"y":206},"data":{"label":"Gemini"},"style":{"backgroundColor":"#4ba4ff"}},
  {"id":"imagen","position":{"x":264,"y":98},"data":{"label":"Imagen"},"style":{"backgroundColor":"#4ba4ff"}},
  {"id":"tts","position":{"x":552,"y":28},"data":{"label":"Google Text-to-Speech"},"style":{"backgroundColor":"#da87ff"}},
  {"id":"firebase","position":{"x":1137,"y":310},"data":{"label":"Firebase"},"style":{"backgroundColor":"#ff7070"}},
  {"id":"wiki","position":{"x":880,"y":98},"data":{"label":"Wikipedia"},"style":{"backgroundColor":"#c3ff6e"}},
  {"id":"tmdb","position":{"x":1076,"y":206},"data":{"label":"The Movie Database"},"style":{"backgroundColor":"#ffc66e"}}
])

// these are our edges
const edges = ref([
  { id: '1', source: 'backend', target: 'frontend' },
  { id: '2', source: 'gemini', target: 'backend', animated: true, label: "Quiz generation" },
  { id: '3', source: 'imagen', target: 'backend', animated: true, label: "Fake movie poster generation" },
  { id: '4', source: 'tts', target: 'backend', animated: true, label: "Speech synthesis" },
  { id: '5', source: 'firebase', target: 'backend', animated: true, label: "User data, franchise data, usage data, authentication" },
  { id: '6', source: 'wiki', target: 'backend', animated: true, label: "Context data about movies and franchises" },
  { id: '7', source: 'tmdb', target: 'backend', animated: true, label: "Movie metadata" },
  { id: '8', source: 'firebase', target: 'frontend', animated: true, label: "Authentication" }
])

// log nodes on drag stop to help creating layout
function onNodeDragStop(event) {
  nodes.value.forEach((node) => {
    if (node.id === event.node.id) {
      node.position = event.node.position
    }
  })

  console.log(JSON.stringify(nodes.value))
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
</style>
