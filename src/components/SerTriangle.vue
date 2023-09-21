<script setup lang="ts">
import type {Point} from '@/types'
import {computed} from 'vue'

const props = defineProps<{
  points: Array<Point>
  triangleTops: Array<Point>
}>()

const emit = defineEmits(['changePosition'])

let idx: number
let divX: number
let divY: number

const triangleTopsToString = computed(() =>
  props.triangleTops.reduce((acc, cur) => (acc += `${cur.x},${cur.y} `), '')
)

function handleMouseDown(index: number, x: number, y: number, e: MouseEvent) {
  idx = index
  divX = e.clientX - x
  divY = e.clientY - y
  document.addEventListener('mousemove', onMouseMove)
}

function handleMouseUp() {
  document.removeEventListener('mousemove', onMouseMove)
}

function onMouseMove(e: MouseEvent) {
  const divisionX = e.clientX - divX
  const divisionY = e.clientY - divY
  emit('changePosition', idx, divisionX, divisionY)
}
</script>

<template>
  <svg
    class="border border-solid border-red-600"
    width="500"
    height="500"
    viewBox="0 0 500 500"
    stroke="black"
  >
    <polygon
      :points="triangleTopsToString"
      fill="transparent"
    />
    <circle
      v-for="(point, index) in triangleTops"
      :key="index"
      :cx="point.x"
      :cy="point.y"
      r="10"
      class="cursor-pointer"
      @mousedown="handleMouseDown(index, point.x, point.y, $event)"
      @mouseup="handleMouseUp"
    />
    <circle
      v-for="(point, index) in points"
      :key="index"
      :cx="point.x"
      :cy="point.y"
      r="1"
    />
  </svg>
</template>
