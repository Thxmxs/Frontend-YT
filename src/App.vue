<script setup>
import SearchBar from './components/SearchBar.vue'
import VideoItem from './components/VideoItemList.vue'

</script >

<template>
  <div class="container">
    <div class="container-content">
      <header>
        <SearchBar />
      </header>
      <main>
        <VideoItem />
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
}</style>