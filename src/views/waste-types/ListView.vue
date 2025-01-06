<template>
  <div class="container-fluid mt-2 mb-4">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4>Tipos de resíduos</h4>
        <RouterLink class="btn btn-success float-end" to="/waste-types/new"><i class="bi bi-plus"></i>&nbsp;Novo tipo de
          resíduo
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
                <th scope="col">Descrição</th>
                <th scope="col">Criado</th>
                <th scope="col">Atualizado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="wasteOptions.length === 0">
                <td colspan="5">Não há dados para exibir</td>
              </tr>
              <tr v-else v-for="waste in wasteOptions" :key="waste.id">
                <td>
                  <RouterLink class="btn btn-primary"
                    :to="{ name: 'EditWasteView', params: { id: waste.id } }">
                    <i class="bi bi-penciel-square"></i>&nbsp;Editar
                  </RouterLink>

                  <DeleteButton v-if="waste.id" :itemId="waste.id" btnClass="btn ms-2 btn-danger"
                    @delete="deleteWaste" />
                </td>

                <td>{{ waste.name }}</td>
                <td>{{ waste.description }}</td>
                <td>{{ waste.created_at }}</td>
                <td>{{ waste.updated_at }}</td>
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
import WasteTypesApi from "@/services/api/WasteTypesApi";
import { toast } from 'vue3-toastify'
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import DeleteButton from "@/components/DeleteButton.vue";

export default defineComponent({
  name: 'WastesView',

  components: {
    LoadingSpinner,
    DeleteButton
  },

  setup() {
    const wasteOptions = ref([])
    const isLoading = ref(true)

    const fetchWastesTypes = async () => {
      try {
        const api = new WasteTypesApi()
        const data = await api.list()
        wasteOptions.value = data

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

    const deleteWaste = async (id) => {
      try {

        const confirmed = confirm('Tem certeza da exclusão?')

        if (!confirmed) {
          return
        }

        const api = new WasteTypesApi()

        await api.destroy(id)

        toast.success(`Sucesso!`, {
          'theme': 'colored',
          hideProgressBar: true
        })

        //atualizamos a lista localmente apos a exclusao na API
        wasteOptions.value =wasteOptions.value.filter(waste => waste.id !== id)

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

    onMounted(fetchWastesTypes)

    return {
      wasteOptions,
      isLoading,
      deleteWaste
    }
  }
})

</script>

<style scoped></style>
