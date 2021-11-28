
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')}
    ]
  },
  {
    path: '/registration',
    component: () => import('layouts/RegistrationLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Registration.vue')}
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
      {path: '', component: () => import('pages/Login.vue')}
    ]
  },
  {
    path: '/events',
    component: () => import('layouts/EventsLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Events.vue')}
    ]
  },
  {
    path: '/create-event',
    component: () => import('layouts/CreateEventLayout.vue'),
    children: [
      {path: '', component: () => import('pages/CreateEvent.vue')}
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/account.vue'),
    children: [
      {path: '', component: () => import('pages/Account.vue')}
    ]
  },
  {
    path: '/event/registration',
    component: () => import('pages/EventRegistration.vue')
  },
  {
    path: '/change-event',
    component: () => import('layouts/ChangeEventLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChangeForm.vue') }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/TestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Test.vue') }
    ]
  },
  {
    path: '/event/registration',
    component: () => import('pages/EventRegistration.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
