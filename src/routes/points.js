export const routesPoints = [
  {
    path: "/points",
    name: "ListPointsView",
    component: () => import("@/views/points/ListView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/points/new",
    name: "CreatePointView",
    component: () => import("@/views/points/CreateView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/points/:id",
    name: "ShowPointView",
    component: () => import("@/views/points/ShowView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/points/edit/:id",
    name: "EditPointView",
    component: () => import("@/views/points/EditView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    //renderiza a view para gerenciar os registros detalhados desse ponto de coleta
    path: "/points/events/:id",
    name: "EventsPointView",
    component: () => import("@/views/points/EventsView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },
];