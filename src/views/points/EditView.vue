<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar ponto de coleta</h4>
                <RouterLink class="btn btn-outline-secondary float-start"
                    :to="{ name: 'ShowPointView', params: { id: point.id } }">
                    <i class="bi bi-arrow-left"></i>&nbsp;Voltar para detalhes
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updatePoint">
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

    name: 'EditView',

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
            address: '',
            schedule_time: '',
        })

        const routesOptions = ref([])

        const validationErrors = ref([])

        const updatePoint = async () => {
            try {

                validationErrors.value = []
                const api = new PointsApi()

                await api.update(route.params.id, point.value)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                setTimeout(() => {
                    router.push(`/points/${route.params.id}}`)
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
                console.log(`Erro ao recuperar os registros aqui: ${error}`)
            }
        }

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

        onMounted(() => {
            fetchPoint(),
                fetchRoutes()
        })

        return {
            point,
            routesOptions,
            updatePoint,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>