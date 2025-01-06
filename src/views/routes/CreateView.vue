<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Nova rota de coleta</h4>
                <RouterLink class="btn btn-outline-secondary float-start" to="/companies">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar rotas de coleta
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="createRoute">
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

    name: 'CreateView',

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

        const createRoute = async () => {
            try {
                validationErrors.value = [];
                const api = new RoutesApi();

                console.log("Dados enviados para a API:", companyRoute.value); // Adicione isso para verificar os dados

                await api.create(companyRoute.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/routes`);

                }, 1000);
            } catch (error) {
                // Tratar erros
                if (error.response?.status === 400 && error.response.data.messages) {
                    validationErrors.value = Object.values(error.response.data.messages);
                    return;
                }

                toast.error(`Erro ao enviar os dados: ${error}`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                console.log(`Erro ao enviar os dados:`, error.response?.data || error);
            }
        };


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

        onMounted(fetchCompanies)

        return {
            companyRoute,
            companiesOptions,
            createRoute,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>