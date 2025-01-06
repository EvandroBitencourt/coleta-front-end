<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Editar empresa</h4>
                <RouterLink class="btn btn-outline-secondary float-start"
                    :to="{ name: 'ShowCompanyView', params: { id: company.id } }">
                    <i class="bi bi-arrow-left"></i>&nbsp;Voltar para detalhes
                </RouterLink>
            </div>
            <div class="card-body">
                <LoadingSpinner :is-loading="isLoading" />

                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="updateCompany">
                    <CompanyFormInputs :company="company" />

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
import { defineComponent, ref, onMounted } from "vue";
import { toast } from 'vue3-toastify'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRoute, useRouter } from "vue-router";
import CompanyFormInputs from "@/components/companies/CompanyFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";

export default defineComponent({

    name: 'ShowView',

    components: {
        LoadingSpinner,
        CompanyFormInputs,
        ValidationErrorsView
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const isLoading = ref(true)

        const company = ref({
            name: '',
            email: '',
            phone: '',
            address: '',
            routes: ref([]) //cada empresa é responsavel por um rotas de coleta
        })

        const validationErrors = ref([])

        const fetchCompany = async () => {
            try {
                const api = new CompaniesApi()

                //aqui chamamos o metodo get() da classe BaseApi que recebe a URL
                const data = await api.get(`/companies/${route.params.id}`)
                company.value = data

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

        const updateCompany = async () => {
            try {

                validationErrors.value = []
                const api = new CompaniesApi()

                await api.update(route.params.id, company.value)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                })

                setTimeout(() => {
                    //exibimos a view de detalhes apos a atualização
                    router.push(`/companies/${route.params.id}`)
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

        onMounted(fetchCompany)

        return {
            company,
            isLoading,
            updateCompany,
            validationErrors
        }

    }

})
</script>

<style scoped></style>