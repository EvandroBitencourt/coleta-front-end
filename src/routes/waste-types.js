export const wasteTypesRoutes = [
  {
    path: "/waste-types",
    name: "ListWasteView",
    component: () => import("@/views/waste-types/ListView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/waste-types/new",
    name: "CreateWasteView",
    component: () => import("@/views/waste-types/CreateView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/waste-types/edit/:id",
    name: "EditWasteView",
    component: () => import("@/views/waste-types/EditView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },
];