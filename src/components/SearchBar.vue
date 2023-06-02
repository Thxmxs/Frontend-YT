<script setup>
import { ref } from "vue";
import axios from "axios";
import { videosEndpoint } from "@/helpers/endpoints"
import { itemsAddedToggle } from "../stores/fetchRecallActions"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let URLYT = ref(null);
let postingData = ref(false);

async function handleAddVideo() {
    if (URLYT.value == null) {
        toast.error("La URL del video es obligatoria", { position: toast.POSITION.TOP_RIGHT, });
    }
    postingData.value = true;
    const idVideo = getIdVideoYoutube(URLYT.value);
    if (!idVideo) {
        return toast.error("La URL del video no es valida", { position: toast.POSITION.TOP_RIGHT, })
    }
    const video = await getVideoInformation(idVideo);
    if (!video) {
        toast.error("La API key o el id del video son invalidos", { position: toast.POSITION.TOP_RIGHT, });
    }
    const videoNormalized = normalizeVideoData(video);
    if (!videoNormalized) {
        toast.error("No se recibio un video valido", { position: toast.POSITION.TOP_RIGHT, });
    }
    try {
        await axios.post(`${videosEndpoint}`, videoNormalized);
        postingData.value = false;
        URLYT.value = null
        itemsAddedToggle.value = !itemsAddedToggle.value;
        toast.success("Video añadido con éxito", { position: toast.POSITION.TOP_RIGHT, });
    } catch (error) {
        const errorHTML = `<ul>${error.response.data.errors.map(err => `<li>${err.msg}</li>`).join('')}</ul>`;
        postingData.value = false;
        return toast.error(errorHTML, { position: toast.POSITION.TOP_RIGHT, dangerouslyHTMLString: true });
    }


}

function normalizeVideoData(video) {
    if (!video) {
        return undefined;
    }
    let videoData = {
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        image: video.snippet.thumbnails.medium.url,
        duration: parseVideoDuration(video.contentDetails.duration)
    }

    return videoData;
}

async function getVideoInformation(videoId) {
    const apiKey = 'AIzaSyAUST-eY4-s70S_BvT3_OG1HxeVpWLj1_k';
    const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
    );
    return data.items[0];
};

function getIdVideoYoutube(url) {
    const regexYoutubeCom = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|u\/\w\/|playlist\?list=))([^#\&\?]*).*/;
    const regexYoutuBe = /(?:youtu\.be\/|\/v\/|\/embed\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?]*).*/;

    const matchYoutubeCom = url.match(regexYoutubeCom);
    if (matchYoutubeCom && matchYoutubeCom[1]) {
        return matchYoutubeCom[1];
    }

    const matchYoutuBe = url.match(regexYoutuBe);
    if (matchYoutuBe && matchYoutuBe[1]) {
        return matchYoutuBe[1];
    }

    return undefined;
}

function parseVideoDuration(duracion) {
    const duracionRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = duracion.match(duracionRegex);

    const horas = match[1] ? parseInt(match[1]) : 0;
    const minutos = match[2] ? parseInt(match[2]) : 0;
    const segundos = match[3] ? parseInt(match[3]) : 0;

    let duracionFormateada = '';

    if (horas > 0) {
        duracionFormateada += `${horas}:`;
    }

    duracionFormateada += `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return duracionFormateada;
}



</script >

<template>
    <div class="search-bar">
        <div class="search-bar-title">
            <h2>Añadir nuevo video</h2>
        </div>
        <div class="search-bar-content">
            <input type="text" placeholder="Añadir" v-model="URLYT">
            <button :disabled="postingData" @click="handleAddVideo">Añadir</button>
        </div>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.search-bar-title {
    margin: 10px 0px;
}

.search-bar-content {
    display: flex;
    justify-content: center;
}

.search-bar-content input {
    width: 100%;
    padding: .5rem 1rem;
    font-size: 16px;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    outline: none;
    border-radius: 7px 0px 0px 7px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.search-bar-content button {
    border-radius: 0px 7px 7px 0px;
    padding: 0.5rem 6rem;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 500;
    background-color: #136ae4;
}

.search-bar-content button:hover {
    opacity: 0.9;
}

@media (max-width: 769px) {
    .search-bar-content button {
        padding: 0.5rem 4rem;
    }
}

@media (max-width: 481px) {
    .search-bar-content button {
        padding: 0.5rem 3rem;
    }
}
</style>