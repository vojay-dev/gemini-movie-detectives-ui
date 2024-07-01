<template>
  <div class="container mx-auto h-[calc(100vh-68px)] pt-5 pb-10">
    <VueFlow :nodes="nodes" :edges="edges" @nodeDragStop="onNodeDragStop">
      <MiniMap />
      <Background />
    </VueFlow>
  </div>
</template>

<script setup>
import {VueFlow} from "@vue-flow/core";
import {Background} from '@vue-flow/background'
import {MiniMap} from '@vue-flow/minimap'
import {ref} from "vue";

const position = { x: 0, y: 0 }
const nodes = ref([
  { id: '1', position, data: { label: 'Node 1' }},
  { id: '2', position, data: { label: 'Node 2' }},
  { id: '3', position, data: { label: 'Node 3' }}
])

// these are our edges
const edges = ref([
  { id: 'e1->2', source: '1', target: '2'},
  { id: 'e2->3', source: '2', target: '3', animated: true },
  { id: 'e3->4', source: '3', target: '4' }
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
