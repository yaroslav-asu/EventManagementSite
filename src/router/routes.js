
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/registration',
    component: () => import('layouts/RegistrationLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Registration.vue') }
    ]
  },
  {
    path: '/event/:eventId',
    component: () => import('pages/Event'),
    props: true
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/events',
    component: () => import('layouts/EventsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Events.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
