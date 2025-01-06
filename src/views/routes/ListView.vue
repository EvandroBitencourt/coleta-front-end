<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Rotas de coleta</h4>
        <RouterLink class="btn btn-dark float-end" to="/routes/new"><i class="bi bi-plus"></i>&nbsp;Nova rota de coleta
        </RouterLink>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ações</th>
                <th scope="col">Nome</th>
                <th scope="col">Criada</th>
                <th scope="col">Atualizada</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="routesOptions.length === 0">
                <td colspan="4">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="routeObj in routesOptions" :key="routeObj.id">
                <td>
                  <RouterLink class="btn btn-outline-primary btn-sm"
                    :to="{ name: 'ShowRouteView', params: { id: routeObj.id } }">
                    <i class="bi bi-eye"></i>&nbsp;Detalhes
                  </RouterLink>
                </td>
                <td>{{ routeObj.name }}</td>
                <td>{{ routeObj.created_at }}</td>
                <td>{{ routeObj.updated_at }}</td>
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
import RoutesApi from "@/services/api/RoutesApi";
import { toast } from 'vue3-toastify'
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: 'RoutesView',

  components: {
    LoadingSpinner
  },

  setup() {
    const routesOptions = ref([])
    const isLoading = ref(true)

    const fetchRoutes = async () => {
      try {
        const api = new RoutesApi()
        const data = await api.list()
        routesOptions.value = data

        isLoading.value = false

      } catch (error) {
        if (error.response && error.response.status != 401) {
          toast.error(`Erro ao recuperar os registros: ${error}`, {
            'theme': 'colored',
            hideProgressBar: true
          })
        }
        console.log(`Erro ao recuperar os registros: ${error}`)
      }
    }

    onMounted(fetchRoutes)

    return {
      routesOptions,
      isLoading
    }
  }
})

</script>

<style scoped></style>
