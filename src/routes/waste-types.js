export const wasteTypesRoutes = [
     {
      path: '/waste-types',
      name: 'ListWasteView',
      component: () => import('@/views/waste-types/ListView.vue'),
    },

    {
      path: '/waste-types/new',
      name: 'CreateWasteView',
      component: () => import('@/views/waste-types/CreateView.vue'),
    },

    {
      path: '/waste-types/edit/:id',
      name: 'EditWasteView',
      component: () => import('@/views/waste-types/EditView.vue'),
      props:true
    },
]