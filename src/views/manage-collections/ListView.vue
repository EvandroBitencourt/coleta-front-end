<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Gerenciar solicitações de coleta</h4>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ações</th>
                <th scope="col">Tipo de resíduo</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Endereço</th>
                <th scope="col">Data agendada</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="collectionsRequests.length === 0">
                <td colspan="6">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="collection in collectionsRequests" :key="collection.id">
                <td>
                  <RouterLink class="btn btn-primary me-2 btn-sm"
                    :to="{ name: 'ShowManageCollectionView', params: { id: collection.id } }">
                    <i class="bi bi-eye"></i>&nbsp;Detalhes 
                  </RouterLink>
                  
                </td>
              
                <td>{{ collection.waste_type.name }}</td>
                <td>{{ collection.quantity }}</td>
                <td>{{ collection.address }}</td>
                <td>{{ collection.preferred_date }}</td>
                <td>{{ collection.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import ManageCollectionsApi from "@/services/api/ManageCollectionsApi";
import { toast } from 'vue3-toastify'
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: 'ListCollectionRequestView',

  components: {
    LoadingSpinner,
  },

  setup() {
    const collectionsRequests = ref([])
    const isLoading = ref(true)

    const fetchCollectionsRequests = async () => {
      try {
        const api = new ManageCollectionsApi()
        const data = await api.list()
        collectionsRequests.value = data

        isLoading.value = false

      } catch (error) {

        console.log(`Erro ao recuperar os registros: ${error}`)
        
        if (error.response && error.response.status != 401) {
          toast.error(`Erro ao recuperar os registros: ${error}`, {
            'theme': 'colored',
            hideProgressBar: true
          })
        }
        
      }
    }


    onMounted(fetchCollectionsRequests)

    return {
      collectionsRequests,
      isLoading,
    }
  }
})

</script>

<style scoped></style>
