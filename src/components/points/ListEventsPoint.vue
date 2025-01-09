<template>
    <div class="card shadow-lg">
        <div class="card-header">
            <h4>Registros detalhados da coleta</h4>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ações</th>
                            <th scope="col">Resíduo</th>
                            <th scope="col">Quantidade coletada</th>
                            <th scope="col">Data da coleta</th>
                            <th scope="col">Observações</th>
                            <th scope="col">Criado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="collectionsRecords.length === 0">
                            <td colspan="6">Não há dados para exibir</td>
                        </tr>
                        <tr v-else v-for="collection in collectionsRecords" :key="collection.id">
                            <td>
                                <DeleteButton v-if="collection.id" :itemId="collection.id" btnClass="btn badge btn-danger"
                                    @delete="deleteCollectionRecord" />
                            </td>

                            <td>{{ collection.waste_type.name }}</td>
                            <td>{{ collection.quantity }}</td>
                            <td>{{ collection.collection_date }}</td>
                            <td>{{ collection.notes }}</td>
                            <td>{{ collection.created_at }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { toast } from 'vue3-toastify'
import collectionRecordsApi from '@/services/api/collectionRecordsApi';
import DeleteButton from '../DeleteButton.vue';

export default defineComponent({
    name: 'ListEventsView',
    components:{
      DeleteButton
    },
    props: {
        point: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const collectionsRecords = ref([...props.point.collections_records])

        //estamos observando qualquer alteração no point.collections_records
        watch(
            () => props.point.collections_records,
            (newValue) => {
                collectionsRecords.value = [...newValue]
            }
        )

        const deleteCollectionRecord = async (id) => {
            try {

                const confirmed = confirm('Tem certeza da exclusão?')

                if (!confirmed) {
                    return
                }

                const api = new collectionRecordsApi()

                await api.destroy(id)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

               collectionsRecords.value = collectionsRecords.value.filter(record => record.id !== id)

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

        return {collectionsRecords, deleteCollectionRecord}
    }

})
</script>


<style scoped></style>