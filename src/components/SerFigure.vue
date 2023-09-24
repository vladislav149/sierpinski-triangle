<script setup lang="ts">
import type {Point} from '@/types'
import downloadIMG from '@/helpers/downloadIMG'
import {ref, computed} from 'vue'

const props = defineProps<{
  points: Array<Point>
  figureTops: Array<Point>
  maxFieldSize: number
}>()

const emit = defineEmits<{
  changePosition: [idx: number, divisionX: number, divisionY: number]
}>()

const refSvg = ref<SVGElement | null>(null)

let idx: number
let divX: number
let divY: number

const triangleTopsToString = computed(() =>
  props.figureTops.reduce((acc, cur) => (acc += `${cur.x},${cur.y} `), '')
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

function downloadPNG() {
  downloadIMG(
    refSvg.value?.parentNode as HTMLDivElement,
    props.maxFieldSize,
    props.maxFieldSize,
    'png',
    'sierpinski'
  )
}

defineExpose({downloadPNG})
</script>

<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mx-auto border border-solid border-red-600"
      :width="maxFieldSize"
      :height="maxFieldSize"
      stroke="black"
      ref="refSvg"
    >
      <polygon
        :points="triangleTopsToString"
        fill="transparent"
      />
      <circle
        v-for="(point, index) in figureTops"
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
  </div>
</template>
