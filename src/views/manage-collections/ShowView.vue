<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Detalhes da solicitação</h4>
                <RouterLink class="btn btn-secondary float-start" to="/manage-collections"><i
                        class="bi bi-arrow-left"></i>&nbsp;Listar solicitações
                    empresas</RouterLink>
            </div>
            <div class="card-body">
                <LoadingSpinner :is-loading="isLoading" />

                <ul class="list-group mb-3">
                    <li class="list-group-item"><strong>Status:</strong>&nbsp;{{ collection.status }}</li>
                    <li class="list-group-item"><strong>Tipo de resíduo:</strong><br/>
                        <RouterLink class="btn btn-outline-info"
                            :to="{ name: 'EditWasteView', params: { id: collection.waste_type.id } }">
                            <i class="bi bi-eye"></i>&nbsp;{{ collection.waste_type.name }}
                        </RouterLink>
                    </li>
                    <li class="list-group-item"><strong>Quantidade (KG):</strong>&nbsp;{{ collection.quantity }}</li>

                    <li class="list-group-item"><strong>Empresa responsável:</strong>

                        <span v-if="!collection?.company?.name" class="badge bg-danger">Aguardando definição</span>

                       <div v-else>
                        <RouterLink  class="btn btn-outline-info"
                            :to="{ name: 'ShowCompanyView', params: { id: collection.waste_type.id } }">
                            <i class="bi bi-eye"></i>&nbsp;{{ collection.company.name }}
                        </RouterLink>
                       </div>
                    </li>

                    <li class="list-group-item"><strong>Endereço:</strong>&nbsp;{{ collection.address }}</li>
                    <li class="list-group-item"><strong>Data prevista:</strong>&nbsp;{{ collection.preferred_date }}</li>
                    <li class="list-group-item"><strong>Criada:</strong>&nbsp;{{ collection.created_at }}</li>
                    <li class="list-group-item"><strong>Atualizada:</strong>&nbsp;{{ collection.updated_at }}</li>

                </ul>

                <RouterLink class="btn btn-outline-primary float-start"
                    :to="{ name: 'EditManageCollectionView', params: { id: collection.id } }">
                    <i class="bi bi-pencil-square"></i>&nbsp;Editar
                </RouterLink>

                <DeleteButton v-if="collection.id" :itemId="collection.id" btnClass="btn ms-2 btn-danger"
                    @delete="deleteCollection" />

            </div>
        </div>
    </div>

</template>

<script>
import { RouterLink } from "vue-router";
import ManageCollectionsApi from "@/services/api/ManageCollectionsApi";
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRoute, useRouter } from "vue-router";
import DeleteButton from "@/components/DeleteButton.vue";

export default defineComponent({

    name: 'ShowView',

    components: {
        LoadingSpinner,
        DeleteButton
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const collection = ref({
            user: ref({}),
            waste_type: ref({}),
            company: ref({}),
            address:'',
            quantity: '',
            preferred_date:'',
            status:''
        })

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

        const deleteCollection = async (id) => {
            try {

                const confirmed = confirm('Tem certeza da exclusão?')

                if (!confirmed) {
                    return
                }

                const api = new ManageCollectionsApi()

                await api.destroy(id)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                setTimeout(() => {
                    router.push('/manage-collections')
                }, 1000)

            } catch (error) {

                console.log(`Erro ao excluir o registr: ${error}`)

                if (error.response && error.response.status != 401) {
                    toast.error(`Erro ao excluir o registroo: ${error}`, {
                        'theme': 'colored',
                        hideProgressBar: true
                    })
                }
             
            }
        }

        onMounted(fetchCollection)

        return {
            collection,
            isLoading,
            deleteCollection,
        }

    }

})
</script>

<style scoped></style>