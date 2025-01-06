<template>

   <div class="mb-2">
      <label for="name" class="form-label">Nome</label>
      <input type="text" class="form-control" id="name" v-model="company.name">
   </div>

   <div class="mb-2">
      <label for="phone" class="form-label">Telefone</label>
      <input type="text" class="form-control" id="phone" v-model="company.phone">
   </div>

   <div class="mb-2">
      <label for="email" class="form-label">E-mail</label>
      <input type="email" class="form-control" id="email" v-model="company.email">
   </div>

   <div class="mb-2">
      <label for="address" class="form-label">Endereço</label>
      <input type="text" class="form-control" id="address" v-model="company.address">
   </div>

</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CompanyFormInputs',
    props:{
        company: {
            type: Object,
            required: true
        }
    }
})
</script>

<style scoped>

</style>