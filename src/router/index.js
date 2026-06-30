import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'library',
    component: () => import('@/views/LibraryView.vue'),
    meta: { title: 'Library' }
  },
  {
    path: '/play/:id',
    name: 'player',
    component: () => import('@/views/PlayerView.vue'),
    meta: { title: 'Now Playing' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: 'Settings' }
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue'),
    meta: { title: 'Stats' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = `${to.meta.title ?? 'RetroPlay'} — RetroPlay`
})

export default router
