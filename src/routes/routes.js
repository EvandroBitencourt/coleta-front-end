export const routesCompanies = [
  {
    path: "/routes",
    name: "ListRoutesView",
    component: () => import("@/views/routes/ListView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/routes/new",
    name: "CreateRouteView",
    component: () => import("@/views/routes/CreateView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/routes/:id",
    name: "ShowRouteView",
    component: () => import("@/views/routes/ShowView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/routes/edit/:id",
    name: "EditRouteView",
    component: () => import("@/views/routes/EditView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },
];