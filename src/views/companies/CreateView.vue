<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4>Nova empresa</h4>
                <RouterLink class="btn btn-outline-secondary float-start"
                    to="/companies">
                    <i class="bi bi-arrow-left"></i>&nbsp;Listar empresas
                </RouterLink>
            </div>
            <div class="card-body">
  
                <ValidationErrorsView :errors="validationErrors" />

                <form @submit.prevent="createCompany">
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
import { defineComponent, ref } from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import CompanyFormInputs from "@/components/companies/CompanyFormInputs.vue";
import ValidationErrorsView from "@/components/ValidationErrors.vue";

export default defineComponent({

    name: 'CreateView',

    components: {
        CompanyFormInputs,
        ValidationErrorsView
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const company = ref({
            name: '',
            email: '',
            phone: '',
            address: '',
        })

        const validationErrors = ref([])

       const createCompany = async () => {
    try {
        validationErrors.value = [];
        const api = new CompaniesApi();

        // Adiciona log para verificar os dados enviados
        console.log("Dados enviados para a API:", company.value);

        await api.create(company.value);

        toast.success(`Sucesso!`, {
            'theme': 'colored',
            hideProgressBar: true
        });

        setTimeout(() => {
            router.push(`/companies/${route.params.id}`);
        }, 1000);
    } catch (error) {
        // Tratamento de erros
        if (error.response.status === 400 && error.response.data.messages) {
            validationErrors.value = Object.values(error.response.data.messages);
            return;
        }

        // Log detalhado do erro
        console.error("Erro detalhado:", error.response ? error.response.data : error.message);

        toast.error(`Erro ao enviar os dados: ${error}`, {
            'theme': 'colored',
            hideProgressBar: true
        });

        console.log(`Erro ao enviar os dados: ${error}`);
    }
};


        return {
            company,
            createCompany,
            validationErrors
        }

    }

})
</script>

<style scoped></style>