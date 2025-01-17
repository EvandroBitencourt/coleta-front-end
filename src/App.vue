<template>
<Navbar/>
  <RouterView />
</template>

<script>
import {  RouterView, useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {defineComponent} from 'vue'
import { globalRouter } from './router/globalRouter';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  },

  setup(){
    const router = useRouter()
    globalRouter.router =  router
  }
})
</script>

<style scoped>

</style>
