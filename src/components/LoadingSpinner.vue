<template>
   <div v-if="isLoading" class="spinner-border mb-3" role="status">
     <span class="visually-hidden">Loading...</span>
   </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    name:'LoadingSpinner',
    props: {
        isLoading: {
            type:Boolean,
            required: true
        }
    }
})

</script>

<style scoped>

</style>