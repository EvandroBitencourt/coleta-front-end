<template>
  <div class="container-fluid mt-2 mb-4">

    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Detalhes da rota</h4>
        <RouterLink class="btn btn-secondary float-start" to="/companies"><i class="bi bi-arrow-left"></i>&nbsp;Listar
          rotas de coleta
          empresas</RouterLink>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />

        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>Nome da rota:</strong>&nbsp;{{ routeToShow.name }}</li>

          <li class="list-group-item"><strong>Criada:</strong>&nbsp;{{ routeToShow.created_at }}</li>
          <li class="list-group-item"><strong>Atualizada:</strong>&nbsp;{{ routeToShow.updated_at }}</li>
          <li class="list-group-item"><strong>Atualizada:</strong>&nbsp;{{ routeToShow.updated_at }}</li>
          <li class="list-group-item">
            <strong>Empresa responsável:</strong><br />
            <RouterLink class="btn btn-outline-info"
              :to="{ name: 'ShowCompanyView', params: { id: routeToShow.company.id } }">
              <i class="bi bi-eye"></i>&nbsp;{{ routeToShow.company.name }}
            </RouterLink>
          </li>
          <li class="list-group-item"><strong>Descrição:</strong>&nbsp;{{ routeToShow.description }}</li>


        </ul>

        <RouterLink class="btn btn-outline-primary float-start"
          :to="{ name: 'EditRouteView', params: { id: routeToShow.id } }">
          <i class="bi bi-pencil-square"></i>&nbsp;Editar
        </RouterLink>

        <DeleteButton v-if="routeToShow.id" :itemId="routeToShow.id" btnClass="btn ms-2 btn-danger"
          @delete="deleteRoute" />

      </div>
    </div>

    <div class="card shadow-lg mt-4">
      <div class="card-header">
        <h4>Histórico de coletas</h4>
        <RouterLink class="btn btn-primary btn-sm float-start" to="/points/new">
          <i class="bi bi-plus"></i>
        </RouterLink>
      </div>
      <div class="card-body">

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ações</th>
                <th scope="col">Status</th>
                <th scope="col">Endereço da coleta</th>
                <th scope="col">Data da coleta</th>
                <th scope="col">Criada</th>
                <th scope="col">Atualizada</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="routeToShow.points.length === 0">
                <td colspan="6">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="point in routeToShow.points" :key="point.id">

                <td>
                  <DeleteButton v-if="point.id" :itemId="point.id" btnClass="btn mb-2 badge btn-danger"
                    @delete="deletePoint" />
                </td>
                <td>{{ point.status }}</td>
                <td>{{ point.address }}</td>
                <td>{{ point.schedule_time }}</td>
                <td>{{ point.created_at }}</td>
                <td>{{ point.updated_at }}</td>
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

    const routeToShow = ref({
      company_id: '',
      name: '',
      description: '',
      company: ref({}), // cada rota tem uma empresa associada
      points: ref([]) // cada rota pode ter pontos de coleta
    })

    const fetchRoute = async () => {
      try {
        const api = new RoutesApi()

        //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
        const data = await api.get(`/routes/${route.params.id}`)
        routeToShow.value = data

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


    const deleteRoute = async (id) => {
      try {

        const confirmed = confirm('Tem certeza da exclusão?')

        if (!confirmed) {
          return
        }

        const api = new RoutesApi()

        await api.destroy(id)

        toast.success(`Sucesso!`, {
          'theme': 'colored',
          hideProgressBar: true
        })

        setTimeout(() => {
          router.push('/routes')
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

        //atualizamos localmente a lista de coletas associadas a rota
        routeToShow.value.points = routeToShow.value.points.filter(point => point.id !== id)

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

    onMounted(fetchRoute)

    return {
      routeToShow,
      isLoading,
      deleteRoute,
      deletePoint
    }

  }

})
</script>

<style scoped></style>