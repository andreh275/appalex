import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../components/Inicio.vue'; // Asegúrate de que la ruta sea correcta
import Agregar from '../components/Agregar.vue'; // Asegúrate de que la ruta sea correcta
import Editar from '../components/Editar.vue'; // Asegúrate de que la ruta sea correcta

const routes = [
  { path: '/', component: Inicio, name: 'Inicio' },
  { path: '/agregar', component: Agregar, name: 'Agregar' },
  { path: '/editar/:id', component: Editar, name: 'Editar' } // Nota el uso de :id para la edición
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
