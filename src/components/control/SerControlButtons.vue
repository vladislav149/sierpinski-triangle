<script setup lang="ts">
import type {Point} from '@/types'
import {computed} from 'vue'

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
}>()

const isDisabledStart = computed(
  () =>
    props.isDisabledRange ||
    props.coefficient <= 1 ||
    props.figureTops.length < 3
)

function startAddingNewPoints() {
  emit('startAddingNewPoints')
}

function stopAddingNewPoints() {
  emit('stopAddingNewPoints')
}
function clearNewPoints() {
  emit('clearNewPoints')
}
function addTop() {
  emit('addTop')
}
function deleteTop() {
  emit('deleteTop')
}
</script>

<template>
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
</template>
