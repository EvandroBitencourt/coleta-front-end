<template>

   <div class="mb-2">
      <label for="route_id" class="form-label">Escolha a rota</label>
      <select class="form-select" id="route_id" v-model="point.route_id">
         <option v-if="routesOptions.length === 0" disabled>
            --- Não há rotas de coletas disponíveis ---
         </option>
         <option v-for="routesObj in routesOptions" :key="routesObj.id" :value="routesObj.id">
            {{ routesObj.name }}
         </option>
      </select>

   </div>

   
   <div class="mb-2">
      <label for="status" class="form-label">Escolha a status</label>
      <select class="form-select" id="status" v-model="point.status">
      
         <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
         </option>
      </select>

   </div>

   <div class="mb-2">
      <label for="schedule_time" class="form-label">Data e hora da coleta</label>
      <input type="datetime-local" class="form-control" id="schedule_time" v-model="point.schedule_time">
   </div>

   <div class="mb-2">
      <label for="address" class="form-label">Endereço da coleta</label>
      <input type="text" class="form-control" id="address" v-model="point.address">
   </div>
  

</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
   name: 'PointFormInputs',
   props: {
      point: {
         type: Object,
         required: true
      },

      routesOptions: {
         type: Object,
         required: true
      }
   },

   setup(){
      const statusOptions = ref([
         {value:'pending',label:'Pendente'},
         {value:'collected',label:'Coletado'},
         {value:'cancelled',label:'Cancelado'},
      ])

      return {statusOptions}
   }
})
</script>

<style scoped></style>