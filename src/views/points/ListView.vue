<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Pontos de coleta</h4>
        <RouterLink class="btn btn-success float-end" to="/points/new"><i class="bi bi-plus"></i>&nbsp;Programar nova coleta
        </RouterLink>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ações</th>
                <th scope="col">Rota</th>
                <th scope="col">Endereço</th>
                <th scope="col">Data programada da coleta</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="points.length === 0">
                <td colspan="4">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="point in points" :key="point.id">
                <td>
                  <RouterLink class="btn btn-outline-primary btn-sm"
                    :to="{ name: 'ShowPointView', params: { id: point.id } }">
                    <i class="bi bi-eye"></i>&nbsp;Detalhes 
                  </RouterLink>
                </td>
                <td>
                  <RouterLink class="btn btn-outline-info btn-sm"
                    :to="{ name: 'ShowRouteView', params: { id: point.route.id } }">
                    <i class="bi bi-eye"></i>&nbsp; {{ point.route.name }}
                  </RouterLink>
                </td>
                <td>{{ point.address }}</td>
                <td>{{ point.schedule_time }}</td>
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
import PointsApi from "@/services/api/PointsApi";
import { toast } from 'vue3-toastify'
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: 'PointsView',

  components: {
    LoadingSpinner
  },

  setup() {
    const points = ref([])
    const isLoading = ref(true)

    const fetchPoints = async () => {
      try {
        const api = new PointsApi()
        const data = await api.list()
        points.value = data

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

    onMounted(fetchPoints)

    return {
      points,
      isLoading
    }
  }
})

</script>

<style scoped></style>
