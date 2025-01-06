<template>

   <div class="mb-2">
      <label for="company_id" class="form-label">Empresa responsável por essa rota</label>
      <select class="form-select" id="company_id" v-model="companyRoute.company_id">
         <option v-if="companiesOptions.length === 0" disabled>
            --- Não há empresas disponíveis ---
         </option>
         <option v-for="company in companiesOptions" :key="company.id" :value="company.id">
            {{ company.name }}
         </option>
      </select>

   </div>

   <div class="mb-2">
      <label for="name" class="form-label">Nome</label>
      <input type="text" class="form-control" id="name" v-model="companyRoute.name">
   </div>

   <!-- <div class="mb-2">
      <label for="email" class="form-label">E-mail</label>
      <input type="email" class="form-control" id="email" v-model="company.email">
   </div> -->

   <div class="mb-2">
      <label for="description" class="form-label">Descrição</label>
      <textarea class="form-control" id="description" v-model="companyRoute.description"></textarea>
   </div>

</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'RouteFormInputs',
   props: {
      companyRoute: {
         type: Object,
         required: true
      },

      companiesOptions: {
         type: Object,
         required: true
      }
   }
})
</script>

<style scoped></style>