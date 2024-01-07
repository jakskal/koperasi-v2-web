import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboardVue from '@/layouts/AdminDashboard.vue'
import HomeViewVue from '@/views/HomeView.vue'
import SavingTablesVue from '@/views/SavingTables.vue'
import LoginPageVue from '@/layouts/LoginPage.vue'
import AboutViewVue from '@/views/AboutView.vue'
import AdminManagementVue from '@/views/AdminManagement.vue'


const routes = [
  {
    path: "/login",
    name: "login",
    // redirect: "/admin/dashboard",
    component: LoginPageVue,
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: AdminDashboardVue, meta:{middleware:"auth"},
    children: [
      {
        path: "/admin/dashboard",
        component: HomeViewVue,
      },
      {
        path: "/admin/settings",
        component: AboutViewVue,
      },
      {
        path: "/admin/tables",
        component: SavingTablesVue,
      },
      {
        path: "/admin/admin-management",
        name:"admin-management",
        component: AdminManagementVue,
      },
    ],
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})


router.beforeEach((to, from,next) => {
  const token = localStorage.getItem("token")

  if (to.name !== 'login' && !token) next({name:'login'})
  else next()


})

export default router
