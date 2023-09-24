<script setup lang="ts">
import type {Point} from '@/types'
import {computed} from 'vue'

const MIN_COEFFICIENT = 1
const MIN_TOPS_FOR_FIGURE = 3

const props = defineProps<{
  isDisabledRange: boolean
  coefficient: number
  figureTops: Array<Point>
}>()

const emit = defineEmits<{
  startAddingNewPoints: []
  stopAddingNewPoints: []
  clearNewPoints: []
  addTop: []
  deleteTop: []
  downloadPng: []
}>()

const isDisabledStart = computed(
  () =>
    props.isDisabledRange ||
    props.coefficient <= MIN_COEFFICIENT ||
    props.figureTops.length < MIN_TOPS_FOR_FIGURE
)

const startAddingNewPoints = () => emit('startAddingNewPoints')
const stopAddingNewPoints = () => emit('stopAddingNewPoints')
const clearNewPoints = () => emit('clearNewPoints')
const addTop = () => emit('addTop')
const deleteTop = () => emit('deleteTop')
const downloadPNG = () => emit('downloadPng')
</script>

<template>
  <button
    class="bg-teal-600 text-white px-5 py-10 disabled:cursor-not-allowed disabled:opacity-50 transition-opacity"
    type="button"
    :disabled="isDisabledStart"
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
  <button
    class="bg-blue-600 text-white px-5 py-10 disabled:cursor-not-allowed disabled:opacity-50 transition-opacity"
    type="button"
    :disabled="isDisabledStart"
    @click="downloadPNG"
  >
    Скачать результат
  </button>
</template>
