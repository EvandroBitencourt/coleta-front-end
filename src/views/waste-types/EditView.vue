<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar resíduo</h4>
                <RouterLink class="btn btn-outline-secondary float-start" to="/waste-types">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar resíduos
                </RouterLink>
            </div>
            <div class="card-body">

                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updateWaste">
                    <WasteFormInputs :waste="waste"/>

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
import WasteTypesApi from "@/services/api/WasteTypesApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import WasteFormInputs from "@/components/waste-types/WasteFormInputs.vue";


export default defineComponent({

    name: 'EditView',

    components: {
        WasteFormInputs,
        ValidationErrorsView,
        LoadingSpinner
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const waste = ref({
            name: '',
            description: '',
        })

        const validationErrors = ref([])

        const fetchWaste = async () => {
            try {
                const api = new WasteTypesApi()
                const data = await api.get(`/waste-types/${route.params.id}`)
                waste.value = data
                isLoading.value = false

            } catch (error) {

                console.log(`Erro ao recuperar os registros aqui: ${error}`)

                if (error.response && error.response.status != 401) {
                    toast.error(`Erro ao recuperar os registros: ${error}`, {
                        'theme': 'colored',
                        hideProgressBar: true
                    })
                }
                
            }
        }

        const updateWaste = async () => {
            try {

                validationErrors.value = []
                const api = new WasteTypesApi()

                await api.update(route.params.id, waste.value)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                setTimeout(() => {
                    router.push(`/waste-types}`)
                }, 1000)

            } catch (error) {

                console.log(`Erro ao enviar os dados: ${error}`)

                //tratar os erros de validacao da API
                if (error.response.status === 400 && error.response.data.messages) {
                    validationErrors.value = Object.values(error.response.data.messages)
                    return
                }

                toast.error(`Erro ao enviar os dados: ${error}`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })
                
            }
        }


        onMounted(() => {
            fetchWaste()
        })

        return {
            waste,
            updateWaste,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>