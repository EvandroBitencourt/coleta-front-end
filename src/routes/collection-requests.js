export const collectionRequestRoutes = [
  {
    path: "/collection-requests",
    name: "ListCollectionRequestView",
    component: () => import("@/views/collection-requests/ListView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: false,
    },
  },

  {
    path: "/collection-requests/new",
    name: "CreateCollectionRequestView",
    component: () => import("@/views/collection-requests/CreateView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: false,
    },
  },

  {
    path: "/collection-requests/edit/:id",
    name: "EditCollectionRequestView",
    component: () => import("@/views/collection-requests/EditView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: false,
    },
  },
];
