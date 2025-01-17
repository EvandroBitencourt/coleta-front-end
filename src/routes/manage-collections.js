export const manageCollectionRoutes = [
  {
    path: "/manage-collections",
    name: "ListManageCollectionsView",
    component: () => import("@/views/manage-collections/ListView.vue"),
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/collections/:id",
    name: "ShowManageCollectionView",
    component: () => import("@/views/manage-collections/ShowView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },

  {
    path: "/collections/edit/:id",
    name: "EditManageCollectionView",
    component: () => import("@/views/manage-collections/EditView.vue"),
    props: true,
    meta: {
      requireAuth: true,
      isSuperadmin: true,
    },
  },
];
