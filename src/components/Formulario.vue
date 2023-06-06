<script setup>
import { ref } from 'vue';

const props = defineProps({
  props: Array
});
const formData = {};
for (const field of props.props) {
  formData[field.key] = ref({ key: field.key, name: field.name, value: "" });
}
const onHandleSubmit = () => {
  const dataNormalized = {};
  const { ...data } = formData;

  for (const prop in data) {
    console.log(prop)
    dataNormalized[prop] = data[prop].value.value
  }

}

</script>

<template>
  <div>
    <div class="inputs-container" v-for="field in props.props" :key="field.key">
      <label :for="field.key">{{ field.key }}</label>
      <component class="inputs" :is="field.type" :id="field.key" :type="field.type" :name="field.key"
        :value="formData[field.key].value.value" @input="formData[field.key].value.value = $event.target.value">
      </component>
    </div>
    <button @click="onHandleSubmit">Enviar</button>
  </div>

  <div class="list-container" v-for="item in formData" :key="item.id">
    <div class="list-container-content">
      <span class="list-container-label" v-show="item.value.value">{{ item.value.name }}</span>
      <span class="list-container-value" v-show="item.value.value">{{ item.value.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  margin-top: 20px;
}

.list-container-content {
  display: flex;
  flex-direction: column;
}

.list-container-label {
  font-weight: bold;
}

.inputs-container {
  display: flex;
  flex-direction: column;
}

.inputs {

  padding: 6px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

}
</style>


