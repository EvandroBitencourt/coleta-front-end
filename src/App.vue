<template>
<Navbar/>
  <RouterView />
</template>

<script>
import {  RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
})
</script>

<style scoped>

</style>
