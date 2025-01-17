import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'

import { companiesRoutes } from '@/routes/companies'
import { routesCompanies } from '@/routes/routes'
import { routesPoints } from '@/routes/points'
import { wasteTypesRoutes } from '@/routes/waste-types'
import { loginRoutes } from "@/routes/login";
import { registerRoutes } from "@/routes/register";
import { collectionRequestRoutes } from "@/routes/collection-requests";
import { manageCollectionRoutes } from "@/routes/manage-collections";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },

    //insere as rotas com sintaxe de propagação
    ...companiesRoutes,
    ...routesCompanies,
    ...routesPoints,
    ...wasteTypesRoutes,
    ...loginRoutes,
    ...registerRoutes,
    ...collectionRequestRoutes,
    ...manageCollectionRoutes,
  ],
});

export default router
