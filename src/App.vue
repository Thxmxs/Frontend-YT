<script setup>
import Formulario from './components/Formulario.vue';
import SearchBar from './components/SearchBar.vue'
import VideoItem from './components/VideoItemList.vue'

const schema = [
  { key: "name", type: "input", name: "Nombre" },
  { key: "lastName", type: "input", name: "lastName" },
  { key: "message", type: "textarea", name: "Mensaje" },
]
</script >

<template>
  <div class="container">
    <div class="container-content">
      <!-- <header>
          <SearchBar />
        </header> -->
      <main>
        <!-- <VideoItem /> -->
        <Formulario :props=schema />
      </main>
    </div>
  </div>
</template>

<style>
*,
*::after,
*::before,
body {
  margin: 0px;
  padding: 0px;
}

.container {
  box-sizing: border-box;
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  font-family: 'roboto';
}

.container-content {
  width: 80%;
  max-width: 1300px;
  padding-top: 6%;
  margin: 0 auto;
}
</style>