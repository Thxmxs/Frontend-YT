
<script setup>
import { ref } from "vue";
const btnPlay = new URL(`@/assets/ytbutton.jpg`, import.meta.url).href;
defineEmits(["videoToDelete", "videoSelected"]);
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  showVideo: {
    type: Boolean,
    required: false,
    default: false
  },
  showThumbnail: {
    type: Boolean,
    required: false,
    default: false
  }
});
const startVideo = ref(false);
</script>

<template>
  <div v-if="!showVideo" class="video-item-container">
    <img @click="$emit('videoSelected')" class="img" :src="video.image" :alt="video.title">
    <!-- <img class="video-item-container-close" :src="btnClose" alt="close" @click="$emit('videoToDelete')"> -->
    <div @click="$emit('videoToDelete')" class="video-item-container-close">x</div>
    <div class="video-item-container-time">4:23</div>
  </div>

  <div class="iframe-container" v-if="showVideo">

    <div v-if="!startVideo" class="thumbnail">
      <div class="thumbnail-bg"></div>
      <img @click="startVideo = true" class="play-button" :src="btnPlay" alt="play-button" />
      <img class="thumbnail-img" @click="$emit('videoSelected')" :src="video.image" :alt="video.title" />
    </div>

    <iframe class="iframe" v-if="startVideo" style="width: 100%; height: 100%"
      :src="`https://www.youtube.com/embed/${video.videoId}?autoplay=1`" allow="autoplay"></iframe>
  </div>
</template>

<style>
.iframe {
  animation-name: opacity;
  animation-duration: 4s;
  height: 100%;

}

.iframe-container {
  height: 100%;
  min-height: 230px;

}

@media (max-width: 769px) {
  .iframe-container {
    height: 100%;
    min-height: auto;

  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.thumbnail {
  width: 100%;
  height: 100%;
  position: relative;
}

.thumbnail-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
}

.play-button {
  width: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  cursor: pointer;
}

.video-item-container {
  position: relative;
}

.video-item-container img:first-child {
  width: 100%;
  position: relative;
  cursor: pointer;
}

.video-item-container-close {
  padding: 0.1rem 0.5rem;
  font-size: 1.375rem;
  border-radius: 0.25rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #fafafa;
  font-weight: 900;
  cursor: pointer;
  /* width: 1.3rem;
  position: absolute;
  top: 0.5rem;
  right: 0.2rem;
  z-index: 999; */
}

.video-item-container-time {
  padding: 0.3rem;
  position: absolute;
  bottom: 0.6rem;
  right: 0.5rem;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fafafa;
  font-weight: 700;
}
</style>

