<template>
   <div v-if="errors.length > 0" class="alert alert-danger">
      <ul>
         <li v-for="(error, index) in errors" key="index">{{ error }}</li>
      </ul>
   </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ValidationErrors',
    props: {
        errors: {
            type: Array,
            required: true
        }
    }
})
</script>

<style scoped></style>