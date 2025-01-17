<template>
    <div class="container-fluid mt-2 mb-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header">
                        <h4 class="my-2">Criar minha conta</h4>
                    </div>
                    <div class="card-body">

                        <ValidationErrorsView :errors="validationErrors" />

                        <form @submit.prevent="createUser">

                            <div class="d-grid gap-2 col-6 mx-auto">

                                
                                <div class="mb-2">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="email" class="form-control" id="email" v-model="user.email">
                                </div>

                                <div class="mb-2">
                                    <label for="username" class="form-label">Usuário</label>
                                    <input type="text" class="form-control" id="username" v-model="user.username">
                                </div>

                                <div class="mb-2">
                                    <label for="password" class="form-label">Senha de acesso</label>
                                    <input type="password" class="form-control" id="password" v-model="user.password">
                                </div>

                                <div class="mb-2">
                                    <label for="password_confirm" class="form-label">Confirme a senha de acesso</label>
                                    <input type="password" class="form-control" id="password_confirm" v-model="user.password_confirm">
                                </div>

                                <button type="submit" class="btn btn-primary mt-3">
                                   <i class="bi bi-box-arrow-in-right"></i>&nbsp;Criar minha conta
                                </button>

                                <RouterLink class="btn btn-link float-start" to="/login">
                                    Já tem uma conta?
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
import RegisterApi from "@/services/api/RegisterApi";
import { defineComponent, ref} from "vue";
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from "vue-router";
import ValidationErrorsView from "@/components/ValidationErrors.vue";
import { useAuthStore } from "@/stores/Auth";


export default defineComponent({

    name: 'RegisterView',

    components: {
        ValidationErrorsView,
    },

    setup() {
        const router = useRouter(); // obtemos uma nova instancia do router
        const route = useRoute(); // obtemos a instancia da rota atual

        const user = ref({
            email: '',
            username: '',
            password: '',
            password_confirm: '',
        })

        const validationErrors = ref([])

        const authStore = useAuthStore() // obtemos uma instancia do store de autenticacao

        const createUser = async () => {
            try {
                validationErrors.value = [];
                const api = new RegisterApi();

                const data = await api.create(user.value);

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
            user,
            createUser,
            validationErrors,
        }

    }

})
</script>

<style scoped></style>