<script setup lang="ts">
import type {Point} from '@/types'
import SerFigure from '@/components/SerFigure.vue'
import SerHeader from '@/components/SerHeader.vue'
import SerFooter from '@/components/SerFooter.vue'
import SerControlButtons from '@/components/control/SerControlButtons.vue'
import {randomInteger} from '@/helpers'
import {ref, computed, reactive, watch} from 'vue'
const START_SPEED = -150
const CORRECT_SPEED = 200

const refFigure = ref<InstanceType<typeof SerFigure> | null>(null)

let interval: ReturnType<typeof setInterval>
const maxFieldSize = ref(500)
const realSpeed = ref(START_SPEED)
const speed = computed(() => realSpeed.value + CORRECT_SPEED)
const isDisabledRange = ref(false)
const countPoints = computed(() => points.length)
const coefficient = ref(2)
const figureTops = ref<Array<Point>>([
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
    x: 270,
    y: 200
  }
])

function addNewPoint() {
  const number = randomInteger(0, figureTops.value.length - 1)
  const lastPoint = points.at(-1)
  if (!lastPoint) return
  const x = Math.round(
    (figureTops.value[number].x + lastPoint.x) / coefficient.value
  )
  const y = Math.round(
    (figureTops.value[number].y + lastPoint.y) / coefficient.value
  )
  points.push({x, y})
}

function startAddingNewPoints() {
  isDisabledRange.value = true
  interval = setInterval(() => {
    addNewPoint()
  }, Math.abs(realSpeed.value))
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
    positionX > 0 &&
    positionX < maxFieldSize.value &&
    positionY > 0 &&
    positionY < maxFieldSize.value

  if (!isValid) return

  clearNewPoints()
  figureTops.value[index].x = positionX
  figureTops.value[index].y = positionY
}

function addTop() {
  const x = randomInteger(0, maxFieldSize.value)
  const y = randomInteger(0, maxFieldSize.value)
  figureTops.value.push({x, y})
}

function deleteTop() {
  figureTops.value.splice(-1)
}

function downloadPNG() {
  refFigure.value?.downloadPNG()
}

watch(coefficient, () => clearNewPoints())
watch(
  () => figureTops.value.length,
  () => {
    stopAddingNewPoints()
    clearNewPoints()
  }
)

watch(maxFieldSize, () => {
  const maxValue = figureTops.value.reduce((acc, cur) => {
    if (acc < cur.x) acc = cur.x
    if (acc < cur.y) acc = cur.y
    return acc
  }, 0)
  if (maxValue < maxFieldSize.value) return

  figureTops.value = figureTops.value.map(top => ({
    x: top.x < maxFieldSize.value ? top.x : maxFieldSize.value,
    y: top.y < maxFieldSize.value ? top.y : maxFieldSize.value
  }))
})

watch(figureTops, () => clearNewPoints())
</script>

<template>
  <div class="min-h-screen bg-slate-200 flex flex-col">
    <SerHeader />
    <main class="container mx-auto px-3 grow">
      <div class="flex justify-around">
        <div>
          <p class="mb-5">количество итераций: {{ countPoints }}</p>
          <label class="block mb-5">
            скорость
            <input
              class="cursor-pointer disabled:cursor-not-allowed"
              type="range"
              v-model.number="realSpeed"
              min="-190"
              max="0"
              :disabled="isDisabledRange"
            />
            {{ speed }}
          </label>
          <label class="block mb-5">
            коэффициент 1/
            <input
              class="w-10"
              type="number"
              v-model.number="coefficient"
            />
          </label>
          <label>
            размер поля
            <input
              class="cursor-pointer disabled:cursor-not-allowed"
              type="range"
              v-model.number="maxFieldSize"
              min="300"
              max="900"
              :disabled="isDisabledRange"
            />
            {{ maxFieldSize }} x {{ maxFieldSize }}
          </label>
        </div>
        <div>
          <SerControlButtons
            :is-disabled-range="isDisabledRange"
            :coefficient="coefficient"
            :figure-tops="figureTops"
            @start-adding-new-points="startAddingNewPoints"
            @stop-adding-new-points="stopAddingNewPoints"
            @clear-new-points="clearNewPoints"
            @add-top="addTop"
            @delete-top="deleteTop"
            @download-png="downloadPNG"
          />
        </div>
      </div>
      <SerFigure
        :points="points"
        :figure-tops="figureTops"
        :max-field-size="maxFieldSize"
        @changePosition="changePosition"
        ref="refFigure"
      />
    </main>
    <SerFooter />
  </div>
</template>
