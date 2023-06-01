
<script setup>
defineEmits(["close"]);

</script>

<template>
    <div class="modal">
        <div class="modal-inner">
            <div class="modal-inner-head">
                <h3>¿Seguro que quieres eliminar este video?</h3>
                <div @click="$emit('close')">x</div>
            </div>
            <div class="modal-inner-buttons">
                <button class="modal-inner-buttons-cancelar" @click="$emit('close')">Cancelar</button>
                <button class="modal-inner-buttons-eliminar">Eliminar</button>
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
.modal-inner-head > div{
    font-weight: 600;
    font-size: 1.8rem;
    width: 10px;
    display: block;
    text-align: end;
    cursor: pointer;
    transform: translateY(-15px);
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
}</style>