<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Gerenciar registros detalhados da coleta</h4>
                <RouterLink class="btn btn-secondary" :to="{ name: 'ShowPointView', params: { id: pointId } }">
                    <i class="bi bi-arrow-left"></i>&nbsp;Detalhes
                </RouterLink>
            </div>
            <div class="card-body">

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="createCollectionRecord">

                    <div class="mb-2">
                        <label for="waste_type_id" class="form-label">Escolha um resíduo</label>
                        <select class="form-select" id="waste_type_id" v-model="collectionRecord.waste_type_id">
                            <option v-if="wasteOptions.length === 0" disabled>
                                --- Não há resíduos disponíveis ---
                            </option>
                            <option v-for="waste in wasteOptions" :key="waste.id" :value="waste.id">
                                {{ waste.name }}
                            </option>
                        </select>

                    </div>

                    <div class="mb-2">
                        <label for="quantity" class="form-label">Quantidade coletado (KG)</label>
                        <input type="number" class="form-control" id="quantity" v-model="collectionRecord.quantity">
                    </div>

                    <div class="mb-2">
                        <label for="collection_date" class="form-label">Data da coleta</label>
                        <input type="datetime-local" class="form-control" id="collection_date"
                            v-model="collectionRecord.collection_date">
                    </div>


                    <div class="mb-2">
                        <label for="notes" class="form-label">Observações</label>
                        <input type="text" class="form-control" id="notes" v-model="collectionRecord.notes">
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
import collectionRecordsApi from "@/services/api/collectionRecordsApi";
import WasteTypesApi from "@/services/api/WasteTypesApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRoute, useRouter } from "vue-router";
import DeleteButton from "@/components/DeleteButton.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";

export default defineComponent({

    name: 'ShowView',

    components: {
        LoadingSpinner,
        DeleteButton,
        ValidationErrorsView
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)
        const validationErrors = ref([])
        const wasteOptions = ref([])
        const pointId = ref()

        //armazenamos o id do ponto de coleta que esta no parametro na URL
        pointId.value = route.params.id

        const collectionRecord = ref({
            point_id: pointId.value, //associamos o identificador do ponto ao registro que sera criado ,
            waste_type_id: '',
            quantity: '',
            collection_date: '',
            notes: ''
        })

        const createCollectionRecord = async () => {
            try {
                validationErrors.value = [];
                const api = new collectionRecordsApi();

                await api.create(collectionRecord.value);

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });


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


        onMounted(fetchWastesTypes)

        return {
            pointId,
            collectionRecord,
            wasteOptions,
            isLoading,
            validationErrors,
            createCollectionRecord
        }

    }

})
</script>

<style scoped></style>