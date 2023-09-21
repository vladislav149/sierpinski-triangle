<script setup lang="ts"></script>

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
    <div class="container mx-auto px-3 grow">
      <RouterView />
    </div>
    <footer></footer>
  </div>
</template>
