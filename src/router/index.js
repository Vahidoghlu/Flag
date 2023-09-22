import { createRouter, createWebHistory } from 'vue-router'
import detailsView from "@/views/DetailsView.vue";
import cards from "@/views/Cards.vue";

const routes = [
    { path: '/country/:id', name: 'details', component: detailsView },
    { path: '/country', name: 'cards', component: cards },
    { path: '/:catchAll(.*)', redirect: '/country' },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
