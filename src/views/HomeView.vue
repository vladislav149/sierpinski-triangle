<script setup lang="ts">
import type {Point} from '@/types'
import SerTriangle from '@/components/SerTriangle.vue'
import {randomInteger} from '@/helpers'
import {ref, computed, reactive} from 'vue'

let interval: ReturnType<typeof setInterval>
const speedReal = ref(-150)
const speed = computed(() => +speedReal.value + 210)
const disabledRange = ref(false)
const countPoints = computed(() => points.length)
const triangleTops = ref<Array<Point>>([
  {
    x: 250,
    y: 50
  },
  {
    x: 450,
    y: 450
  },
  {
    x: 50,
    y: 450
  }
])

const points: Array<Point> = reactive([
  {
    x: 300,
    y: 200
  }
])

function addNewPoint() {
  const number = randomInteger(0, 2)
  const lastPoint = points.at(-1)
  if (!lastPoint) return
  const x = (triangleTops.value[number].x + lastPoint.x) / 2
  const y = (triangleTops.value[number].y + lastPoint.y) / 2
  points.push({x, y})
}

function startAddingNewPoints() {
  disabledRange.value = true
  interval = setInterval(() => {
    addNewPoint()
  }, Math.abs(speedReal.value))
}

function stopAddingNewPoints() {
  disabledRange.value = false
  clearInterval(interval)
}

function clearNewPoints() {
  points.splice(1)
}

function changePosition(index: number, positionX: number, positionY: number) {
  const isValid =
    positionX > 0 && positionX < 500 && positionY > 0 && positionY < 500

  if (!isValid) return
  clearNewPoints()
  triangleTops.value[index].x = positionX
  triangleTops.value[index].y = positionY
}
</script>

<template>
  <main>
    количество итераций: {{ countPoints }}
    <label class="block">
      скорость
      <input
        type="range"
        v-model="speedReal"
        min="-200"
        max="0"
        :disabled="disabledRange"
      />
      {{ speed }}
    </label>
    <SerTriangle
      class="mx-auto"
      :points="points"
      :triangle-tops="triangleTops"
      @changePosition="changePosition"
    />
    <button
      class="bg-teal-600 text-white px-5 py-10"
      type="button"
      @click="startAddingNewPoints"
    >
      Запустить
    </button>
    <button
      class="bg-red-600 text-white px-5 py-10"
      type="button"
      @click="stopAddingNewPoints"
    >
      Стоп
    </button>
    <button
      class="bg-yellow-600 text-white px-5 py-10"
      type="button"
      @click="clearNewPoints"
    >
      Очистить
    </button>
  </main>
</template>
