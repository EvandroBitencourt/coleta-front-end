<template>

   <div class="mb-2">
      <label for="waste_type_id" class="form-label">Escolha o tipo de resíduo</label>
      <select class="form-select" id="waste_type_id" v-model="collectionRequest.waste_type_id">
         <option v-if="wasteOptions.length === 0" disabled>
            --- Não há tipos de resíduos disponíveis ---
         </option>
         <option v-for="waste in wasteOptions" :key="waste.id" :value="waste.id">
            {{ waste.name }}
         </option>
      </select>

   </div>

   <div class="mb-2">
      <label for="quantity" class="form-label">Quantidade (KG)</label>
      <input type="number" class="form-control" id="quantity" v-model="collectionRequest.quantity">
   </div>


   <div class="mb-2">
      <label for="preferred_date" class="form-label">Qual é a melhor data</label>
      <input type="date" class="form-control" id="preferred_date" v-model="collectionRequest.preferred_date">
   </div>

   <div class="mb-2">
      <label for="address" class="form-label">Endereço da coleta</label>
      <input type="text" class="form-control" id="address" v-model="collectionRequest.address">
   </div>
  

</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
   name: 'CollectionFormInputs',
   props: {
      collectionRequest: {
         type: Object,
         required: true
      },

      wasteOptions: {
         type: Object,
         required: true
      }
   },

})
</script>

<style scoped></style>