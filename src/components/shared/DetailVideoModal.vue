
<script setup>
import VideoItem from '../VideoItem.vue'
defineEmits(["close"]);


const props = defineProps({
    video: {
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div class="modal">

        <div class="modal-inner">
            <div class="modal-inner-head">
                <div @click="$emit('close')">x</div>
            </div>
            <div class="modal-inner-content">
                <div class="modal-inner-video">
                    <VideoItem :video="video" :showVideo="true" />
                </div>
                <div class="modal-inner-description">
                    <h4>{{ video.title }}</h4>
                    <p>{{ video.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.modal-inner {
    background-color: #fff;
    padding: 50px;
    border-radius: 9px;
    width: 50%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-height: 325px;
}

.modal-inner-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}

.modal-inner-description {
    margin-left: 10px;
    overflow-y: auto;
    height: 100%;
    width: 50%;
    max-height: 220px;
    display: flex;
    flex-direction: column;

}

.modal-inner-description::before,
.modal-inner-description::after {
    content: '';
    margin: auto;
}

.modal-inner-description h4 {

    margin-top: 0px;
}

.modal-inner-description p {
    max-height: 80%;
    font-size: .9rem;
    margin-top: .95rem;
}

.modal-inner-video {
    width: 50%;
    height: 100%;
}

.modal-inner-head {
    position: absolute;
    right: 20px;
    top: 20px;
}

.modal-inner-head>div {
    font-weight: 600;
    font-size: 1.8rem;
    width: 10px;
    display: block;
    text-align: start;
    cursor: pointer;
    transform: translateY(-15px);
}

@media (max-width: 769px) {
    .modal-inner-content {
        flex-direction: column;
    }

    .modal-inner-description {
    width: 100%;
    height: 50%;
    margin-top: 20px;

}


.modal-inner-description h4 {

    margin-top: 0px;
}

.modal-inner-description p {
    max-height: 80%;
    font-size: .9rem;
    margin-top: .95rem;
}

.modal-inner-video {
    width: 100%;
    height: 50%;
}
}</style>