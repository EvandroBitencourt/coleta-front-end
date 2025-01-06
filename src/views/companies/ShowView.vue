<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Detalhes da empresa</h4>
        <RouterLink class="btn btn-secondary float-start" to="/companies"><i class="bi bi-arrow-left"></i>&nbsp;Listar
          empresas</RouterLink>
      </div>
      <div class="card-body">
        <LoadingSpinner :is-loading="isLoading" />

        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>Empresa:</strong>&nbsp;{{ company.name }}</li>
          <li class="list-group-item"><strong>E-mail:</strong>&nbsp;{{ company.email }}</li>
          <li class="list-group-item"><strong>Telefone:</strong>&nbsp;{{ company.phone }}</li>
          <li class="list-group-item"><strong>Endereço:</strong>&nbsp;{{ company.address }}</li>
          <li class="list-group-item"><strong>Criada:</strong>&nbsp;{{ company.created_at }}</li>
          <li class="list-group-item"><strong>Atualizada:</strong>&nbsp;{{ company.updated_at }}</li>

        </ul>

        <RouterLink class="btn btn-outline-primary float-start"
          :to="{ name: 'EditCompanyView', params: { id: company.id } }">
          <i class="bi bi-pencil-square"></i>&nbsp;Editar
        </RouterLink>

        <DeleteButton v-if="company.id" :itemId="company.id" btnClass="btn ms-2 btn-danger" @delete="deleteCompany" />

      </div>
    </div>

    <div class="card shadow-lg mt-4">
      <div class="card-header">
        <h4>Rotas associadas a empresa</h4>
        <RouterLink class="btn btn-dark float-start" to="/routes/new"><i class="bi bi-plus"></i>&nbsp;Criar nova rota
        </RouterLink>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ações</th>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="company.routes.length === 0">
                <td colspan="3">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="routeObj in company.routes" :key="routeObj.id">
                <td>
                  <RouterLink class="btn btn-outline-primary btn-sm me-2"
                    :to="{ name: 'ShowRouteView', params: { id: routeObj.id } }">
                    <i class="bi bi-eye"></i>&nbsp;Detalhes
                  </RouterLink>

                  <DeleteButton v-if="routeObj.id" :itemId="routeObj.id" @delete="deleteRoute" />
                </td>
                <td>{{ routeObj.name }}</td>
                <td>{{ routeObj.description }}</td>
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
import CompaniesApi from "@/services/api/CompaniesApi";
import RoutesApi from "@/services/api/RoutesApi";
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

    const company = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      routes: ref([]) //cada empresa é responsavel por um rotas de coleta
    })

    const fetchCompany = async () => {
      try {
        const api = new CompaniesApi()

        //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
        const data = await api.get(`/companies/${route.params.id}`)
        company.value = data

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

    const deleteCompany = async (id) => {
      try {

        const confirmed = confirm('Tem certeza da exclusão?')

        if (!confirmed) {
          return
        }

        const api = new CompaniesApi()

        await api.destroy(id)

        toast.success(`Sucesso!`, {
          'theme': 'colored',
          hideProgressBar: true
        })

        setTimeout(() => {
          router.push('/companies')
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

        company.value.routes = company.value.routes.filter(route => route.id !== id)

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

    onMounted(fetchCompany)

    return {
      company,
      isLoading,
      deleteCompany,
      deleteRoute
    }

  }

})
</script>

<style scoped></style>