<script setup>
import { onMounted, ref, watchEffect } from "vue";
import VideoItem from './VideoItem.vue'
import DeleteVideoModal from './shared/DeleteVideoModal.vue'
import DetailVideoModal from './shared/DetailVideoModal.vue'
import axios from 'axios';
import { videosEndpoint } from "../helpers/endpoints";
import { itemsAddedToggle, itemsDeleteToggle } from "../stores/fetchRecallActions"

let loadingData = ref(false);
let videos = ref([]);
let VideoToDelete = ref(null);
let VideoSelected = ref(null);

async function getVideos() {
    const { data } = await axios.get(videosEndpoint);
    videos.value = data.videos;
};

onMounted(async () => {
    getVideos();
})
watchEffect(() => {
    if (itemsAddedToggle.value.recallData || !itemsAddedToggle.value.recallData) {
        getVideos();
    }

})
watchEffect(() => {
    if (itemsDeleteToggle.value.recallData || !itemsDeleteToggle.value.recallData) {
        getVideos();
    }
})

</script >


<template>
    <div class="video-item-list-container" v-if="!loadingData">

        <div v-for="video in videos" :key="video.id">
            <VideoItem @VideoToDelete="VideoToDelete = video" @VideoSelected="VideoSelected = video" :video="video">
            </VideoItem>
        </div>
    </div>

    <DeleteVideoModal v-if="VideoToDelete" @close="VideoToDelete = null" :video="VideoToDelete">
    </DeleteVideoModal>

    <DetailVideoModal v-if="VideoSelected" @close="VideoSelected = null" :video="VideoSelected" />
</template>

<style scoped>
.video-item-list-container {
    width: 90%;
    margin: 0 auto;
    margin-top: 7rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4rem;
}


@media (max-width: 769px) {
    .video-item-list-container {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 481px) {
    .video-item-list-container {
        grid-template-columns: 1fr;
    }
}

.img {
    width: 100%;
}
</style>