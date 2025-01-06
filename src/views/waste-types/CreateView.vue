<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Novo resíduo</h4>
                <RouterLink class="btn btn-outline-secondary float-start" to="/waste-types">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar resíduos
                </RouterLink>
            </div>
            <div class="card-body">

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="createWaste">
                    <WasteFormInputs :waste="waste" />

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
import { defineComponent, ref } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import WasteFormInputs from "@/components/waste-types/WasteFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";


export default defineComponent({

    name: 'CreateView',

    components: {
        WasteFormInputs,
        ValidationErrorsView,
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

        const createWaste = async () => {
            try {
                validationErrors.value = [];
                const api = new WasteTypesApi();

                await api.create(waste.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/waste-types`);

                }, 1000);
            } catch (error) {

                console.log(`Erro ao enviar os dados:`, error.response?.data || error);

                // Tratar erros
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

        return {
            waste,
            createWaste,
            validationErrors,
            isLoading
        }

    }

})
</script>

<style scoped></style>