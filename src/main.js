//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue3-toastify/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { useAuthStore } from "./stores/Auth";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.getToken;

  //se tem token e não tem o user ainda e não esta carregando o user,
  // então podemos recuperar o user de acordo com o token do localstorage
  if (token && !authStore.getUser && !authStore.loadingUser) {
    await authStore.fetchUser(router);
  }

  //verificamos se esta logado
  const isLoggedIn = authStore.getUser !== null;

  //verifico se é superadmin
  const isSuperadmin = authStore.isSuperadmin;

  //verificamos se a rota requisitada requer que esteja autenticado
  const requireAuth = to.meta.requireAuth;

  //verificamos se a rota requisitada requer que seja superadmin
  const isSuperadminRoute = to.meta.isSuperadmin;

  //Redireciona para a home se tentar acessar /login ou /register estando logado
  if (isLoggedIn && (to.path === "/login" || to.path === "/register")) {
    return next("/");
  }

  //se o usuario nao esta logado e a rota requer autenticacao,
  //redireciona para /login
  if (!isLoggedIn && requireAuth) {
    return next("/login");
  }

  //se o usuario nao é superadmin e a rota requer ser superadmin,
  //desloga-o e redireciona para o login
  if (!isSuperadmin && isSuperadminRoute) {
    authStore.logout();
    return next("/login");
  }

  //passou desse ponto permitimos a navegação
  next();
});
