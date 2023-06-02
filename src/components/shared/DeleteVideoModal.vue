
<script setup>
import { getCurrentInstance, ref } from 'vue';
import { itemsDeleteToggle } from '../../stores/fetchRecallActions';
import axios from 'axios';
import { videosEndpoint } from '../../helpers/endpoints';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const btnClose = new URL(`@/assets/close.png`, import.meta.url).href;
const instance = getCurrentInstance();
let deletingData = ref(false);

defineEmits(["close"]);

const props = defineProps({
    video: {
        type: Object,
        required: true,
    }
});

async function handleDeleteVideo() {
    deletingData.value = true;
    if (!props.video) {
        instance.emit('close');
        return toast.error("No se encontró video para ser eliminado", { position: toast.POSITION.TOP_RIGHT, });
    }
    let deleteEndpoint = `${videosEndpoint}/${props.video._id}`;
    try {
        await axios.delete(deleteEndpoint);
        itemsDeleteToggle.value = !itemsDeleteToggle.value;
        toast.success("Video eliminado con éxito", { position: toast.POSITION.TOP_RIGHT, });
        instance.emit('close');
        deletingData.value = false;

    } catch (error) {
        const errorHTML = `<ul>${error.response.data.errors.map(err => `<li>${err.msg}</li>`).join('')}</ul>`;
        deletingData.value = false;
        return toast.error(errorHTML, { position: toast.POSITION.TOP_RIGHT, dangerouslyHTMLString: true });
    }
}

</script>

<template>
    <div class="modal">
        <div class="modal-inner">
            <div class="modal-inner-head">
                <h3>¿Seguro que quieres eliminar este video?</h3>
                <img @click="$emit('close')" :src="btnClose" alt="cerrar">
            </div>
            <div class="modal-inner-buttons">
                <button class="modal-inner-buttons-cancelar" @click="$emit('close')">Cancelar</button>
                <button class="modal-inner-buttons-eliminar" @click="handleDeleteVideo">Eliminar</button>
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
    padding: 40px;
    border-radius: 9px;
    width: 50%;
    max-width: 600px;
}

.modal-inner-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.modal-inner-head>div {
    font-weight: 600;
    font-size: 1.8rem;
    width: 10px;
    display: block;
    text-align: end;
    cursor: pointer;
    transform: translateY(-15px);
}

.modal-inner-head>img {
    width: 15px;
    height: 15px;
    transform: translateY(-15px);
    cursor: pointer;
}

.modal-inner-buttons {
    text-align: end;
    display: flex;
    justify-content: flex-end;
}

.modal-inner-buttons button:first-child {
    margin-right: 20px;
}

.modal-inner-buttons button {
    width: 50%;
    max-width: 200px;
}


.modal-inner-buttons-cancelar {
    border-radius: 6px;
    padding: 0.7rem 4rem;
    border: 1px solid #136ae4;
    color: #136ae4;
    ;
    cursor: pointer;
    font-weight: 600;
    background-color: white;

}

.modal-inner-buttons-eliminar {
    border-radius: 6px;
    padding: 0.7rem 4rem;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 500;
    background-color: #136ae4;
}

.modal-inner-buttons-eliminar:hover {
    opacity: .5;
}

.modal-inner-buttons-cancelar:hover {
    opacity: .5;
}
</style>