<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar solicitação de coleta</h4>

                <RouterLink class="btn btn-secondary float-start"
                    :to="{ name: 'ShowManageCollectionView', params: { id: collection.id } }">
                    <i class="bi bi-arrow-left"></i>&nbsp;Detalhes
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updateCollection">
                    <div class="mb-2">
                        <label for="company_id" class="form-label">Escolha a empresa</label>
                        <select class="form-select" id="company_id" v-model="collection.company_id">
                            <option v-if="companies.length === 0" disabled>
                                --- Não há empresas disponíveis ---
                            </option>
                            <option v-for="company in companies" :key="company.id" :value="company.id">
                                {{ company.name }}
                            </option>
                        </select>

                    </div>

                    <div class="mb-2">
                        <label for="status" class="form-label">Escolha um status</label>
                        <select class="form-select" id="status" v-model="collection.status">
                            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>

                        </select>

                    </div>
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
import ManageCollectionsApi from "@/services/api/ManageCollectionsApi";
import CompaniesApi from "@/services/api/CompaniesApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default defineComponent({

    name: 'EditView',

    components: {
        ValidationErrorsView,
        LoadingSpinner
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const collection = ref({
            waste_type_id: '',
            company_id: '',
            quantity: '',
            preferred_date: '',
            status: '',
            address: '',

        })

        const statusOptions = ref([
            { value: 'pending', label: 'Pendente' },
            { value: 'collected', label: 'Coletado' },
            { value: 'cancelled', label: 'Cancelado' },
        ])

        const companies = ref([])
        const validationErrors = ref([])

        const updateCollection = async () => {
            try {
                validationErrors.value = [];
                const api = new ManageCollectionsApi();

                await api.update(route.params.id, collection.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/collections/${route.params.id}`);

                }, 1000);
            } catch (error) {

                console.log(`Erro ao enviar os dados:`, error.response?.data || error);

                if (error.response?.status === 400 && error.response.data.messages) {
                    validationErrors.value = Object.values(error.response.data.messages);
                    return;
                }

                toast.error(`Erro ao enviar os dados: ${error}`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });


            }
        };

        const fetchCollection = async () => {
            try {
                const api = new ManageCollectionsApi()

                //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
                const data = await api.get(`/manage-collections/${route.params.id}`)
                collection.value = data

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


        const fetchCompanies = async () => {
            try {
                const api = new CompaniesApi()
                const data = await api.list()
                companies.value = data

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

        onMounted(() => {
            fetchCompanies(),
                fetchCollection()
        })

        return {
            collection,
            companies,
            updateCollection,
            validationErrors,
            isLoading,
            statusOptions

        }

    }

})
</script>

<style scoped></style>