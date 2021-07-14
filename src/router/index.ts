import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '/src/pages/HomePage.vue';
import TrackerPage from '/src/pages/TrackerPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/tracker/:id',
    name: 'Tracker',
    component: TrackerPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
