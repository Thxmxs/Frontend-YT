import { ref } from "vue";

export const itemsAddedToggle = ref({
    recallData: false,
    setItemsAddedToggle(value) {
        this.recallData = value;
    }
});