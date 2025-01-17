<template>

<nav v-if="showNavbar" class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">Coleta Legal</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li v-if="isSuperadmin" class="nav-item">
          <RouterLink class="nav-link" to="/companies">Empresas de coleta</RouterLink>
        </li>
        <li v-if="isSuperadmin" class="nav-item">
          <RouterLink class="nav-link" to="/routes">Rotas de coleta</RouterLink>
        </li>

        <li v-if="isSuperadmin" class="nav-item">
          <RouterLink class="nav-link" to="/points">Programar coleta</RouterLink>
        </li>

        <li v-if="isSuperadmin" class="nav-item">
          <RouterLink class="nav-link" to="/waste-types">Tipos de resíduos</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" to="/collection-requests">Solicitar coleta</RouterLink>
        </li>

        <li v-if="isSuperadmin" class="nav-item">
          <RouterLink class="nav-link" to="/manage-collections">Gerenciar solicitações de coleta</RouterLink>
        </li>
      </ul>
      <div class="d-flex">
        <span v-if="currentUser" class="navbar-text p-0 pt-1 me-2">
           <span class="badge bg-dark">
              {{ currentUser.username }} - {{ currentUser.roles.join(', ') }}
           </span>
        </span>
        <button class="btn btn-outline-success" @click="logout">Sair</button>
      </div>
    </div>
  </div>
</nav>

</template>

<script>
import {RouterLink, useRoute,useRouter} from 'vue-router'
import { computed, defineComponent } from 'vue';
import { useAuthStore } from '@/stores/Auth';

export default defineComponent({
  name: 'Navbar',

  setup(){
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    const currentUser = computed(() => authStore.getUser)
    const isSuperadmin = computed(() => authStore.isSuperadmin)

    const showNavbar = computed(() => {
       return !['/login', '/register'].includes(route.path)
    })

    const logout = () => {
      authStore.logout()
      router.replace('/login')
    }

    return {
      logout,
      showNavbar,
      currentUser,
      isSuperadmin
    }
  }
  
})

</script>

<style scoped>
</style>