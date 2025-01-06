<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Detalhes do ponto de coleta</h4>
        <RouterLink class="btn btn-secondary float-start" to="/points"><i class="bi bi-arrow-left"></i>&nbsp;Listar
          pontos de coleta
          empresas</RouterLink>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />

        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>Endereço da coleta:</strong>&nbsp;{{ point.address }}</li>
          <li class="list-group-item"><strong>Status:</strong>&nbsp;{{ point.status }}</li>
          <li class="list-group-item"><strong>Data e hora programada:</strong>&nbsp;{{ point.schedule_time }}</li>
          <li class="list-group-item"><strong>criada:</strong>&nbsp;{{ point.created_at }}</li>
          <li class="list-group-item">
            <strong>Rota:</strong><br/>
            <RouterLink class="btn btn-outline-info"
              :to="{ name: 'ShowRouteView', params: { id: point.route.id } }">
              <i class="bi bi-eye"></i>&nbsp;{{ point.route.name }}
            </RouterLink>
          </li>
        </ul>

        <RouterLink class="btn btn-primary me-2 float-start"
          :to="{ name: 'EditPointView', params: { id: point.id } }">
          <i class="bi bi-pencil-square"></i>&nbsp;Editar
        </RouterLink>

        <RouterLink class="btn btn-dark me-2 float-start"
          :to="{ name: 'EventsPointView', params: { id: point.id } }">
          <i class="bi bi-clock-history"></i>&nbsp;Registro de coletas
        </RouterLink>

        <DeleteButton v-if="point.id" :itemId="point.id" btnClass="btn btn-danger" @delete="deletePoint" />

      </div>
    </div>
  </div>

</template>

<script>
import { RouterLink } from "vue-router";
import PointsApi from "@/services/api/PointsApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRoute, useRouter } from "vue-router";
import DeleteButton from "@/components/DeleteButton.vue";

export default defineComponent({

  name: 'ShowView',

  components: {
    LoadingSpinner,
    DeleteButton
  },

  setup() {
    const router = useRouter(); // obtemos uma nova instancia do router
    const route = useRoute(); // obtemos a instancia da rota atual

    const isLoading = ref(true)

    const point = ref({
      route_id: '',
      address: '',
      schedule_time: '',
      route: ref({}), // cada ponto tem uma rota
      collections_records: ref([]) // cada ponto tem diversos registros detalhados das coletas
    })

    const fetchPoint = async () => {
      try {
        const api = new PointsApi()
        const data = await api.get(`/points/${route.params.id}`)
        point.value = data

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
    

    const deletePoint = async (id) => {
      try {

        const confirmed = confirm('Tem certeza da exclusão?')

        if (!confirmed) {
          return
        }

        const api = new PointsApi()

        await api.destroy(id)

        toast.success(`Sucesso!`, {
          'theme': 'colored',
          hideProgressBar: true
        })

        setTimeout(() => {
          router.push('/points')
        }, 1000)

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

    onMounted(fetchPoint)

    return {
      point,
      isLoading,
      deletePoint
    }

  }

})
</script>

<style scoped></style>