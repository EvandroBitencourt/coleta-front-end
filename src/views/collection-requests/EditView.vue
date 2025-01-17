<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar solicitação de coleta</h4>
                <RouterLink class="btn btn-outline-secondary float-start" to="/collection-requests">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar minhas solicitações
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updateCollectionRequest">
                    <CollectionFormInputs :collectionRequest="collectionRequest" :wasteOptions="wasteOptions" />

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
import UserCollectionsRequestsApi from "@/services/api/UserCollectionsRequestsApi";
import WasteTypesApi from "@/services/api/WasteTypesApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import CollectionFormInputs from "@/components/collection-requests/CollectionFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default defineComponent({

    name: 'EditView',

    components: {
        CollectionFormInputs,
        ValidationErrorsView,
        LoadingSpinner
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const collectionRequest = ref({
            waste_type_id: '',
            quantity: '',
            preferred_date: '',
            address: '',

        })


        const wasteOptions = ref([])
        const validationErrors = ref([])

        const updateCollectionRequest = async () => {
            try {
                validationErrors.value = [];
                const api = new UserCollectionsRequestsApi();

                await api.update(route.params.id, collectionRequest.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/collection-requests`);

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

        const fetchCollectionRequests = async () => {
            try {
                const api = new UserCollectionsRequestsApi()

                //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
                const data = await api.get(`/collection-requests/${route.params.id}`)
                collectionRequest.value = data

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


        const fetchWasteTypes = async () => {
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

        onMounted(() => {
            fetchWasteTypes(),
            fetchCollectionRequests()
        })

        return {
            collectionRequest,
            wasteOptions,
            updateCollectionRequest,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>