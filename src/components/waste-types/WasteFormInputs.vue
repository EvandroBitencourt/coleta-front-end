<template>

   <div class="mb-2">
      <label for="name" class="form-label">Nome do resíduo</label>
      <input type="text" class="form-control" id="name" v-model="waste.name">
   </div>

   <div class="mb-2">
      <label for="description" class="form-label">Descrição</label>
      <textarea  id="description" class="form-control" rows="5" v-model="waste.description"></textarea>
   </div>
  

</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
   name: 'WasteFormInputs',
   props: {
      waste: {
         type: Object,
         required: true
      },

   },
})
</script>

<style scoped></style>