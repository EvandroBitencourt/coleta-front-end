<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar rota de coleta</h4>
                <RouterLink class="btn btn-outline-secondary float-start"
                    :to="{ name: 'ShowRouteView', params: { id: companyRoute.id } }">
                    <i class="bi bi-arrow-left"></i>&nbsp;Voltar para detalhes
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updateRoute">
                    <RouteFormInputs :companyRoute="companyRoute" :companiesOptions="companiesOptions" />

                    <button type="submit" class="btn btn-success mt-3">
                        <i class="bi bi-floppy"></i>&nbsp;Salvar
                    </button>
                </form>
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
import { useRoute, useRouter } from "vue-router";
import RouteFormInputs from "@/components/routes/RouteFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default defineComponent({

    name: 'EditView',

    components: {
        RouteFormInputs,
        ValidationErrorsView,
        LoadingSpinner
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const companyRoute = ref({
            name: '',
            company_id: '',
            description: '',
        })

        const companiesOptions = ref([])

        const validationErrors = ref([])

        const updateRoute = async () => {
            try {

                validationErrors.value = []
                const api = new RoutesApi()

                await api.update(route.params.id,companyRoute.value)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                setTimeout(() => {
                    router.push(`/routes/${route.params.id}}`)
                }, 1000)

            } catch (error) {
                //tratar os erros de validacao da API
                if (error.response.status === 400 && error.response.data.messages) {
                    validationErrors.value = Object.values(error.response.data.messages)
                    return
                }

                toast.error(`Erro ao enviar os dados: ${error}`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                console.log(`Erro ao enviar os dados: ${error}`)
            }
        }

        const fetchRoute = async () => {
      try {
        const api = new RoutesApi()

        //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
        const data = await api.get(`/routes/${route.params.id}`)
        companyRoute.value = data

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

        const fetchCompanies = async () => {
            try {
                const api = new CompaniesApi()
                const data = await api.list()
                companiesOptions.value = data

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

        onMounted(() => {
            fetchRoute(),
            fetchCompanies()
        })

        return {
            companyRoute,
            companiesOptions,
            updateRoute,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>