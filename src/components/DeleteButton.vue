<template>
    <button @click="handleClick" :class="btnClass">
        <i class="bi bi-trash3-fill">&nbsp;</i>{{ label }}
    </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DeleteButton',
    props: {
        label: {
            type: String,
            default: 'Excluir'
        },
        itemId: {
            type: [Number, String],
            default: null
        },
        btnClass: {
            type: String,
            default: 'btn btn-danger btn-sm'
        }
    },

    emits: ['delete'],

    methods: {
        handleClick() {
            if (this.itemId !== null) {
                this.$emit('delete', this.itemId)
            }
        }
    }
});
</script>


<style scoped></style>