<script setup lang="ts">
import type {Point} from '@/types'
import SerTriangle from '@/components/SerTriangle.vue'
import {randomInteger} from '@/helpers'
import {ref, computed, reactive, watch} from 'vue'

let interval: ReturnType<typeof setInterval>
const speedReal = ref(-150)
const speed = computed(() => +speedReal.value + 200)
const isDisabledRange = ref(false)
const isDisabledStart = computed(() => {
  return (
    isDisabledRange.value ||
    coefficient.value <= 1 ||
    triangleTops.value.length < 3
  )
})
const countPoints = computed(() => points.length)
const coefficient = ref(2)
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
  const number = randomInteger(0, triangleTops.value.length - 1)
  const lastPoint = points.at(-1)
  if (!lastPoint) return
  const x = Math.round(
    (triangleTops.value[number].x + lastPoint.x) / coefficient.value
  )
  const y = Math.round(
    (triangleTops.value[number].y + lastPoint.y) / coefficient.value
  )
  points.push({x, y})
}

function startAddingNewPoints() {
  isDisabledRange.value = true
  interval = setInterval(() => {
    addNewPoint()
  }, Math.abs(speedReal.value))
}

function stopAddingNewPoints() {
  isDisabledRange.value = false
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

function addTop() {
  const x = randomInteger(0, 500)
  const y = randomInteger(0, 500)
  triangleTops.value.push({x, y})
}

function deleteTop() {
  triangleTops.value.splice(-1)
}

watch(coefficient, () => clearNewPoints())
watch(
  () => triangleTops.value.length,
  () => {
    stopAddingNewPoints()
    clearNewPoints()
  }
)
</script>

<template>
  <div class="min-h-screen bg-slate-200 flex flex-col">
    <header class="mb-10">
      <h1 class="text-center text-3xl">Треугольник Серпинского</h1>
      <a
        class="block w-fit mx-auto text-blue-400"
        href="https://www.youtube.com/watch?v=Nx3_nX8UoMo"
        target="_blank"
        >Подробнее тут</a
      >
    </header>
    <main class="container mx-auto px-3 grow">
      количество итераций: {{ countPoints }}
      <label class="block">
        скорость
        <input
          class="cursor-pointer disabled:cursor-not-allowed"
          type="range"
          v-model="speedReal"
          min="-190"
          max="0"
          :disabled="isDisabledRange"
        />
        {{ speed }}
      </label>
      <label>
        коэффициент 1/
        <input
          class="w-10"
          type="number"
          v-model="coefficient"
        />
      </label>
      <SerTriangle
        class="mx-auto"
        :points="points"
        :triangle-tops="triangleTops"
        @changePosition="changePosition"
      />
      <button
        class="bg-teal-600 text-white px-5 py-10 disabled:cursor-not-allowed disabled:opacity-50 transition-opacity"
        type="button"
        @click="startAddingNewPoints"
        :disabled="isDisabledStart"
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
      <button
        class="bg-green-600 text-white px-5 py-10"
        type="button"
        @click="addTop"
      >
        Добавить вершину
      </button>
      <button
        class="bg-red-600 text-white px-5 py-10"
        type="button"
        @click="deleteTop"
      >
        Удалить вершину
      </button>
    </main>
    <footer></footer>
  </div>
</template>
