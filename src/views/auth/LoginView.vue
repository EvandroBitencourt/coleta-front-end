<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header">
                        <h4 class="my-2">Realizar login</h4>
                    </div>
                    <div class="card-body">

                        <ValidationErrorsView :errors="validationErrors" />

                        <form @submit.prevent="createLogin">

                            <div class="d-grid gap-2 col-6 mx-auto">

                                
                                <div class="mb-2">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="email" class="form-control" id="email" v-model="credentials.email">
                                </div>

                                <div class="mb-2">
                                    <label for="password" class="form-label">Senha de acesso</label>
                                    <input type="password" class="form-control" id="password" v-model="credentials.password">
                                </div>

                                <button type="submit" class="btn btn-dark mt-3">
                                   <i class="bi bi-box-arrow-in-right"></i>&nbsp;Entrar
                                </button>

                                <RouterLink class="btn btn-link float-start" to="/register">
                                    Ainda não tem conta?
                                </RouterLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { RouterLink } from "vue-router";
import LoginApi from "@/services/api/LoginApi";
import { defineComponent, ref} from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import { useAuthStore } from "@/stores/Auth";


export default defineComponent({

    name: 'LoginView',

    components: {
        ValidationErrorsView,
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const credentials = ref({
            email: '',
            password: '',
        })

        const validationErrors = ref([])

        const authStore = useAuthStore() // obtemos uma instancia do store de autenticacao

        const createLogin = async () => {
            try {
                validationErrors.value = [];
                const api = new LoginApi();

                const data = await api.create(credentials.value);

                authStore.setToken(data.access_token)

                toast.success(`Sucesso!`, {
                    'theme': 'colored',
                    hideProgressBar: true
                });

                setTimeout(() => {
                    router.push(`/`);

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

        return {
            credentials,
            createLogin,
            validationErrors,
        }

    }

})
</script>

<style scoped></style>