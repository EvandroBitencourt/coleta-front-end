<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Minhas solicitações de coleta</h4>
        <RouterLink class="btn btn-success float-end" to="/collection-requests/new"><i class="bi bi-plus"></i>&nbsp;Solicitar nova coleta
        </RouterLink>
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
                <th scope="col">Criada</th>
                <th scope="col">Atualizada</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="collectionsRequests.length === 0">
                <td colspan="8">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="collection in collectionsRequests" :key="collection.id">
                <td>
                  <RouterLink class="btn btn-primary me-2 btn-sm"
                    :to="{ name: 'EditCollectionRequestView', params: { id: collection.id } }">
                    <i class="bi bi-pencil-square"></i>&nbsp;Editar 
                  </RouterLink>
                  
                  <DeleteButton v-if="collection.id" :itemId="collection.id" @delete="deleteCollection" />

                </td>
              
                <td>{{ collection.waste_type.name }}</td>
                <td>{{ collection.quantity }}</td>
                <td>{{ collection.address }}</td>
                <td>{{ collection.preferred_date }}</td>
                <td>{{ collection.status }}</td>
                <td>{{ collection.created_at }}</td>
                <td>{{ collection.updated_at }}</td>
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
import UserCollectionsRequestsApi from "@/services/api/UserCollectionsRequestsApi";
import { toast } from 'vue3-toastify'
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import DeleteButton from "@/components/DeleteButton.vue";

export default defineComponent({
  name: 'ListCollectionRequestView',

  components: {
    LoadingSpinner,
    DeleteButton
  },

  setup() {
    const collectionsRequests = ref([])
    const isLoading = ref(true)

    const fetchCollectionsRequests = async () => {
      try {
        const api = new UserCollectionsRequestsApi()
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

    const deleteCollection = async (id) => {
      try {

        const confirmed = confirm('Tem certeza da exclusão?')

        if (!confirmed) {
          return
        }

        const api = new UserCollectionsRequestsApi()

        await api.destroy(id)

        toast.success(`Sucesso!`, {
          'theme': 'colored',
          hideProgressBar: true
        })

        //atualiza localmente a lista de solicitações
        collectionsRequests.value = collectionsRequests.value.filter(collection => collection.id !== id)

      } catch (error) {

        console.log(`Erro ao excluir os registros: ${error}`)

        if (error.response && error.response.status != 401) {
          toast.error(`Erro ao excluir os registros: ${error}`, {
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
      deleteCollection
    }
  }
})

</script>

<style scoped></style>
