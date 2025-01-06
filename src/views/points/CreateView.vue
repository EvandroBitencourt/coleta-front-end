<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Novo ponto de coleta</h4>
                <RouterLink class="btn btn-outline-secondary float-start" to="/points">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar pontos de coleta
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="createPoint">
                    <PointFormInputs :point="point" :routesOptions="routesOptions" />

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
import PointsApi from "@/services/api/PointsApi";
import RoutesApi from "@/services/api/RoutesApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import PointFormInputs from "@/components/points/PointFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default defineComponent({

    name: 'CreateView',

    components: {
        PointFormInputs,
        ValidationErrorsView,
        LoadingSpinner
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const point = ref({
            status: '',
            route_id: '',
            schedule_time: '',
            address: '',

        })


        const routesOptions = ref([])

        const validationErrors = ref([])

        const createPoint = async () => {
            try {
                validationErrors.value = [];
                const api = new PointsApi();

                await api.create(point.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/points`);

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
            point,
            routesOptions,
            createPoint,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>