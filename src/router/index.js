import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'

import { companiesRoutes } from '@/routes/companies'
import { routesCompanies } from '@/routes/routes'
import { routesPoints } from '@/routes/points'
import { wasteTypesRoutes } from '@/routes/waste-types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    //insere as rotas com sintaxe de propagação
    ...companiesRoutes,
    ...routesCompanies,
    ...routesPoints,
    ...wasteTypesRoutes
  
  ],
})

export default router
